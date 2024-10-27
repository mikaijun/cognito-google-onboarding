"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PathList } from '@/constants/urls';
import { styles } from '@/constants/styles';

const SignIn = () => {
  const [email, setEmail] = useState('');

  const handleResetPasswordRequest = async () => {
    if (!email) {
      alert('メールアドレスを入力してください');
      return;
    }
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
    <div>
      <h1 style={styles.title}>パスワードをお忘れの方</h1>
      <div style={{ ...styles.form, marginBottom: "16px" }}>
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
      <Link href={PathList.url.login} style={styles.link}>
        ログインページへ戻る
      </Link>
    </div>
  );
};

export default SignIn;
