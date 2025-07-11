import FormInputField from '../share/form/FormInputField'

const MaterialFields = ({ form }) => {
  return (
    <>
     <div className='grid grid-cols-2 gap-4'>
     <FormInputField
        form={form}
        name='item'
        placeholder='Enter Item'
        label='Item'
      />
      <FormInputField
        form={form}
        name='description'
        placeholder='Enter description'
        label='Description
'
      />
      <FormInputField
        form={form}
        name='brand'
        placeholder='Enter Brand'
        label='Brand'
      />
      <FormInputField
        form={form}
        name='cost'
        placeholder='Enter Cost/Pack'
        label='Cost/Pack'
        type='number'
      />
      <FormInputField
        form={form}
        name='qty'
        placeholder='Enter Pack Qty'
        label='Pack Qty'
        type='number'
      />
      <FormInputField
        form={form}
        name='total'
        placeholder='Enter Cost Each'
        label='Cost Each'
        type='number'
      />
      <FormInputField
        form={form}
        name='hardware_type'
        placeholder='Enter Hardware Type '
        label='Hardware Type'
      />
     </div>
    </>
  )
}

export default MaterialFields
