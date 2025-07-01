import ApiClient from '@/components/services/apiBase'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider.default({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          let data = {
            email: credentials?.email,
            password: credentials?.password
          }

          const aptData = await ApiClient.post('/auth/login', data)
          if (aptData.status !== 200 || !aptData.data) {
            console.error('Login failed:w', aptData.message)
            return null
          }

          return {
            user: aptData.data.data,
            accessToken: aptData.data.data.accessToken
          }
        } catch (error) {
          console.error('Login error:', error.response?.data || error.message)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        token.user = user.user
        token.accessToken = user.accessToken
      }

      if (trigger === 'update' && session?.user) {
        token.user = session.user
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.token = token.accessToken
      return session
    }
  }
}
