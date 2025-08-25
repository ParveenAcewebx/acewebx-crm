'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { CalendarDays, Fence, IndianRupee, LayoutDashboard, SettingsIcon, SquareUser } from 'lucide-react'
import Link from 'next/link'
import NavMain from './nav-main'
import { NavUser } from './nav-user'

const data = {
  home: {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    isActive: true
  },
  navMain: [
    {
      title: 'Candidates',
      url: '/dashboard/candidates',
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
      title: 'Employees',
      url: '/dashboard/employee',
      icon: SquareUser,
      isActive: true,
      items: [

        {
          title: 'Add Employee',
          url: '/dashboard/employee/add'
        },
        {
          title: 'All Employees',
          url: '/dashboard/employees'
        }
        , {
          title: 'Ex Employees',
          url: '/dashboard/ex-employees'
        }
      ]
    },
    {
      title: 'Events',
      url: '/dashboard',
      icon: CalendarDays,
      isActive: true,
      items: [

        {
          title: 'Add Event',
          url: '/dashboard/event/add'
        },
        {
          title: 'All Events',
          url: '/dashboard/events'
        }
      ]
    },

    {
      title: 'Expenses',
      url: '/dashboard/expense',
      icon: IndianRupee,
      isActive: true,
      items: [

        {
          title: 'Add Expense',
          url: '/dashboard/expense/add'
        },
        {
          title: 'All Expenses',
          url: '/dashboard/expenses'
        },
        ,
        {
          title: 'Expense Category',
          url: '/dashboard/settings/expense-category'
        }
      ]
    },
    // {
    //   title: 'Expense Category',
    //   url: '/dashboard/settings/expense-category',
    //   icon: Fence,
    //   isActive: true,
    //   items: [

    //     {
    //       title: 'Add',
    //       url: '/dashboard/settings/expense-category'
    //     }
    //   ]
    // },
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
    },
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
          {/* <p className={cn(
              'font-semibold transition-all',
              state === 'collapsed'
                ? 'w-0 overflow-hidden opacity-0'
                : 'w-auto opacity-100'
            )}
          >
          </p> */}
        </div>
        <NavMain homeItem={data?.home} items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}