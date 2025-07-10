'use client'
import FormInputField from '../share/form/FormInputField'
export default function AddCompanyTypeForm({ form, id }) {
  console.log('id', id)
  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        {id === '1' ? (
          <FormInputField
            name='name'
            className=''
            label='Name'
            placeholder='Enter Name'
            disable
          />
        ) : (
          <FormInputField
            name='name'
            className=''
            label='Name'
            placeholder='Enter Name'
          />
        )}

        {/* <FormInputField
          name='backgroundColor'
          className=''
          label='Background Color'
          placeholder='Enter background color'
          type='color'
        /> */}

        <div>
          <label className='mb-1 block'>Background Color</label>
          <div className='flex items-center gap-2 rounded border px-1 py-0'>
            <FormInputField
              form={form}
              name='backgroundColor'
              type='color'
              className='h-12 w-12 !rounded-xl border-none p-0'
            />
            <FormInputField
              form={form}
              name='backgroundColor'
              type='text'
              className='w-full border-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0'
              placeholder='#000000'
            />
          </div>
        </div>

        <FormInputField
          name='sortOrder'
          type='number'
          className=''
          label='Sort Order'
          placeholder='Enter Sort Order'
        />
      </div>
    </>
  )
}
