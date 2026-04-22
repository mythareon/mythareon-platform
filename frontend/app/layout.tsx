'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <html lang="en">
      <body>
        {hasClerkKey ? <ClerkProvider>{children}</ClerkProvider> : children}
      </body>
    </html>
  );
}
