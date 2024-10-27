import { NextRequest, NextResponse } from 'next/server'

/**
 * see: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ['/:path*', '/index/:path*'],
}

/**
 * see: https://zenn.dev/ksyunnnn/articles/3aae5870e6a1fe
 */
export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_BASE_URL !== 'http://localhost:3000') {
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('Authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, password] = atob(authValue).split(':')

    if (
      user === process.env.NEXT_BASIC_USER &&
      password === process.env.NEXT_BASIC_PASSWORD
    ) {
      return NextResponse.next()
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }, status: 401 },
    )
  } else {
    return NextResponse.json(
      { error: 'Please enter credentials' },
      { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }, status: 401 },
    )
  }
}
