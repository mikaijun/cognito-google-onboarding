"use client";

import { useState } from 'react';

import { useRouter, useSearchParams } from "next/navigation";
import { PathList } from '@/constants/urls';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const user_name = searchParams.get("user_name");
  const confirmation_code = searchParams.get("confirmation_code");
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter()

  const handleResetPassword = async () => {
    try {
      const result = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user_name,
          confirmationCode: confirmation_code,
          newPassword,
        }),
      });

      if (result?.status === 200) {
        alert('パスワードがリセットされました。ログインページに移動します。');
        router.push(PathList.url.login);
      } else {
        alert('リセット中にエラーが発生しました');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      alert('予期せぬエラーが発生しました');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>パスワードリセット</h1>
      <p style={{ marginBottom: "16px", fontSize: "10px" }}>※ パスワードは、英語大文字と英語小文字を含めて設定してください</p>
      <div style={styles.form}>
        <input
          type="password"
          placeholder="新しいパスワード"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleResetPassword} style={styles.button}>
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

export default ResetPassword;
