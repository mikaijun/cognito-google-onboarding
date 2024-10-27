"use client";

import { styles } from '@/constants/styles';
import { useState } from 'react';
import Link from 'next/link';
import { PathList } from '@/constants/urls';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const result = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (result?.status === 200) {
        alert("メール送信しました。メール内のリンクをクリックして登録を完了してください");
      } else {
        alert("ユーザー登録中にエラーが発生しました");
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('ユーザー登録中にエラーが発生しました');
    }
  };

  return (
    <div>
      <h1 style={styles.title}>ユーザー作成画面</h1>
      <p style={{ marginBottom: "16px", fontSize: "10px" }}>※ パスワードは、英語大文字と英語小文字を含めて設定してください</p>
      <div style={{ ...styles.form, marginBottom: "16px" }}>
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
        <button onClick={handleRegister} style={styles.button}>
          ユーザー登録
        </button>
      </div>
      <Link href={PathList.url.login} style={styles.link}>
        ログインページへ戻る
      </Link>
    </div >
  );
};

export default Register;
