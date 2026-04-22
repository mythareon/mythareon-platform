import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function WorkspacesPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-900">Mythareon - Workspaces</h1>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Workspaces</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-slate-600">Create your first workspace to get started</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create Workspace
          </button>
        </div>
      </main>
    </div>
  );
}
