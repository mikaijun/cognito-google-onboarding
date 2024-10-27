"use client";

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation'
import { PathList } from '@/constants/urls';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleEmailPasswordSignIn = async () => {
    if (!email || !password) {
      alert("メールアドレスとパスワードを入力してください");
      return;
    }
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("メールアドレスかパスワードが違います");
      } else if (result?.status === 200) {
        router.push(PathList.url.home);
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
    <div>
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
        <button onClick={handleGoogleSignIn} style={{ ...styles.button, backgroundColor: '#fff', border: '1px solid #ccc', color: "#000" }}>
          <FcGoogle />
          Googleでログイン
        </button>
        <Link href={PathList.url.register} style={styles.link}>
          アカウントをお持ちでない方
        </Link>
        <Link href={PathList.url.forgot} style={styles.link}>
          パスワードをお忘れの方
        </Link>
      </div>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center' as const,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  link: {
    marginTop: '10px',
    color: '#0070f3',
    textDecoration: 'none',
  },
};

export default SignIn;
