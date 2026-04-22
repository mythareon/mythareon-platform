'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerkKey) {
    return <Dashboard />;
  }

  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Mythareon</h1>
            <p className="text-lg text-slate-300 mb-8">Calibrate every layer of your AI</p>
            <p className="text-slate-400 mb-8">Regression testing and release gates for LLM teams</p>
            <div>
              <RedirectToSignIn />
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Mythareon</h1>
          <div>
            <Link href="/workspaces" className="text-slate-700 hover:text-slate-900">
              Workspaces
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Welcome</h2>
        <p className="text-slate-600">Select a workspace to get started</p>
      </main>
    </div>
  );
}
