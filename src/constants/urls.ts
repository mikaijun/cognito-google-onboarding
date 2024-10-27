export const PathList = {
  url: {
    home: '/',
    profile: '/profile',
    login: '/login',
    register: '/register',
    forgot: '/forgot',
  }
}

export type PathList = (typeof PathList)[keyof typeof PathList]
