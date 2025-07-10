
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MainTab from './MainTab'
import UnitTab from './UnitTab'
import Vendor from './Vendor'
import WareHouse from './WareHouse'
import WebTab from './WebTab'

const InventoryItemsTabs = ({ form, setImageUpload, updateImage,setVendorDelete,setDelWareHouse }) => {
  return (
    <>
      <Tabs defaultValue='main'>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
          <TabsTrigger
            value='main'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Main
          </TabsTrigger>
          <TabsTrigger
            value='unit'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Unit
          </TabsTrigger>
          <TabsTrigger
            value='vendor'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Vendor
          </TabsTrigger>
          <TabsTrigger
            value='web'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Web
          </TabsTrigger>

          <TabsTrigger
            value='wareHouse'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Warehouse
          </TabsTrigger>
        </TabsList>

        <TabsContent value='main'>
          <MainTab
            form={form}
            setImageUpload={setImageUpload}
            updateImage={updateImage}
          />
        </TabsContent>
        <TabsContent value='unit'>
          <UnitTab form={form} />
        </TabsContent>
        <TabsContent value='vendor'>
          <Vendor form={form} setVendorDelete={setVendorDelete}/>
        </TabsContent>
        <TabsContent value='web'>
          <WebTab form={form} />
        </TabsContent>
        <TabsContent value='wareHouse'>
          <WareHouse form={form} setDelWareHouse={setDelWareHouse}/>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default InventoryItemsTabs
