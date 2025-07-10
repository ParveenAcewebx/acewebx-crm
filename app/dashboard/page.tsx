'use client'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import AllLeads from './leads/page'

export default function DashboardPage() {
  useDocumentTitle('Home')
  return <AllLeads />
}
