import React from 'react';
import { getServerAuthSession } from '@/lib/auth';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { PathList } from '@/constants/urls';

export default async function Home() {
  const session: Session | null = await getServerAuthSession();
  if (!session) {
    redirect(PathList.url.login);
  }

  return (
    <main>
      <div>
        <p>メールアドレス, {session.user?.email}</p>
        <p>名前, {session.user?.name}</p>
      </div>
    </main>
  );
}
