'use client'
import FormInputField from '@/components/share/form/FormInputField'
import FormTextArea from '@/components/share/form/TextArea'


export default function AddVendorForm({ form }) {
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
          name='email'
          className=''
          label='Email'
          placeholder='Enter Email'
        />
      </div>
      <div className='mt-4 grid grid-cols-1'>
        <FormInputField
          name='phone'
          type='tel'
          className=''
          label='Phone'
          placeholder='Enter phone'
        />
      </div>
      <div className='mt-4 grid grid-cols-1 '>
      <FormTextArea
        placeholder='Bill To'
        form={form}
        name='billTo'
        label='Address'
        type='text'
      />
      </div>
      <FormTextArea
        placeholder='Ship To'
        form={form}
        name='shipTo'
        type='text'
      />
    </>
  )
}
