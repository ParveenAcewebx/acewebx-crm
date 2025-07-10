'use client'
import FormCheckBox from '../share/form/CheckBox'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import TextEditor from '../share/form/TextEditor'
import { DueTypeData, TermTypeData } from '../static-Values'

export default function AddTermsCodesForm({ form }) {

  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormSelectField
          name='term_type'
          className=''
          label='Term Type'
          placeholder='Select Type'
          options={TermTypeData}
        />
        <FormInputField
          name='code'
          className=''
          label='Code'
          placeholder='Enter code'
        />
        <FormInputField
          name='days_due'
          className=''
          label='Days Due'
          placeholder='Enter Days Due'
          type='number'
        />
        <FormInputField
          name='discount_days'
          className=''
          label='Discount Days'
          placeholder='Enter Discount Days'
          type='number'
        />
        <FormInputField
          name='discount_percent'
          className=''
          label='Discount Percent'
          placeholder='Enter Discount Percent'
          type='number'
          step='0.01'
          min={0}
          max={100}
        />

        <FormSelectField
          name='due_type'
          className=''
          label='Due Type'
          placeholder='Select Type'
          options={DueTypeData}
        />
        <div className='grid grid-cols-3 gap-4'>
          <FormCheckBox
            name='is_cod'
            className='mt-5'
            form={form}
            items={[{ label: 'Cash on delivery', value: true }]}
          />
          <FormCheckBox
            name='is_prepay'
            className='mt-5'
            form={form}
            items={[{ label: 'Prepayment', value: true }]}
          />
          <FormCheckBox
            name='active'
            className='mt-5'
            form={form}
            items={[{ label: 'Active flag', value: true }]}
          />
        </div>
      </div>
      <div className='mt-5 grid grid-cols-1 gap-4'>
        <TextEditor
          name='description'
          form={form}
          className='mt-4'
          placeholder='Enter description'
          label='Description'
        />
      </div>
    </>
  )
}
