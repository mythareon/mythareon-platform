import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';

export default function SignUpPage() {
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerkKey) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a1020] px-4 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h1 className="text-2xl font-semibold">Authentication is not configured</h1>
          <p className="mt-3 text-sm text-[#a9b8de]">
            Add Clerk keys to environment variables and enable providers in Clerk Dashboard.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a1020] px-4 py-10">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        appearance={{
          variables: {
            colorPrimary: '#29d6b0',
            colorBackground: '#0b1430',
            colorText: '#ecf2ff',
            colorInputBackground: '#111c38',
            colorInputText: '#ecf2ff',
          },
          elements: {
            card: 'border border-white/10 shadow-none',
            socialButtonsBlockButton: 'border border-white/15',
          },
        }}
      />
    </main>
  );
}
