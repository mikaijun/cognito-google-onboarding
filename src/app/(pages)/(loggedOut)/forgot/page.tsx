"use client";

import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');

  const handleResetPasswordRequest = async () => {
    try {
      const result = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (result?.status === 200) {
        alert("メール送信しました。メール内のリンクをクリックして変更を完了してください");
      } else {
        alert("リクエスト中にエラーが発生しました");
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('予期せぬエラーが発生しました');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>パスワード忘れ</h1>
      <div style={styles.form}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleResetPasswordRequest} style={styles.button}>
          パスワードリセット
        </button>
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
};

export default SignIn;
