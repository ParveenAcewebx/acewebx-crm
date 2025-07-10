import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from '@/components/ui/drawer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ReceiptTabPanel = ({ index, form, open, setOpen }) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerClose asChild>
          <div className='flex items-center justify-between'>
            <div></div>
            <div></div>
            <Button variant='outline'>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DrawerClose>

        <DrawerHeader>
         Coming soon
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ReceiptTabPanel
