// Component Imports
import Login from '@views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import AuthProvider from '@/@core/SessionProvider'
import { getSession } from 'next-auth/react'

const LoginPage = async() => {
  // Vars
  const mode = getServerMode()
const session = await getSession()
  return(
  <AuthProvider session={session}>
  <Login mode={mode} />
  </AuthProvider>
)
}

export default LoginPage
