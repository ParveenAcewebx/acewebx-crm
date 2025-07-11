'use client'
import { CompanyTypeServices } from '@/services/Crm/company'
import { useEffect, useState } from 'react'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import TextEditor from '../share/form/TextEditor'
import { TaxableData } from '../static-Values'
import { errorMessage } from '../ToasterMessage'

export default function AddCompanyForm({ form }) {
  const [companyTypeData, setCompanyTypeData] = useState([])

  const getCompanyType = async () => {
    try {
      const response = await CompanyTypeServices.allCompaniesType()
      if (response.status === 200) {
        setCompanyTypeData(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getCompanyType()
  }, [])

  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField
          name='name'
          className=''
          label='Name'
          placeholder='Enter Name'
        />
        <FormSelectField
          name='companyType'
          className=''
          label='Company Type'
          placeholder='Select Type'
          options={
            companyTypeData.length > 0
              ? companyTypeData.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
      </div>
      <div className='mt-4'>
        <FormInputField
          name='address'
          type='text'
          className=''
          label='Address'
          placeholder='Enter Address'
        />
      </div>
      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormInputField
          placeholder='Enter city'
          form={form}
          name='city'
          label='City'
          type='text'
        />
        <FormInputField
          placeholder='Enter state'
          form={form}
          name='state'
          label='State'
          type='text'
        />
        <FormInputField
          name='zip'
          form={form}
          placeholder='Enter zipcode'
          label='Zip Code'
          type='number'
        />
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField
          name='companyLeadScore'
          form={form}
          type='number'
          placeholder='Enter company lead score'
          label='Company Lead Score'
        />
        <FormSelectField
          name='tax'
          className=''
          form={form}
          label='Tax'
          placeholder='Select'
          options={TaxableData}
        />
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4'>
        <TextEditor
          name='companyNotes'
          form={form}
          className='mt-4'
          placeholder='Enter company notes'
          label='Company Notes'
        />
      </div>
    </>
  )
}
