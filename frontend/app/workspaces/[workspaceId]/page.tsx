import { redirect } from 'next/navigation';
import WorkspaceProjectsClient from './workspace-projects-client';

export const dynamic = 'force-dynamic';

type Params = {
  workspaceId: string;
};

export default async function WorkspaceDetailPage({ params }: { params: Params }) {
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  if (hasClerkKey) {
    const { auth } = await import('@clerk/nextjs/server');
    const { userId } = await auth();

    if (!userId) {
      redirect('/');
    }
  }

  let projects = [];
  try {
    const projectsRes = await fetch(`${apiBase}/api/workspaces/${params.workspaceId}/projects`, {
      cache: 'no-store',
    });
    projects = projectsRes.ok ? await projectsRes.json() : [];
  } catch {
    // Keep page rendering with empty state if API is unavailable.
  }

  return <WorkspaceProjectsClient workspaceId={params.workspaceId} apiBase={apiBase} initialProjects={projects} />;
}
