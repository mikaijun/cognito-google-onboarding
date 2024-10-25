import React from 'react';
import LoginPage from './(pages)/login/page';
import { getServerAuthSession } from '@/lib/auth';
import { Session } from 'next-auth';

export default async function Home() {
    const session: Session | null = await getServerAuthSession();

    return (
        <main>
            {session ? (
                <div>
                    <p>メールアドレス, {session.user?.email}</p>
                    <p>名前, {session.user?.name}</p>
                </div>
            ) : (
                <LoginPage />
            )}
        </main>
    );
}
