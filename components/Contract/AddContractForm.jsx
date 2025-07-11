'use client'
import FormInputField from '../share/form/FormInputField'

export default function AddContractForm({ form }) {
  return (
    <div>
      <div className='mt-4 grid grid-cols-1 gap-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Name
          </label>
          <FormInputField name='name' type='text' className='' />
        </div>{' '}
      </div>{' '}
    </div>
  )
}
