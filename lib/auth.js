import CredentialsProvider from 'next-auth/providers/credentials'
import api from './api'

export const authOptions = {
  session: {
    strategy: 'jwt'
  },

  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        try {
          const res = await api.post('/auth/login', {
            email: credentials.email,
            password: credentials.password
          })

          const data = res.data

          if (!data || !data.access_token || !data.user) {
            console.error('Missing fields in response:', data)
            return null
          }

          return {
            id: data.user.id?.toString() ?? data.user.email,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            access_token: data.access_token
          }
        } catch (err) {
          console.error('Login error:', err?.response?.data || err.message)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...token.user['user'],
        token: token.user['access_token'],
        name: token.name,
        email: token.email,
        id: token.id
      }
      return session
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && session?.user) {
        token.user = session.user
      }
      if (user) token.user = user
      return token
    }
  }
}
