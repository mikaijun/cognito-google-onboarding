"use client";

import { signIn, useSession } from 'next-auth/react';

const SignIn = () => {
  const { data } = useSession();
  const handleGoogleSignIn = async () => {
    try {
      await signIn('cognito', {
        callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
        provider: 'google',
      });
    } catch (error) {
      console.error('Google Sign in failed', error);
    }
  };

  return (
    <div>
      <h1>ログイン画面</h1>
      {data ? (
        <div>
          <p>ログイン済み: {data.user?.name}</p>
          <p>Email: {data.user?.email}</p>
        </div>
      ) : (
        <button onClick={handleGoogleSignIn}>Googleでログイン</button>
      )}
    </div>
  );
};

export default SignIn;
