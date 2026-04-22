'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
