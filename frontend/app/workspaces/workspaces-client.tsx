'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState, useTransition } from 'react';

type Workspace = {
  id: string;
  name: string;
  slug: string;
};

type BillingStatus = {
  plan: string;
  subscription_status: string;
  subscription_current_period_end?: string | null;
};

type Props = {
  apiBase: string;
  clerkId: string;
  initialWorkspaces: Workspace[];
  initialBilling: BillingStatus;
};

export default function WorkspacesClient({
  apiBase,
  clerkId,
  initialWorkspaces,
  initialBilling,
}: Props) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [billing, setBilling] = useState<BillingStatus>(initialBilling);
  const [workspaceName, setWorkspaceName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isPro = useMemo(() => billing.plan === 'pro', [billing.plan]);

  const refreshBilling = async () => {
    const res = await fetch(
      `${apiBase}/api/billing/me?clerk_id=${encodeURIComponent(clerkId)}`,
      { cache: 'no-store' },
    );
    if (!res.ok) {
      return;
    }
    const data = (await res.json()) as BillingStatus;
    setBilling(data);
  };

  const onCreateWorkspace = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!workspaceName.trim()) {
      setError('Workspace name is required.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(
          `${apiBase}/api/workspaces?clerk_id=${encodeURIComponent(clerkId)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: workspaceName.trim() }),
          },
        );

        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload?.detail || 'Failed to create workspace');
        }

        const created = (await res.json()) as Workspace;
        setWorkspaces((prev) => [created, ...prev]);
        setWorkspaceName('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unexpected error');
      }
    });
  };

  const startCheckout = () => {
    window.location.href = `${apiBase}/api/billing/checkout?clerk_id=${encodeURIComponent(clerkId)}`;
  };

  const openPortal = () => {
    window.location.href = `${apiBase}/api/billing/portal?clerk_id=${encodeURIComponent(clerkId)}`;
  };

  return (
    <div className="min-h-screen bg-[#0a1020] text-white">
      <nav className="border-b border-white/10 bg-[#0e1730]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold tracking-tight">Mythareon Workspace Console</h1>
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-[#7ee9ca]">
            {isPro ? 'Pro Plan' : 'Free Plan'}
          </span>
        </div>
      </nav>

      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold">Your Workspaces</h2>
          <p className="mt-2 text-sm text-[#a9b8de]">
            Create and manage workspaces where datasets, eval runs, and release checks live.
          </p>

          <form onSubmit={onCreateWorkspace} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="New workspace name"
              className="w-full rounded-xl border border-white/15 bg-[#111c38] px-4 py-3 text-sm outline-none ring-[#2ad8b0] transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-gradient-to-r from-[#29d6b0] to-[#70efd2] px-5 py-3 text-sm font-semibold text-[#042018] disabled:opacity-60"
            >
              {isPending ? 'Creating...' : 'Create Workspace'}
            </button>
          </form>

          {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

          <div className="mt-6 space-y-3">
            {workspaces.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-4 text-sm text-[#a9b8de]">
                No workspaces yet. Create your first workspace to begin running evals.
              </div>
            ) : (
              workspaces.map((ws) => (
                <div
                  key={ws.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111c38] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{ws.name}</p>
                    <p className="text-xs text-[#8fa3d4]">slug: {ws.slug}</p>
                  </div>
                  <Link
                    href={`/workspaces/${ws.id}`}
                    className="rounded-lg border border-white/20 px-3 py-1 text-xs font-semibold text-[#b9c6e7] hover:bg-white/10"
                  >
                    Open
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">Plan and Billing</h3>
            <p className="mt-2 text-sm text-[#a9b8de]">
              {isPro
                ? 'Your Pro subscription is active. Manage billing details below.'
                : 'You are on the Free plan. Upgrade to Pro to unlock team and release controls.'}
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#111c38] p-4 text-sm">
              <p className="text-[#c9d6f6]">
                <span className="text-[#8fa3d4]">Plan:</span> {billing.plan}
              </p>
              <p className="mt-1 text-[#c9d6f6]">
                <span className="text-[#8fa3d4]">Subscription status:</span> {billing.subscription_status || 'inactive'}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {!isPro ? (
                <button
                  onClick={startCheckout}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#101f46]"
                >
                  Upgrade to Pro
                </button>
              ) : null}
              <button
                onClick={openPortal}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold"
              >
                Manage Billing
              </button>
              <button
                onClick={refreshBilling}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold"
              >
                Refresh Status
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">Next Best Actions</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#b8c6ea]">
              <li>1. Create a workspace for your first AI product domain.</li>
              <li>2. Create a project and upload your regression dataset.</li>
              <li>3. Run baseline vs candidate eval and review verdicts.</li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}
