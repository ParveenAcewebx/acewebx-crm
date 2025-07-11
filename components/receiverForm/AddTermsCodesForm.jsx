'use client'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { TermTypeData } from '../static-Values'

export default function AddReceiverForm({ form }) {
  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormSelectField
          name='purchaseOrder'
          className=''
          label='Purchase Order'
          placeholder='Select Order'
          options={TermTypeData}
        />
          <FormInputField
          name='lineItem'
          className=''
          label='Line Item'
          placeholder='Enter Line Item'
        />
        <FormInputField
          name='receivedBy'
          className=''
          label='Received By'
          placeholder='Enter Received By'
        />
        <FormDatePicker
          name='receivedDate'
          className=''
          label='Received Date'
          placeholder='Select Received Date'
          // type='number'
        />
       
        <FormInputField
          name='receivedQty'
          className=''
          label='Received Quantity '
          placeholder='Enter Received Quantity '
          type='number'
        />
        <FormInputField
          name='orderedQty'
          className=''
          label='Ordered Quantity'
          placeholder='Enter Ordered Quantity'
          type='number'
        />
      </div>
    </>
  )
}
