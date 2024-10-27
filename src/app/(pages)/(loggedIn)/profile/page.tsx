"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { styles } from '@/constants/styles';
import Link from 'next/link';
import { PathList } from '@/constants/urls';

const AccountSettings = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert('新しいパスワードを入力してください');
      return;
    }
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
    if (!newEmail) {
      alert('新しいメールアドレスを入力してください');
      return;
    }
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
    <div>
      <h2>アカウント設定</h2>
      <p style={{ marginBottom: "16px", fontSize: "10px" }}>※ パスワードは、英語大文字と英語小文字を含めて設定してください</p>
      <div style={{ ...styles.form, marginBottom: "16px" }}>
        <h3>パスワードリセット</h3>
        <input
          type="password"
          placeholder="新しいパスワード"
          disabled={!session}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleResetPassword} style={styles.button}>
          パスワードをリセット
        </button>
      </div>

      <div style={{ ...styles.form, marginBottom: "16px" }}>
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
      <Link href={PathList.url.home} style={styles.link}>
        ホームへ戻る
      </Link>
    </div>
  );
};

export default AccountSettings;
