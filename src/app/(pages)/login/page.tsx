"use client";

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleEmailPasswordSignIn = async () => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/'); // 認証後にリダイレクト
    } else {
      console.error('Login failed');
    }
  };

  const handleRegister = async () => {
    console.log(email, password)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('User registered successfully');
        // 自動的にログインする場合
        handleEmailPasswordSignIn();
      } else {
        console.error('Registration failed');
      }
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
        </div>
      )}
    </div>
  );
};

export default SignIn;
