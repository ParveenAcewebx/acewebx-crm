'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavMainProps {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
      items?: {
        title: string
        url: string
      }[]
    }[]
  }[]
}

export default function NavMain({  items }: NavMainProps) {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<string | null>(null)


  const isActiveUrl = (url: string) => {
    if (
      url === '/dashboard/candidates' &&
      pathname.startsWith('/dashboard') &&
      pathname.endsWith('/dashboard')&&
      !pathname.includes('/dashboard/candidate-sales')
    ) {
      return true
    }
    return pathname === url || pathname.startsWith(`${url}/`)
  }
  

  const isPathInclud = pathname.includes("")

  const isParentActive = (title: string, url: string) =>
    openSection === title || pathname.startsWith(url)

  useEffect(() => {
    const storedSection = localStorage.getItem('openSection')
    if (storedSection) setOpenSection(storedSection)
  }, [])

  const toggleSection = (title: string) => {
    setOpenSection(prev => {
      const newState = prev === title ? null : title
      localStorage.setItem('openSection', newState || '')
      return newState
    })
  }

  

  return (
    <SidebarGroup>
      <SidebarMenu>
        {/* Sidebar Sections */}
        {items.map(item => {
          const isOpen = openSection === item.title
          const isActive = item.url && isParentActive(item.title, item.url)

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              className='group/collapsible'
            >
              <SidebarMenuItem className='m-1 rounded'>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={cn(
                      'theme-text-color main-menu-item !rounded px-1 py-5 font-normal',
                      isActive && 'font-normal'
                    )}
                    tooltip={item.title}
                    onClick={() => toggleSection(item.title)}
                  >
                    <span
                      className={cn(
                        'menu-icon flex !h-7 !w-7 items-center justify-center rounded p-1',
                        isActive && 'text-white'
                      )}
                    >
                      {item.icon && <item.icon />}
                    </span>
                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        'ml-auto transition-transform duration-200',
                        isOpen && 'rotate-90'
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub className='sub-menu-item px-2 py-2'>
                    {item.items?.map(subItem => (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className='relative py-1'
                      >
                        {subItem.items ? (
                          <Collapsible asChild>
                            <>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton className='theme-text-color !rounded font-normal cursor-pointer'>
                                  <div className='flex w-full items-center justify-between'>
                                    <span>{subItem.title}</span>
                                    <ChevronRight className='ml-auto w-4 transition-transform duration-200' />
                                  </div>
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent className='pl-4'>
                                <SidebarMenuSub className='sub-menu-ul m-0 border-none'>
                                  {subItem.items.map(thirdItem => (
                                    <SidebarMenuSubItem
                                      key={thirdItem.title}
                                      className='relative py-1'
                                    >
                                      <SidebarMenuSubButton
                                        asChild
                                        className={cn(
                                          'theme-text-color !rounded font-normal hover:text-sidebar-primary active:text-sidebar-primary cursor-pointer',
                                          isActiveUrl(thirdItem.url) &&
                                            'font-normal text-sidebar-primary'
                                        )}
                                      >
                                        <Link href={thirdItem.url}>
                                          <span>{thirdItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </>
                          </Collapsible>
                        ) : (
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              'theme-text-color !rounded font-normal hover:text-sidebar-primary active:text-sidebar-primary cursor-pointer',
                              isActiveUrl(subItem.url) &&
                                'font-normal text-sidebar-primary'
                            )}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
