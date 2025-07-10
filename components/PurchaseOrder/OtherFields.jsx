import { X } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger
} from '../ui/drawer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import ItemTab from './ItemTab'
import PurchaseSummary from './LastPurchase'

const OtherFields = ({ index, form }) => {
  return (
    <>
      <Drawer className=''>
        <DrawerTrigger>
          <span className='hover:text-slate-500'>
            {(index + 1).toString().padStart(3, '0')}
          </span>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerClose asChild>
            <div className='flex items-center justify-between'>
              <div></div>
              <div></div>
              <Button variant='outline' className=''>
                <X className='h-4 w-4' />
              </Button>
            </div>
          </DrawerClose>

          <DrawerHeader>
            <Tabs defaultValue='header'>
              <TabsList className='w-full justify-start gap-2 rounded-none border-b bg-white'>
                <TabsTrigger
                  value='header'
                  className='rounded-none px-4 py-2 !shadow-none'
                >
                  Item
                </TabsTrigger>
                <TabsTrigger
                  value='lines'
                  className='rounded-none px-4 py-2 !shadow-none'
                >
                  Receipts
                </TabsTrigger>
                <TabsTrigger
                  value='totals'
                  className='rounded-none px-4 py-2 !shadow-none'
                >
                  Last Purchase
                </TabsTrigger>
                <TabsTrigger
                  value='receipt'
                  className='rounded-none px-4 py-2 !shadow-none'
                >
                  Short
                </TabsTrigger>
              </TabsList>

              <TabsContent value='header'>
                <ItemTab index={index} form={form} />
              </TabsContent>

              <TabsContent value='lines'>
                {/* <LineTab form={form} /> */}
              </TabsContent>
              <TabsContent value='totals'>
                {/* <Total form={form} /> */}
                <PurchaseSummary index={index} form={form} />
              </TabsContent>
              <TabsContent value='receipt'>{/* <FinanceTab /> */}</TabsContent>
            </Tabs>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              {/* <Button variant='outline'>Close</Button> */}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default OtherFields
