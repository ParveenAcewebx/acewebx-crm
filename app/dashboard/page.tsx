'use client'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import AllEventsDates from '@/components/AllEventsDates'

export default function DashboardPage() {
  useDocumentTitle('Home')
  return <AllEventsDates />
}
