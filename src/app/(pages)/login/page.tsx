"use client";

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailPasswordSignIn = async () => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("メールアドレスかパスワードが違います");
      } else if (result?.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      alert("予期せぬエラーが発生しました");
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
      alert("予期せぬエラーが発生しました");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ログイン画面</h1>
      <div style={styles.form}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleEmailPasswordSignIn} style={styles.button}>
          ログイン
        </button>
        <button onClick={handleGoogleSignIn} style={{ ...styles.button, backgroundColor: '#4285F4' }}>
          Googleでログイン
        </button>
        <Link href="/register" style={styles.link}>
          ユーザー登録
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '250px',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#3388BB',
    color: '#fff',
  },
  link: {
    marginTop: '10px',
    color: '#0070f3',
    textDecoration: 'none',
  },
};

export default SignIn;
