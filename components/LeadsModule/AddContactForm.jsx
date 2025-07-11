'use client'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ContactFormSchema } from '../form-validations/contactForm'
import LeadsServices from '../../services/Leads/lead'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import FormTextArea from '../share/form/TextArea'
import { errorMessage, successMessage } from '../ToasterMessage'
import { ContactServices } from '@/services/Crm/project'

const AddContactForm = ({ id,handleCloseDialog, fetchContactsByCompany}) => {
  useDocumentTitle('Add lead')
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(ContactFormSchema)
  })
  const [companyData, setCompanyData] = useState([])
  const getCompanies = async () => {
    try {
      const response = await LeadsServices.companies()
      if (response.status === 200) {
        setCompanyData(response?.data?.data)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getCompanies()
  }, [])
  const router = useRouter()
  const handleContactSubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()

      // Direct fields
      formData.append('name', data.name || '')
      formData.append('email', data.email || '')
      formData.append('state', data.state || '')
      formData.append('zip', data.zip || '')
      formData.append('phone', data.phone || '')
      formData.append('state', data.state || '')
      formData.append('address', data.address || '')
      formData.append('company_id', data.company_id || '')

      // Submit to API
      const response = await ContactServices.AddContacts(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        if (id) {
          router.push(`/dashboard/leads/edit?id=${id}`)
        } else {
          router.push('/dashboard/leads/add')
        }
        form.reset()
        handleCloseDialog(false)
        fetchContactsByCompany()
      }
    } catch (error) {
      console.error('Lead submission error:', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  return (
    <>
      <div className='text-center !text-xl font-semibold'>Add Contact</div>
      <FormProvider {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(handleContactSubmit)()
          }}
        >
          <div className='mt-5 grid grid-cols-2 gap-4'>
            <FormInputField
              form={form}
              name='name'
              label='Name'
              placeholder='Enter Title'
            />
            <FormInputField
              form={form}
              name='email'
              label='Email'
              placeholder='Enter Email'
            />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-4'>
          <FormInputField
            form={form}
            name='phone'
            label='Phone'
            placeholder='Enter Phone'
            type='tel'
          />
            <FormSelectField
            form={form}
            name='company_id'
            label='Company'
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
          <div className='grid grid-cols-1 mt-3'>
            <FormTextArea form={form} name='address' label='Address' />
          </div>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            <FormInputField
              form={form}
              name='city'
              label='City'
              placeholder='Enter city'
            />
            <FormInputField
              form={form}
              name='state'
              label='State'
              placeholder='Enter state'
            />
            <FormInputField
              form={form}
              name='zip'
              label='Zip Code'
              placeholder='Enter zipcode'
            />
          </div>
          <div className='grid grid-cols-1 mt-3'>
        
          </div>
          
            <div className='mt-4 flex justify-end'>
              <Button type='submit' className='site-button'>Submit</Button>
            </div>
          
        </form>
      </FormProvider>
    </>
  )
}

export default AddContactForm
