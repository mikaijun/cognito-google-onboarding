"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ConfirmEmail = () => {
  const router = useRouter();
  const [message, setMessage] = useState("確認中です...");

  useEffect(() => {
    const confirmEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userName = urlParams.get('user_name');
      const confirmationCode = urlParams.get('confirmation_code');
      const accessToken = urlParams.get('access_token');

      if (!userName || !confirmationCode) {
        setMessage("無効なリンクです。");
        return;
      }

      try {
        const response = await fetch('/api/auth/confirm-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName,
            confirmationCode,
            accessToken,
          }),
        });

        if (response.ok) {
          setMessage("メールアドレスが確認されました。ログインページに移動します。");
          setTimeout(() => router.push('/login'), 3000); // 3秒後にログインページにリダイレクト
        } else {
          setMessage("メールアドレス確認中にエラーが発生しました。");
        }
      } catch (error) {
        console.error("Error confirming email:", error);
        setMessage("予期せぬエラーが発生しました。");
      }
    };

    confirmEmail();
  }, [router]);

  return (
    <div style={styles.container}>
      <h1>メールアドレス確認</h1>
      <p>{message}</p>
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
    backgroundColor: '#f9f9f9',
    fontSize: '16px',
  },
};

export default ConfirmEmail;
