import UserContextProvider from '@/contexts/UserContextProvider'
import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export default async function QuotesPreviewDashboard({ children }) {
  return (
 
       <div className='mb-5'>
        <UserContextProvider>

         {children}
         </UserContextProvider>
       </div>
   
  )
}
