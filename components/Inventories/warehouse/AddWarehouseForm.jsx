'use client'

import FormInputField from "@/components/share/form/FormInputField"


export default function AddWarehouseForm() {

  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField 
          name='name'
          className=''
          label='Name'
          placeholder='Enter Name'
        />
        <FormInputField
          name='phone'
          className=''
          label='Phone'
          placeholder='Enter Phone'
        />
        <FormInputField
          name='email'
          className=''
          label='Email'
          placeholder='Enter Email'
        />
        <FormInputField
          name='address'
          className=''
          label='Address'
          placeholder='Enter Address'
        />
      </div>
      <div className='grid grid-cols-3 gap-4 mt-4'>
        <FormInputField
          name='city'
          className=''
          label='City'
          placeholder='Enter city'
        />
        <FormInputField
          placeholder='Enter State'
          name='state'
          label='State'
          type='text'
        />
        <FormInputField
          placeholder='Enter zip'
          name='zip'
          label='Zip'
          type='text'
        />
      </div>
    </>
  )
}
