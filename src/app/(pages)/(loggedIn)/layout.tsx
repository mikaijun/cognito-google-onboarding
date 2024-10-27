import { PathList } from "@/constants/urls";
import { getServerAuthSession } from "@/lib/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

async function Layout({ children }: { children: React.ReactNode }) {
  const session: Session | null = await getServerAuthSession();
  if (!session) {
    redirect(PathList.url.login);
  }
  return (
    <div style={styles}>
      {children}
    </div>
  )
}

const styles = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#F6FBF6',
};
