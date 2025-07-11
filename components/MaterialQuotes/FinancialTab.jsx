import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import InvoicesTab from './subtabs/InvoicesTab'
import PaymentsTab from './subtabs/PaymentsTab'

const FinancialTab = () => {
  return (
    <>
      <Tabs defaultValue='invoice' className='mt-5'>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
          <TabsTrigger
            value='invoice'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value='payments'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value='invoice'>
          <InvoicesTab />
        </TabsContent>

        <TabsContent value='payments'>
          <PaymentsTab />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default FinancialTab
