'use client'
import FormCheckBox from '@/components/share/form/CheckBox'
import FormDatePicker from '@/components/share/form/datePicker'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { DataTable } from '@/components/Table'
import VoucherModal from '@/components/VoucherModal/voucherModal'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { InventoryRecevingColumns } from '../receiving/inventoryReceivingColumn'

export default function InventoryReceiving() {
  const pOption = [
    { value: 'PO001', label: 'PO001' },
    { value: 'PO002', label: 'PO002' },
    { value: 'PO003', label: 'PO003' },
    { value: 'PO004', label: 'PO004' }
  ]
  const [showTable, setShowTable] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const form = useForm()
  const detailForm = useForm()
  const poValue = form.watch('poNumber')
  const [isVoucherModalOpen, setIsVoucherModal] = useState(false)

  console.log('isVoucherModalOpen', isVoucherModalOpen)
  // Dummy data for table
  const dummyData = [
    {
      line: '001',
      item: 'RL15',
      desc: '193857 / BSA / NT1865DMA',
      qtyOrdered: 1,
      uom: 'EA',
      qtyReceived: 0,
      receivedToDate: '25/05/25',
      qtyBilled: 1,
      manualBilled: 'No',
      receivedExt: '$0.00',
      expectDate: '15/06/25'
    },
    {
      line: '002',
      item: 'RL15',
      desc: '194493 / Moyrl Const. / NR1890',
      qtyOrdered: 1,
      uom: 'EA',
      qtyReceived: 0,
      receivedToDate: '25/05/25',
      qtyBilled: '1',
      manualBilled: 'No',
      receivedExt: '$0.00',
      expectDate: '15/06/25'
    },
    {
      line: '003',
      item: 'RL15',
      desc: '193925 / Guzman / NT1865DMA',
      qtyOrdered: 1,
      uom: 'EA',
      qtyReceived: 0,
      receivedToDate: '25/05/25',
      qtyBilled: 1,
      manualBilled: 'No',
      receivedExt: '$0.00',
      expectDate: '15/06/25'
    },
    {
      line: '004',
      item: 'RL15',
      desc: '7501338 / Espinosa / WH18DBFL2',
      qtyOrdered: 1,
      uom: 'EA',
      qtyReceived: 0,
      receivedToDate: '25/05/25',
      qtyBilled: 1,
      manualBilled: 'No',
      receivedExt: '$0.00',
      expectDate: '15/06/25'
    }
  ]
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10) // rows per page
  const totalRecord = dummyData.length // ya actual total if using api

  // Watch poNumber value and update showTable
  useEffect(() => {
    setShowTable(poValue === 'PO001')
  }, [poValue])

  const onSubmit = data => {
    console.log('Main form data', data)
  }

  const onDetailSubmit = data => {
    console.log('Detail form data', data)
    setSelectedRow(null) // Close the form after submission
    detailForm.reset() // Reset the detail form
    // setIsVoucherModal(true)
  }

  const handleRowClick = row => {
    setSelectedRow(row)
  }

  return (
    <div className='p-4'>
      <h2 className='mb-4 text-2xl font-bold'>Inventory Receiving</h2>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-4 grid grid-cols-3 gap-4 bg-[#e6f0fa] p-4'>
            <FormInputField
              form={form}
              name='vendor'
              placeholder='Enter Vendor'
              label='Vendor'
            />
            <FormInputField
              form={form}
              name='shipTo'
              placeholder='Enter Ship To'
              label='Ship To'
            />

            <FormSelectField
              form={form}
              name='poNumber'
              placeholder='Select  P.O. Number'
              options={pOption}
              label='P.O. #'
            />
            <FormInputField
              form={form}
              name='name'
              placeholder='Enter Name'
              label='Name'
            />
            <FormInputField
              form={form}
              name='item'
              placeholder='Enter Item'
              label='Item'
            />
            <FormInputField
              form={form}
              name='whseCode'
              placeholder='Enter Whse Code'
              label='Whse Code'
            />
          </div>

          {showTable && (
            <div className='mt-4'>
              <DataTable
                data={dummyData}
                loading={false}
                columns={InventoryRecevingColumns(handleRowClick)}
                totalRecord={totalRecord}
                page={page}
                setPage={setPage}
                length={length}
              />
            </div>
          )}
        </form>
      </FormProvider>

      {selectedRow && (
        <div className='mt-4 bg-[#e6f0fa] p-4'>
          <h3 className='mb-2 text-xl font-bold'>
            Item Details - Line {selectedRow.line}
          </h3>
          <FormProvider {...detailForm}>
            <form onSubmit={detailForm.handleSubmit(onDetailSubmit)}>
              <div className='mb-4 grid grid-cols-5 gap-1'>
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
              <div className='mb-4 grid grid-cols-5 gap-1'>
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
              <div className='mb-4 grid grid-cols-5 gap-1'>
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
              <div className='mb-4 grid grid-cols-5 gap-1'>
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
              <div className='mb-4 grid grid-cols-3 gap-4'>
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
              <div className='flex gap-4'>
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
              </div>
            </form>
          </FormProvider>
        </div>
      )}
      {isVoucherModalOpen && (
        <VoucherModal
        form={form}
          setIsVoucherModal={setIsVoucherModal}
          isVoucherModalOpen={isVoucherModalOpen}
        />
      )}
    </div>
  )
}
