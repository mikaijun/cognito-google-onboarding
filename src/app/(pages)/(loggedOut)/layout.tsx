export default function RootLayout({ children }: { children: React.ReactNode }) {
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
  backgroundColor: '#f7f7f7',
};
