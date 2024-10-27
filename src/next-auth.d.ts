// NOTE: next-authのデフォルトの型定義だと、上記の設定でエラーが出るため、型定義を拡張
// see: https://zenn.dev/c_shiraga/articles/4fac54eb4d5bd8
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    provider?: string
  }

  interface User {
    accessToken?: string
    provider?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    provider?: string
  }
}
