'use client'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
// import AllCandidates from './candidates/page'
import AllEventsDates from '@/components/AllEventsDates'

export default function DashboardPage() {
  useDocumentTitle('Home')
  return <AllEventsDates />
}
