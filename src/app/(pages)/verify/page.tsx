"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Verify = () => {
  const searchParams = useSearchParams()
  const confirmation_code = searchParams.get('confirmation_code')
  const user_name = searchParams.get('user_name')
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmSignUp = async () => {
      if (user_name && confirmation_code) {
        try {
          await fetch('/api/auth/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user_name, code: confirmation_code }),
          });
          setMessage('メールアドレスの確認が完了しました。ログインページにお進みください。');
        } catch (error) {
          console.error('Error confirming user:', error);
          setMessage('メールアドレスの確認に失敗しました。再度お試しください。');
        }
      }
    };

    confirmSignUp();
  }, [user_name, confirmation_code]);

  return (
    <div>
      <h1>メールアドレス確認</h1>
      <p>{message}</p>
    </div>
  );
};

export default Verify;
