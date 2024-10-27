"use client";

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { PathList } from '@/constants/urls';
import { useRouter } from 'next/navigation';
import { styles } from '@/constants/styles';
import Link from 'next/link';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  const isGoogleProvider = session?.provider === "google"

  const handleLogout = async () => {
    try {
      await signOut();
      router.push(PathList.url.login);
    } catch (error) {
      console.error('Google Sign in failed', error);
      alert("予期せぬエラーが発生しました");
    }
  };

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  return (
    <main>
      <div>
        <p>メールアドレス: {session!.user?.email}</p>
        <p>名前: {session!.user?.name}</p>
        <p>ログイン方法: {isGoogleProvider ? "Google" : "メールアドレス"}</p>
        {!isGoogleProvider && (
          <Link href={PathList.url.profile} style={styles.link}>
            プロフィールページ
          </Link>
        )}
        <button onClick={handleLogout} style={{ ...styles.button, marginTop: "16px" }}>ログアウト</button>
      </div>
    </main>
  );
}

export default Home;
