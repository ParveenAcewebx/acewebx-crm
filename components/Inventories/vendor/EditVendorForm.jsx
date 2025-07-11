'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import InventoryServices from '@/services/Inventory/Inventory'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddVendorForm from './AddVendorForm'
// import AttributeTableData from './attribute-tableData'

const EditVendorForm = ({ editLeadId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editLeadId
  console.log('iddd', id)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      billTo: '',
      shipTo: ''
    }
  })
  useDocumentTitle('Edit Vendor')
  const router = useRouter()

  // Fetch the lead by Id To update the Id
  const fetchVendorById = async () => {
    try {
      const response = await InventoryServices.getVendorsById(id)
      if (response?.status === 200) {
        const vendorData = response.data.data

        // Pre-fill form values
        const formattedData = {
          ...vendorData
        }
        // form.setValue('contact_id', companyData.companyType?.id?.toString())
        console.log('formattedData', formattedData)
        form.reset(formattedData)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (id) {
      fetchVendorById()
    }
  }, [id])

  // handle to edit
  const handleVendorUpdate = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id || '')
      formData.append('name', data.name || '')
      formData.append('email', data.email || '')
      formData.append('phone', data.phone || '')
      formData.append('billTo', data.billTo || '')
      formData.append('shipTo', data.shipTo || '')

      const responseEdit = await InventoryServices.updateVendorsById(
        id,
        formData
      )
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        router.push('/dashboard/inventory/vendor')
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Edit Vendor'} />
      </div>

      <div className=''>
        <FormProvider {...form}>
          <form className='' onSubmit={form.handleSubmit(handleVendorUpdate)}>
            <AddVendorForm form={form} id={id} />
            <div className='mt-4 flex justify-end gap-4'>
              <Link href='/dashboard/inventory/vendor'>
                <Button type='button' className='site-button bg-cyan-400'>
                  Back
                </Button>
              </Link>

              <Button type='submit' className='site-button'>
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default EditVendorForm
