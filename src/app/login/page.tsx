"use client";

import { signIn, useSession } from 'next-auth/react';

const LoginPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <div>
          <h1>ログイン成功</h1>
          <p>ユーザー名: {session.user.name}</p>
          <p>メールアドレス: {session.user.email}</p>
        </div>
      ) : (
        <button onClick={() => signIn('google')} disabled={!!session}>
        Googleログイン
        </button>
      )}
    </div>
  );
};

export default LoginPage;
