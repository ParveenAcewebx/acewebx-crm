import GlobalLoader from '@/components/GlobalLoader'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/contexts/auth-provider'
import { LoaderProvider } from '@/contexts/loader-provider'
import QueryProvider from '@/contexts/query-provider'
import { ThemeProvider } from '@/contexts/theme-provider'
import { authOptions } from '@/lib/auth'
import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import './globals.css'
import GlobelLocalStoreData from '@/components/GlobelLocalStoreData'

export const metadata = {
  title: {
    template: '%s | CRM',
    default: 'AceWebX CRM'
  },
  icons: {
    icon: ' /images/favicon.ico',
    shortcut: '/images/favicon.ico'
  }
}

export default async function AdminRootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        <link rel='icon' href='/images/favicon.ico' />
      </head>

      <body
        suppressHydrationWarning
        className={cn(inter.className, 'antialiased')}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <GlobelLocalStoreData/>
          <QueryProvider>
            <AuthProvider session={session}>
              <Toaster />
              <main className='min-h-screen'>
                <Toaster />
                <LoaderProvider>
                  <GlobalLoader />
                  {children}
                </LoaderProvider>
              </main>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
