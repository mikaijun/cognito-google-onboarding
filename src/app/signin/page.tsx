'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignIn = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: 'http://localhost:3000', // 認証後にリダイレクトするURL
      });
    } catch (error) {
      console.error('Google Sign in failed', error);
    }
  };

  return (
    <div className="signin-container">
      <h1>コールバック的な画面</h1>
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        Googleでログイン
      </button>
    </div>
  );
};

export default SignIn;
