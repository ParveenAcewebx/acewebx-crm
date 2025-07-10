'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddSalePersonForm from '../LeadsModule/AddSalePersonForm'

const SalesPersonSheet = ({getUsers}) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type='button' size='sm' className='bg-primary text-white rounded h-6 p-2 shadow-none gap-1'>
          <Plus className='mr-1 h-3 w-3' /> Add
        </Button>
      </SheetTrigger>
      <SheetContent className='max-h-screen overflow-y-auto'>
        <SheetHeader></SheetHeader>
        <AddSalePersonForm handleCloseDialog={setOpen} getUsers={getUsers} />
      </SheetContent>
    </Sheet>
  )
}

export default SalesPersonSheet
