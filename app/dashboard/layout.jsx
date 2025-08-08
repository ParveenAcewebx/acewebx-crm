import { AppSidebar } from '@/components/app-sidebar/app-sidebar'
import GlobalLoader from '@/components/GlobalLoader'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import UserContextProvider from '@/contexts/UserContextProvider'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
export default async function AdminDashboardLayout({ children }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/login')
  }
  return (
    <>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <UserContextProvider>
            <SidebarInset className='theme-bg-light-rgba'>
              <div className='mx-5 my-5 flex flex-1 flex-col gap-2 rounded-sm mt-20'>
                <Toaster />
                {children}
              </div>
              <GlobalLoader />
            </SidebarInset>
          </UserContextProvider>
        </SidebarProvider>
      </div>
    </>
  )
}