import FormInputField from '../share/form/FormInputField'

const FinancialTab = ({ form }) => {
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='projectValue'
          label='Project Value'
          type='number'
          placeholder='Enter Project Value'
        />
        <FormInputField
          form={form}
          name='estimatedValue'
          type='number'
          label='Estimated Value'
          placeholder='Enter Estimated Value'
        />
        <FormInputField
          form={form}
          name='units'
          label='Units'
          type='number'
          placeholder='Enter Units'
        />
      </div>
    </>
  )
}

export default FinancialTab
