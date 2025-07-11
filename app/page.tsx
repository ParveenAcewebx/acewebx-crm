'use client'

import { useRouter } from 'next/navigation'

import useDocumentTitle from '@/components/utils/useDocumentTitle'
import JobApplicationForm from './job-application/page'

export default function AdminPage() {
  // const redirectUser =async()=>{
  //   const session = await getServerSession(authOptions)

  //     if (session?.user) {
  //       redirect('/login')
  //     }

  //     redirect('/catalog-view')

  // }

  // useEffect(() => {
  //   redirect('/login')
  // }, [])
  const router = useRouter()
  useDocumentTitle('Home')
  return (
    <>
      <JobApplicationForm />
    </>
  )
}
