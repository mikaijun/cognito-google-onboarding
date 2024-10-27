"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PathList } from '@/constants/urls';

const ConfirmEmail = () => {
  const router = useRouter();

  useEffect(() => {
    const confirmEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userName = urlParams.get('user_name');
      const confirmationCode = urlParams.get('confirmation_code');
      const accessToken = urlParams.get('access_token');

      if (!userName || !confirmationCode) {
        alert('無効なリンクです。ホームにリダイレクトします。');
        router.push(PathList.url.home);
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
          alert('メールアドレスが確認されました。ホームにリダイレクトします。');
          router.push(PathList.url.home);
        } else {
          alert('メールアドレスの確認中にエラーが発生しました。ホームにリダイレクトします。');
          router.push(PathList.url.home);
        }
      } catch (error) {
        console.error("Error confirming email:", error);
        alert('予期せぬエラーが発生しました。ホームにリダイレクトします。');
        router.push(PathList.url.home);
      }
    };

    confirmEmail();
  }, [router]);

  return (
    <div />
  );
};

export default ConfirmEmail;
