import ApiClient from '@/components/services/apiBase'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET, // ✅ Important for JWT decryption

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // Optional: 30 days
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
          const data = {
            email: credentials?.email,
            password: credentials?.password
          }

          const aptData = await ApiClient.post('/auth/login', data)
          if (aptData.status !== 200 || !aptData.data) {
            console.error('Login failed:', aptData.message)
            return null
          }

          return {
            ...aptData.data.data // Return flat user object
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
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.accessToken = user.accessToken
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      return session
    }
  }
}
