'use client'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import AllCandidates from './candidates/page'

export default function DashboardPage() {
  useDocumentTitle('Home')
  return <AllCandidates />
}
