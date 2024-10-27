"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';

const AccountSettings = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, email: session?.user?.email }),
      });
      if (response.ok) {
        alert('パスワードがリセットされました');
        setNewPassword('');
      } else {
        alert('パスワードリセット中にエラーが発生しました');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('予期せぬエラーが発生しました');
    }
  };

  const handleChangeEmail = async () => {
    try {
      const response = await fetch('/api/auth/update-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newEmail, email: session?.user?.email, accessToken }),
      });
      if (response.ok) {
        alert('メールアドレスが更新されました。確認メールをご確認ください。');
        setNewEmail('');
      } else {
        alert('メールアドレス変更中にエラーが発生しました');
      }
    } catch (error) {
      console.error('Error changing email:', error);
      alert('予期せぬエラーが発生しました');
    }
  };

  return (
    <div style={styles.container}>
      <h2>アカウント設定</h2>

      <div style={styles.formContainer}>
        <h3>パスワードリセット</h3>
        <input
          type="password"
          placeholder="新しいパスワード"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleResetPassword} style={styles.button}>
          パスワードをリセット
        </button>
      </div>

      <div style={styles.formContainer}>
        <h3>メールアドレス変更</h3>
        <input
          type="email"
          placeholder="新しいメールアドレス"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleChangeEmail} style={styles.button}>
          メールアドレスを変更
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
    padding: '20px',
  },
  formContainer: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AccountSettings;
