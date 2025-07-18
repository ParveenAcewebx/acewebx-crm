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
            <header className='border-color-grey flex h-20 shrink-0 items-center gap-2 border-b bg-white shadow-[0_0_15px_-10px_black] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
              <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
              </div>
            </header>
            <div className='mx-5 my-5 flex flex-1 flex-col gap-2 rounded-sm p-4'>
              <Toaster />
              {children}
            </div>
            <GlobalLoader/>
            {/* <DashboardFooter /> */}
          </SidebarInset>
          </UserContextProvider>
        </SidebarProvider>
      </div>
    </>
  )
}