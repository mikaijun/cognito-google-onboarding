"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const Verify = () => {
  const searchParams = useSearchParams()
  const confirmation_code = searchParams.get('confirmation_code')
  const user_name = searchParams.get('user_name')

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
          window.location.href = '/login';
        } catch (error) {
          console.error('Error confirming user:', error);
        }
      }
    };

    confirmSignUp();
  }, [user_name, confirmation_code]);

  return (
    <div></div>
  );
};

export default Verify;