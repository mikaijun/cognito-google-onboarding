"use client";

import { SessionProvider } from 'next-auth/react';

export function ClientSessionProvider(props: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  );
}
