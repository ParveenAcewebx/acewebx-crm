import { authOptions } from '@/lib/auth'
import NextAuth from 'next-auth'

const handler = NextAuth.default(authOptions)

export { handler as GET, handler as POST }
