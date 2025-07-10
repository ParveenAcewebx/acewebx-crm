'use client'
import InventoryServices from '@/services/Inventory/Inventory'
import PurchaseOrderService from '@/services/PurchaseOrder/purchase-order'
import { TermsCodesServices } from '@/services/Settings/TermsCodes'
import { useEffect, useState } from 'react'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import SelectFilter from '../share/form/SelectFilter'
import FormTextArea from '../share/form/TextArea'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Header from './Header'
import LineTab from './LineTab'
import OrdersTab from './OrdersTab/orders'
import ReceiptTab from './ReceiptTab/Receipt'
import Total from './Total'

const PurchaseFormFields = ({ form,    
  setRemovelinetab,

  setRemovedOrderTab, }) => {
  // Define order type options
  const orderTypeOption = [
    { value: 'Dropship', label: 'Dropship' },
    { value: 'Warehouse', label: 'Warehouse' }
  ]
  const [getList, setList] = useState([])
  // State to hold the list of vendors
  const [vendors, setVendors] = useState([])
  // Get the vendor_id from the form values
  const getVendor = form?.getValues('vendor_id')
  // State to hold the list of warehouses
  const [warehouses, setWarehouses] = useState([])
  const [termsCode, setTermsCode] = useState([])
  // Watch orderType value
  const orderType = form.watch('orderType')
  const getWarehouse = form?.getValues('warehouse')
  console.log('getWarehouse', getWarehouse)

  // Set default orderType and generate random PO number when component mounts
  // Function to generate a new PO number
  const generatePONumber = newId => {
    const newPoNumber = `${newId}` 
    form.setValue('customerPo', newPoNumber)
    return newPoNumber
  }

  // Fetch purchase orders on mount and set initial PO number
  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        const response = await PurchaseOrderService.getPurchaseorder()
        console.log('API Response:', response)
        if (response?.status === 200) {
          const poList = response.data.data // Access the array of purchase orders
          setList(poList) // Update state with fetched data
          console.log('poList', poList)

          // Generate PO number for a new record
          // Find the maximum id in the existing list to determine the next id
          const maxId =
            poList.length > 0 ? Math.max(...poList.map(po => po.id), 0) : 0
          const nextId = maxId + 1 // Next id for a new record
          generatePONumber(nextId) // Set customerPo for the new record
        } else {
          console.log('API status not 200, setting default customerPo')
          generatePONumber(1) // Fallback to PO#1 if no data
        }
      } catch (error) {
        console.error('Error fetching purchase orders:', error)
        generatePONumber(1) // Fallback to PO#1 on error
      }
    }

    fetchPurchaseOrder()
    form.setValue('orderType', 'Dropship') // Set default orderType
  }, [form, setList])

  // Clear fields based on orderType
  useEffect(() => {
    if (orderType === 'Dropship') {
      form.setValue('warehouse', '')
      form.setValue('warehouse_address', '')
    } else {
      form.setValue('dropship_address', '')
    }
  }, [orderType, form])

  //Fetch terms code vendor
  useEffect(() => {
    const fetchTermsCode = async () => {
      try {
        const response = await TermsCodesServices.getTermsCodesByType('vendors')
        if (response?.status == 200) {
          setTermsCode(response?.data?.data.records)
        }
      } catch (error) {
        console.error('Error fetching terms code:', error)
      }
    }
    fetchTermsCode()
  }, [])

  // Fetch vendors
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await InventoryServices.AllVendors()
        if (response?.status == 200) {
          const vendorAddress = response?.data?.data?.find(
            vendor => vendor.id == getVendor
          )
          form.setValue('shipDetail', vendorAddress?.billTo)
          form?.setValue('headerTab.phone', vendorAddress?.phone)
          form?.setValue('headerTab.primaryAtt', vendorAddress?.email)
          form?.setValue('headerTab.vendorEmail', vendorAddress?.email)
          const vendor = response?.data?.data || []
          const formattedVendors = vendor.map(vendor => ({
            value: String(vendor.id),
            label: vendor.name
          }))
          setVendors(formattedVendors)
        }
      } catch (error) {
        console.error('Error fetching vendors:', error)
      }
    }
    fetchVendor()
  }, [getVendor, form])

  // Fetch warehouses once on mount
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await InventoryServices.AllWarehouse()
        if (response?.status == 200) {
          setWarehouses(response?.data?.data || [])
        }
      } catch (error) {
        console.error('Error fetching Warehouses:', error)
      }
    }
    fetchWarehouses()
  }, [])

  // Update warehouse address when selected warehouse changes
  useEffect(() => {
    const selectedWarehouse = warehouses.find(
      ware => String(ware.id) === form.getValues('warehouse')
    )
    if (selectedWarehouse) {
      form.setValue('warehouse_address', selectedWarehouse?.address || '')
      form.setValue('headerTab.warehouse', selectedWarehouse?.id || '')
    }
  }, [form.getValues('warehouse'), warehouses])

  const status = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <>
      <div>
        <div className='mb-5 flex items-stretch gap-4'>
          {/* Left section - 70% split into 2 columns */}
          <div className='grid w-[70%] grid-cols-2 gap-4'>
            {/* Column 1 - 50% */}
            <div className='flex flex-col justify-between'>
              <SelectFilter
                form={form}
                name='vendor_id'
                placeholder='Select Vendor'
                label='Vendor'
                options={vendors}
              />
              <FormTextArea
                form={form}
                className='mt-3 !h-48'
                name='shipDetail'
                placeholder='Enter Shipping Address'
                disabled={true}
              />
            </div>

            {/* Column 2 - 50% */}
            <div className='flex flex-col justify-between'>
              <div>
                <label className='w-28 text-sm font-medium text-gray-700'>
                  Order Type
                </label>
                <SelectFilter
                  form={form}
                  name='orderType'
                  placeholder='Select Order Type'
                  options={orderTypeOption}
                />
              </div>

              <div className='mt-4'>
                {orderType !== 'Dropship' ? (
                  <>
                    <SelectFilter
                      form={form}
                      name='warehouse'
                      placeholder='Select Ship To'
                      label='Ship To'
                      options={warehouses.map(ware => ({
                        value: String(ware.id),
                        label: ware.name
                      }))}
                    />
                    <FormTextArea
                      form={form}
                      className='mt-3 !h-48'
                      name='warehouse_address'
                      placeholder='Enter Ship To Address'
                    />
                  </>
                ) : (
                  <>
                    <label className='w-28 text-sm font-medium text-gray-700'>
                      Ship to
                    </label>
                    <FormTextArea
                      form={form}
                      className='mt-3 !h-48'
                      name='dropship_address'
                      placeholder='Enter Dropship Address'
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right section - 30% */}
          <div
            className='flex w-[30%] flex-col justify-between'
            style={{ marginTop: '19px' }}
          >
            <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
              {/* P/O */}
              <div className='col-span-2 grid grid-cols-[auto,1fr] items-center gap-2'>
                <label className='w-28 text-sm font-medium text-gray-700'>
                  P/O
                </label>
                <FormInputField
                  form={form}
                  name='customerPo'
                  placeholder=''
                  readOnly={true}
                  label=''
                />
              </div>

              {/* Status */}

              <div className='col-span-2 grid grid-cols-[auto,1fr] items-center gap-2'>
                <label className='w-28 text-sm font-medium text-gray-700'>
                  Select Status
                </label>
                <SelectFilter
                  form={form}
                  name='status'
                  placeholder='Select Status'
                  options={status}
                />
              </div>

              {/* Date Fields in 50/50 layout */}
              <div className='col-span-2 grid grid-cols-2 gap-4'>
                <div className='grid grid-cols-[auto,1fr] items-center gap-2'>
                  <label className='w-28 text-sm font-medium text-gray-700'>
                    Date Wanted
                  </label>
                  <FormDatePicker form={form} name='wanted' label='' />
                </div>

                <div className='grid grid-cols-[auto,1fr] items-center gap-2'>
                  <label className='w-28 text-sm font-medium text-gray-700'>
                    Date Ordered
                  </label>
                  <FormDatePicker form={form} name='dateOrdered' label='' />
                </div>
              </div>

              {/* Entered By */}
              <div className='col-span-2 grid grid-cols-[auto,1fr] items-center gap-2'>
                <label className='w-28 text-sm font-medium text-gray-700'>
                  Entered By
                </label>
                <FormInputField form={form} name='enteredBy' placeholder='' />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue='header' className='mt-5'>
          <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
            <TabsTrigger
              value='header'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Header
            </TabsTrigger>
            <TabsTrigger
              value='lines'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Lines
            </TabsTrigger>
            <TabsTrigger
              value='totals'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Totals
            </TabsTrigger>
            <TabsTrigger
              value='receipt'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Receipts
            </TabsTrigger>
            <TabsTrigger
              value='orders'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value='header'>
            <Header
              form={form}
              orderType={orderType}
              termsCode={termsCode?.map(terms => ({
                value: String(terms.id),
                label: terms.code
              }))}
              wareHouse={warehouses.map(ware => ({
                value: String(ware.id),
                label: ware.name
              }))}
            />
          </TabsContent>

          <TabsContent value='lines'>
            <LineTab form={form} 
              setRemovelinetab={setRemovelinetab}
          />
          </TabsContent>
          <TabsContent value='totals'>
            <Total form={form} />
          </TabsContent>
          <TabsContent value='receipt'>
            <ReceiptTab form={form} />
          </TabsContent>
          <TabsContent value='orders'>
            <OrdersTab form={form}    
              setRemovedOrderTab={setRemovedOrderTab}/>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default PurchaseFormFields
