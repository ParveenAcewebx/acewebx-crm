'use client'
import api from '@/lib/api'
import { useEffect, useState } from 'react'
import LeadsServices from '../../services/Leads/lead'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import TextEditor from '../share/form/TextEditor'

export default function AddContactForm({ form }) {
  const [companyData, setCompanyData] = useState([])
  const [zipCode, setZipCode] = useState([])

  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [zipCodeRes, response] = await Promise.all([
          api.get('taxes?limit=100'),
          LeadsServices.companies()
        ])
        if (zipCodeRes.status === 200) {
          const modifyProjectData = zipCodeRes?.data?.data.map(item => {
            return {
              label: `${item.zipcode}`,
              value: String(item.id)
            }
          })
          setZipCode(modifyProjectData)
        }
        if (response.status === 200) {
          setCompanyData(response?.data?.data)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  return (
    <div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField
          name='firstName'
          type='text'
          className=''
          label='First Name'
          placeholder='Enter First name'
        />
        <FormInputField
          name='lastName'
          type='text'
          className=''
          label='Last Name'
          placeholder='Enter Last name'
        />

        <FormInputField
          name='email'
          type='email'
          className=''
          label='Email'
          placeholder='Enter Email'
        />
        <FormInputField
          name='phone'
          type='text'
          className=''
          placeholder='Enter Phone number'
          label='Phone'
        />
      </div>
      <div className='mt-4 space-y-1'>
        <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
          Company
        </label>
        <FormSelectField
          form={form}
          name='company_id'
          placeholder='Select Company'
          options={
            companyData.length > 0
              ? companyData.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
      </div>
      <div className='mt-4 space-y-1'>
        <FormInputField
          name='address'
          type='text'
          className=''
          label='Street Address'
          placeholder='Enter address'
        />
      </div>
      <div className='mt-4 grid grid-cols-3 gap-3'>
        <div className='space-y-1'>
          <FormInputField
            placeholder='City'
            form={form}
            name='city'
            label='City'
            type='text'
          />
        </div>
        <div className='space-y-1'>
          <FormInputField
            placeholder='State'
            form={form}
            name='state'
            label='State'
            type='text'
          />
        </div>
        <div className='space-y-1'>
          <FormSelectField
            name='zip'
            form={form}
            placeholder=''
            label='Zip Code'
            options={zipCode}
          />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4'>
        {/* <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Address
          </label>

         

        </div> */}
        <div className='grid grid-cols-1 gap-4'>
          <TextEditor
            name='notes'
            form={form}
            className='mt-4'
            placeholder='Enter notes'
            label='Notes'
          />
        </div>
      </div>
    </div>
  )
}
