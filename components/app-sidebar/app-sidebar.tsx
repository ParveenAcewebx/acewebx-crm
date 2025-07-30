'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import NavMain from './nav-main'
import { NavUser } from './nav-user'
import { SettingsIcon } from 'lucide-react'

const data = {
  navMain: [
    {
      title: 'Candidates',
      url: '/dashboard/',
      icon: DocumentTextIcon,
      isActive: true,
      items: [
        {
          title: 'Developers',
          url: '/dashboard/candidates'
        },
        {
          title: 'Sales',
          url: '/dashboard/candidate-sales'
        },

      ]
    },
    {
      title: 'Settings',
      url: '/dashboard/settings/skills',
      icon: SettingsIcon,
      isActive: true,
      items: [

        {
          title: 'Skills',
          url: '/dashboard/settings/skills'
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent className='theme-bg'>
        <div className='main-logo flex h-20 items-center justify-center gap-3 border-b bg-white px-2'>
          <Link href='/dashboard' className='flex-shrink-0'>
            <img src='/acewebxlogo.png' className='w-44' />{' '}
          </Link>
        </div>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
