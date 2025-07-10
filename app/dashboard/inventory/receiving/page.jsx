'use client'
import FormCheckBox from '@/components/share/form/CheckBox'
import FormDatePicker from '@/components/share/form/datePicker'
import FormInputField from '@/components/share/form/FormInputField'
import SelectFilter from '@/components/share/form/SelectFilter'
import { DataTable } from '@/components/Table'
import PurchaseOrderService from '@/services/PurchaseOrder/purchase-order'
import { ArrowLeft, Plus, SaveAll } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { InventoryRecevingColumns } from './inventoryReceivingColumn'

export default function InventoryReceiving() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [getList, setList] = useState([])
  const [poData, setPoData] = useState([])
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)

  const form = useForm()
  const detailForm = useForm()
  const poValue = form.watch('poNumber')

  // Fetch PO list for dropdown
  const fetchPurchaseOrder = async () => {
    try {
      const response = await PurchaseOrderService.getPurchaseorder(page, length)
      if (response?.status === 200) {
        setList(response?.data?.data)
      }
    } catch (error) {
      console.error('Error fetching PO list', error)
    }
  }

  useEffect(() => {
    fetchPurchaseOrder()
  }, [])

  // Fetch PO data when poNumber changes
  const fetchPurchaseOrderData = async poId => {
    try {
      const response = await PurchaseOrderService.purchaseOrderInventory(poId)
      if (response?.status === 200) {
        setPoData(response?.data?.data)
      }
    } catch (error) {
      console.error('Error fetching PO data', error)
    }
  }

  useEffect(() => {
    if (poValue) {
      fetchPurchaseOrderData(poValue)
    }
  }, [poValue])

  // Set form values from fetched PO data
  useEffect(() => {
    if (poData) {
      form.setValue('vendorId', poData?.vendor_id || '')
      form.setValue('vendorName', poData?.vendor?.name || '')
      form.setValue(
        'shipTo',
        (poData?.warehouse_address && 'warehouse') ||
          (poData?.dropShip_address && 'DropShip')
      )
      form.setValue(
        'shipToAddress',
        poData?.warehouse_address || poData?.dropShip_address
      )
      form.setValue('warehouseCode', poData?.warehouse || '')
      // aur bhi fields agar chahiye toh set kar sakte ho
    }
  }, [poData])
  useEffect(() => {
    if (getList.length > 0) {
      const lastPO = getList[getList.length - 1]
      if (lastPO?.customerPo) {
        form.setValue('poNumber', lastPO.customerPo)
      }
    }
  }, [getList])

  const onSubmit = data => {
    console.log('Main form data', data)
  }

  const handleRowClick = row => {
    console.log('row', row)

    setSelectedRow(row)
  }
  useEffect(() => {
    if (poData?.line_tab?.length > 0) {
      setSelectedRow(poData.line_tab[0])
    }
  }, [poData?.line_tab])
  return (
    <div className='p-4'>
      <div className='mb-4 flex items-center bg-[#EBEFFF] pl-6 text-[#565656]'>
        <div className='rounded-full border border-[#DBDBDB] p-[3px]'>
          <ArrowLeft stroke='#565656' />
        </div>

        <h2 className='rounded pb-4 pl-[22px] pt-4 text-2xl font-bold'>
          Inventory Receiving
        </h2>

        <div className='flex items-center gap-3 pl-6'>
          <div className='rounded-full border border-[#DBDBDB] p-[3px]'>
            <SaveAll stroke='#565656' />
          </div>
          <div className='rounded-full border border-[#DBDBDB] p-[3px]'>
            <Plus stroke='#565656' />
          </div>
        </div>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-4 grid grid-cols-3 gap-4 bg-[#EBEFFF] p-4 font-normal text-[#475559]'>
            <FormInputField
              form={form}
              name='vendorId'
              placeholder='Enter Vendor'
              label='Vendor'
              readOnly
            />
            <FormInputField
              form={form}
              name='shipTo'
              placeholder='Enter Ship To'
              label='Ship To'
              readOnly
            />

            <SelectFilter
              form={form}
              name='poNumber'
              label='P.O. #'
              placeholder='Select  P.O. Number'
              options={getList?.map(po => ({
                label: po.customerPo,
                value: po.customerPo
              }))}
            />

            <FormInputField
              form={form}
              name='vendorName'
              placeholder='Enter Name'
              label='Name'
              readOnly
            />
            <div className='mt-8'>
              <FormInputField
                form={form}
                name='shipToAddress'
                placeholder='Enter Item'
                readOnly
              />
            </div>
            <FormInputField
              form={form}
              name='warehouseCode'
              placeholder='Enter Whse Code'
              label='Whse Code'
              readOnly
            />
          </div>

          {/* Table will show only if poData.line_tab has data */}
          {poData?.line_tab?.length > 0 && (
            <div className='mt-4'>
              <DataTable
                data={poData.line_tab}
                loading={false}
                columns={InventoryRecevingColumns(handleRowClick)}
                totalRecord={poData.line_tab.length}
                page={page}
                setPage={setPage}
                length={length}
              />
            </div>
          )}
          {/* Detail section when row is selected */}
          {selectedRow && poData?.line_tab?.length > 0 && (
            <div className='mt-4 bg-[#EBEFFF] p-4'>
              <h3 className='mb-2 text-xl font-bold'>
                Item Details - Line {selectedRow.line}
              </h3>
              <div className='mt-4 bg-[#FFFFFF] p-4'>
                <div className='mb-4 grid grid-cols-5 gap-1 text-[#475559]'>
                  <div></div>
                  <div className='mt-8'>
                    <FormInputField
                      form={detailForm}
                      name='Code'
                      //   placeholder='Enter UPC Code'
                      label=''
                    />
                  </div>
                  <FormInputField
                    form={detailForm}
                    name='upcCode'
                    placeholder='Enter UPC Code'
                    label='UPC Code 1'
                  />
                  <FormInputField
                    form={detailForm}
                    name='unitMeasure'
                    placeholder='Enter Unit Measure'
                    label='U/M 1'
                  />
                  <FormInputField
                    form={detailForm}
                    name='shipLocation'
                    placeholder='Enter Ship Location'
                    label='Ship Location'
                  />
                </div>
                <div className='mb-4 grid grid-cols-5 gap-1 text-[#475559]'>
                  <FormInputField
                    form={detailForm}
                    name='venderItem'
                    placeholder='Enter Vender Item'
                    label='Vender Item'
                  />
                  <div className='mt-8'>
                    <FormInputField
                      form={detailForm}
                      name='Code'
                      //   placeholder='Enter UPC Code'
                      label=''
                    />
                  </div>
                  <FormInputField
                    form={detailForm}
                    name='upcCode2'
                    placeholder='Enter UPC Code'
                    label='UPC Code 2'
                  />
                  <FormInputField
                    form={detailForm}
                    name='unitMeasure'
                    placeholder='Enter Unit Measure'
                    label='U/M 2'
                  />

                  <FormInputField
                    form={detailForm}
                    name='receiveLocation'
                    placeholder='Enter Receive Location'
                    label='Receive Location'
                  />
                </div>
                <div className='mb-4 grid grid-cols-5 gap-1 text-[#475559]'>
                  <FormInputField
                    form={detailForm}
                    name='goToItem'
                    placeholder=''
                    label='Go To Item'
                  />
                  <FormInputField
                    form={detailForm}
                    name='go'
                    placeholder=''
                    label='Go'
                  />
                  <FormInputField
                    form={detailForm}
                    name='upcCode3'
                    placeholder='Enter UPC Code'
                    label='UPC Code 3'
                  />
                  <FormInputField
                    form={detailForm}
                    name='unitMeasure'
                    placeholder='Enter Unit Measure'
                    label='U/M 3'
                  />
                  <FormInputField
                    form={detailForm}
                    name='msdsLocation'
                    placeholder='Enter MSDS Location'
                    label='MSDS Location'
                  />
                </div>
                <div className='mb-4 grid grid-cols-5 gap-1 text-[#475559]'>
                  <div>
                    <FormCheckBox
                      name='Discrepancy'
                      // label='Delay'
                      className='mx-2 my-5 !text-base'
                      form={form}
                      items={[
                        {
                          value: 'true',
                          label: 'Discrepancy'
                        }
                      ]}
                    />
                    <FormCheckBox
                      name='DiscrepancyOpen'
                      // label='Delay'
                      className='mx-2 my-5 !text-base'
                      form={form}
                      items={[
                        {
                          value: 'true',
                          label: 'Discrepancy open'
                        }
                      ]}
                    />
                  </div>
                  <div className='mt-8'>
                    <FormInputField
                      form={detailForm}
                      name='Code'
                      //   placeholder='Enter UPC Code'
                      label=''
                    />
                  </div>
                  <FormInputField
                    form={detailForm}
                    name='upcCode4'
                    placeholder='Enter UPC Code'
                    label='UPC Code 4'
                  />
                  <FormInputField
                    form={detailForm}
                    name='unitMeasure'
                    placeholder='Enter Unit Measure'
                    label='U/M 4'
                  />
                  <FormDatePicker
                    form={detailForm}
                    name='requestDate'
                    label='Request Date'
                  />
                </div>
                <div className='mb-4 grid grid-cols-3 gap-4 text-[#475559]'>
                  <FormInputField
                    form={detailForm}
                    name='onHand'
                    placeholder=''
                    label='On Hand'
                  />
                  <FormInputField
                    form={detailForm}
                    name='externalPO'
                    placeholder=''
                    label='External PO'
                  />
                  <FormInputField
                    form={detailForm}
                    name='externalPOReceipt'
                    placeholder=''
                    label='External PO For This Receipt'
                  />
                </div>
              </div>
              {/* <div className='flex gap-4'>
                <button
                  type='submit'
                  className='rounded bg-blue-500 px-4 py-2 text-white'
                >
                  Submit
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setSelectedRow(null)
                    detailForm.reset()
                  }}
                  className='rounded bg-gray-500 px-4 py-2 text-white'
                >
                  Cancel
                </button>
              </div> */}
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  )
}
