'use client'

import api from '@/lib/api'
import LeadsServices from '@/services/Leads/lead'
import { MaterialService } from '@/services/Leads/material'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import SelectFilter from '../share/form/SelectFilter'
import FormTextArea from '../share/form/TextArea'
import FormDatePicker from '../share/form/datePicker'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import FinanceTab from './FinanceTab'
import FinancialTab from './FinancialTab'
import LineTab from './LineTab'
import TotalTab from './TotalTab'
import HeaderTab from './header'
const defaultRow = {
  item: '',
  description: '',
  qty: '',
  cost: '',
  margin: '',
  commission: '',
  price: '',
  total: '',
  notes: ''
}

const SalesOrderFields = ({ form, editId }) => {
  const [customer, setCustomer] = useState([])
  const [materialItem, setMaterialItem] = useState([])
  const [page, setPage] = useState('')
  const [length, setLength] = useState('')
  const [customerDetail, setCustomerDetail] = useState([])
  const [leadProject, setLeadProject] = useState([])
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const leadId = searchParams.get('leadId')
  if (leadId) {
    form.setValue('lead_project_id', leadId)
  }
  //  get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [customerRes, tagRes] = await Promise.all([
          api.get('customers?limit=100&take_all=true'),
          MaterialService.getMaterialList(length, page)
        ])
        if (customerRes.status === 200) {
          const modifyProjectData = customerRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setCustomerDetail(customerRes?.data?.data)

          setCustomer(modifyProjectData)
        }

        if (tagRes.status === 200) {
          const modifyProjectData = tagRes?.data?.data.map(item => {
            return {
              label: item.lable,
              value: item?.item
            }
          })

          setMaterialItem(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  // Set Customer Detail :-
  const customerFieldValue = form.watch('customer_id')
  useEffect(() => {
    const detailsData = customerDetail.find(
      item => item.id == customerFieldValue
    )
    form.setValue('customerDetails', detailsData?.address)
  }, [customerFieldValue])

  useEffect(() => {
    form.setValue('enteredBy', session?.user?.name)
    form.setValue('shipDetail', 'Dummy ')
  }, [])
  const status = [
    { label: 'OE', value: '1' },
    { label: 'AE', value: '2' }
  ]

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [leadProject] = await Promise.all([LeadsServices.getleads()])
        if (leadProject?.status === 200) {
          const modifyProjectData = leadProject?.data?.data.map(item => {
            return {
              label: item?.project?.name,
              value: String(item.id)
            }
          })
          setLeadProject(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  return (
    <>
      <div>
        <div className='mb-5 grid grid-cols-2 gap-4'>
          {/* Left section */}
          <div className='grid grid-cols-2 gap-3'>
            <SelectFilter
              form={form}
              name='customer_id'
              placeholder='Select Customer'
              label='Customer'
              options={customer}
            />
            <FormInputField
              form={form}
              name='ship_to'
              placeholder='Enter Ship To'
              label='Ship To'
            />

            <FormTextArea
              className='mt-1 !h-48'
              placeholder='Customer Details '
              form={form}
              disabled={true}
              name='customerDetails'
              label='Customer Details '
              type='text'
            />

            <FormTextArea
              className='mt-1 !h-48'
              placeholder='Ship To Details'
              form={form}
              disabled={true}
              name='shipDetail'
              label='Ship To Details'
              type='text'
            />
          </div>

          {/* Right section */}
          <div className='m-5 grid grid-cols-1 gap-y-4'>
            <div className='grid grid-cols-[auto,1fr] items-center gap-2'>
              <label className='w-28 text-sm font-medium text-gray-700'>
                Entered By
              </label>
              <FormInputField
                form={form}
                name='enteredBy'
                placeholder={session?.user?.name}
                disable={true}
              />
            </div>

            <div className='grid grid-cols-[auto,1fr] items-center gap-2'>
              <label className='w-28 text-sm font-medium text-gray-700'>
                Customer PO
              </label>
              <FormInputField form={form} name='customerPo' placeholder='' />
            </div>

            <div className='grid grid-cols-[auto,1fr] items-center gap-2'>
              <label className='w-28 text-sm font-medium text-gray-700'>
                Wanted
              </label>
              <FormDatePicker form={form} name='wanted' label='' />
            </div>

            <div className='grid grid-cols-[auto,1fr] items-center gap-2'>
              <label className='w-28 text-sm font-medium text-gray-700'>
                Date Ordered
              </label>
              <FormDatePicker form={form} name='dateOrdered' label='' />
            </div>

            <div className='grid grid-cols-[auto,1fr] items-center gap-2'>
              <label className='w-28 text-sm font-medium text-gray-700'>
                Status
              </label>
              <SelectFilter
                form={form}
                name='status'
                placeholder='Select Status'
                options={status}
              />
            </div>

            {!leadId && !editId && (
              <div className='grid grid-cols-[auto,1fr] items-center gap-2'>
                <label className='w-28 text-sm font-medium text-gray-700'>
                  Lead Project
                </label>
                <FormSelectField
                  name='lead_project_id'
                  form={form}
                  placeholder='Select Lead Project'
                  label=' '
                  options={leadProject}
                  disabled={!!editId}
                />
              </div>
            )}
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
              value='finances'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Finances
            </TabsTrigger>
            <TabsTrigger
              value='shipment'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Shipment
            </TabsTrigger>
            <TabsTrigger
              value='financial'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Financial
            </TabsTrigger>
          </TabsList>

          <TabsContent value='header'>
            <HeaderTab />
          </TabsContent>

          <TabsContent value='lines'>
            <LineTab form={form} />
          </TabsContent>
          <TabsContent value='totals'>
            <TotalTab form={form} />
          </TabsContent>
          <TabsContent value='finances'>
            <FinanceTab />
          </TabsContent>
          <TabsContent value='shipment'>
            Shipments will be available after picking and packing are completed
          </TabsContent>
          <TabsContent value='financial'>
            <FinancialTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default SalesOrderFields
