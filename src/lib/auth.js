// import CredentialsProvider from 'next-auth/providers/credentials'
// import ApiClient from '../components/services/apiBase'

// {
//   console.log('CredentialsProvider:', CredentialsProvider)
// }
// export const authOptions = {
//   session: {
//     strategy: 'jwt'
//   },
//   providers: [
//     CredentialsProvider({
//       type: 'credentials',
//       credentials: {
//         login: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },

//       async authorize(credentials) {
//         try {
//           let data = new FormData()
//           data.append('login', credentials.login)
//           data.append('password', credentials.password)
//           const aptData = await ApiClient.post('/auth/login', data)
//           console.log('aptData', aptData)
//           if (aptData.status !== 200 || !aptData.data) {
//             console.error('Login failed:w', aptData.message)
//             return null
//           }

//           return {
//             ...aptData.data,
//             id: aptData.data.user.id.toString(),
//             token: aptData.data.access_token.toString(),
//             isVerified2FA: false
//           }
//         } catch (error) {
//           console.error('Login error:', error.response?.data || error.message)
//           return null
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: '/login'
//   },
//   callbacks: {
//     async session({ session, token }) {
//       session.user = { ...token.user['user'], token: token.user['access_token'] }
//       return session
//     },
//     async jwt({ token, user, session, trigger }) {
//       if (trigger === 'update' && session?.user) {
//         token.user = session.user
//       }
//       if (user) token.user = user
//       return token
//     }
//   }
// }
