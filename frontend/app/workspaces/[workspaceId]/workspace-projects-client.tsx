'use client';

import { FormEvent, useState, useTransition } from 'react';

type Project = {
  id: string;
  name: string;
  description?: string | null;
};

type Props = {
  workspaceId: string;
  apiBase: string;
  initialProjects: Project[];
};

export default function WorkspaceProjectsClient({ workspaceId, apiBase, initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Project name is required.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(`${apiBase}/api/workspaces/${workspaceId}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), description: description.trim() || null }),
        });

        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload?.detail || 'Failed to create project');
        }

        const created = (await res.json()) as Project;
        setProjects((prev) => [created, ...prev]);
        setName('');
        setDescription('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unexpected error');
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a1020] text-white">
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Workspace Projects</h1>
        <p className="mt-2 text-sm text-[#a9b8de]">Create a project to upload datasets and run baseline-vs-candidate evaluations.</p>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Create Project</h2>
          <form onSubmit={onCreateProject} className="mt-4 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              className="w-full rounded-xl border border-white/15 bg-[#111c38] px-4 py-3 text-sm outline-none ring-[#2ad8b0] transition focus:ring-2"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description (optional)"
              rows={3}
              className="w-full rounded-xl border border-white/15 bg-[#111c38] px-4 py-3 text-sm outline-none ring-[#2ad8b0] transition focus:ring-2"
            />
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-gradient-to-r from-[#29d6b0] to-[#70efd2] px-5 py-3 text-sm font-semibold text-[#042018] disabled:opacity-60"
            >
              {isPending ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="mt-4 space-y-3">
            {projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-4 text-sm text-[#a9b8de]">
                No projects yet. Create one to continue setup.
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="rounded-xl border border-white/10 bg-[#111c38] p-4">
                  <p className="text-sm font-semibold">{project.name}</p>
                  <p className="mt-1 text-xs text-[#8fa3d4]">{project.description || 'No description provided.'}</p>
                  <p className="mt-2 text-xs text-[#6f84b5]">Project ID: {project.id}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
