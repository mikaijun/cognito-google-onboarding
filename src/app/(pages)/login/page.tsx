"use client";

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

const SignIn = () => {
  const { data: session, status } = useSession();
  console.log(status)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailPasswordSignIn = async () => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error('Login failed:', result.error);
        // 必要に応じてエラーメッセージを表示する処理
      } else if (result?.status === 200) {
        console.log('Login successful');
        // 必要に応じて、ログイン後の処理を実行
        // 例えば、セッションを更新するために手動でページをリロードするなど
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      });
    } catch (error) {
      console.error('Google Sign in failed', error);
    }
  };

  const handleRegister = async () => {
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h1>ログイン画面</h1>
      {session ? (
        <div>
          <p>ログイン済み: {session.user?.email}</p>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistering ? (
            <button onClick={handleRegister}>ユーザー登録</button>
          ) : (
            <button onClick={handleEmailPasswordSignIn}>ログイン</button>
          )}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'ログインに切り替え' : '新規登録に切り替え'}
          </button>
          <button onClick={handleGoogleSignIn}>googleログイン</button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
