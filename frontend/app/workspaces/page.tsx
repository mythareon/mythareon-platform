import { redirect } from 'next/navigation';
import WorkspacesClient from './workspaces-client';

export const dynamic = 'force-dynamic';

export default async function WorkspacesPage() {
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  let clerkId = 'demo-user';
  let email = 'demo@mythareon.local';
  let name = 'Demo User';

  if (hasClerkKey) {
    const { auth, currentUser } = await import('@clerk/nextjs/server');
    const { userId } = await auth();

    if (!userId) {
      redirect('/sign-in');
    }

    const user = await currentUser();
    clerkId = userId;
    email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || email;
    name = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.username || name;
  }

  try {
    await fetch(
      `${apiBase}/api/auth/sync-user?clerk_id=${encodeURIComponent(clerkId)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`,
      { method: 'POST', cache: 'no-store' },
    );
  } catch {
    // Keep page rendering even if backend is temporarily unavailable.
  }

  let workspaces = [];
  let billing = { plan: 'free', subscription_status: 'inactive', subscription_current_period_end: null };

  try {
    const [workspacesRes, billingRes] = await Promise.all([
      fetch(`${apiBase}/api/workspaces?clerk_id=${encodeURIComponent(clerkId)}`, { cache: 'no-store' }),
      fetch(`${apiBase}/api/billing/me?clerk_id=${encodeURIComponent(clerkId)}`, { cache: 'no-store' }),
    ]);

    workspaces = workspacesRes.ok ? await workspacesRes.json() : [];
    billing = billingRes.ok
      ? await billingRes.json()
      : { plan: 'free', subscription_status: 'inactive', subscription_current_period_end: null };
  } catch {
    // Fallback UI uses safe defaults.
  }

  return <WorkspacesClient apiBase={apiBase} clerkId={clerkId} initialWorkspaces={workspaces} initialBilling={billing} />;
}
