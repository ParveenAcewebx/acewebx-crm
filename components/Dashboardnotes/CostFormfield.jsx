import FormInputField from '../share/form/FormInputField'

const CostFormfield = ({ form }) => {
  return (
    <>
      <div className='grid grid-cols-4 gap-4'>
        <FormInputField
          form={form}
          name='sp'
          label='SP'
          placeholder='Enter sp'
        />
        <FormInputField
          form={form}
          name='td'
          label='TD'
          placeholder='Enter td'
        />
        <FormInputField
          form={form}
          name='swm'
          label='SWM'
          placeholder='Enter swm'
        />
        <FormInputField
          form={form}
          name='up'
          label='UP'
          placeholder='Enter up'
        />
        <FormInputField
          form={form}
          name='rf'
          label='RF'
          placeholder='Enter rf'
        />
        <FormInputField
          form={form}
          name='co'
          label='CO '
          placeholder='Enter co'
        />
        <FormInputField
          form={form}
          name='dk'
          label='DK'
          placeholder='Enter dk'
        />
        <FormInputField
          form={form}
          name='st'
          label='ST'
          placeholder='Enter st'
        />
        <FormInputField
          form={form}
          name='dm'
          label='DM'
          placeholder='Enter dm'
        />
        <FormInputField
          form={form}
          name='po'
          label='PO'
          placeholder='Enter po'
        />
        <FormInputField
          form={form}
          name='cmu'
          label='CMU'
          placeholder='Enter cmu '
        />

        <FormInputField
          form={form}
          name='stl'
          label='STL'
          placeholder='Enter stl'
        />

        <FormInputField
          form={form}
          name='mc'
          label='MC'
          placeholder='Enter mc'
        />

        <FormInputField
          form={form}
          name='rtu'
          label='RTU'
          placeholder='Enter rtu'
        />
      </div>
    </>
  )
}

export default CostFormfield
