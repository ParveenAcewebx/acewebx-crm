'use client'

import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const CoverPreview = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [previewData, setPreviewData] = useState(null)
  console.log('previewData', previewData)
  const fetchCoverData = async () => {
    try {
      const response = await api?.get(`/projects/budget-history/details/${id}`)
      if (response.status === 200) {
        setPreviewData(response?.data?.data)
      }
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    fetchCoverData()
  }, [])

  const handleBackCoverPreview = () => {
    router.back()
  }

  return (
    <div className=''>
      <div className='mt-10 flex justify-between'>
        <h2 className='mb-8 text-3xl font-bold text-gray-800'>
          Revision - {previewData?.project_name || 'Project'}
        </h2>
        <Button onClick={handleBackCoverPreview}>Back</Button>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Customer Name */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Customer Name
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.customer?.name || 'No Data'}
          </p>
        </div>

        {/* Contact Name */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Contact Name
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.contact?.name || 'No Data'}
          </p>
        </div>
        {/* Engineer Name */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Engineer Name
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.engineer?.name || 'No Data'}
          </p>
        </div>
        {/* Customer Email */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Customer Email
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.customer?.email || 'No Data'}
          </p>
        </div>
        {/* Contact Email */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Contact Email
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.contact?.email || 'No Data'}
          </p>
        </div>

        {/* Engineer Email */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Engineer Email
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.engineer?.email || 'No Data'}
          </p>
        </div>
        {/* Quote Date */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Quote Date
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.quote_date
              ? new Date(previewData?.log?.data?.quote_date).toLocaleDateString(
                  'en-US',
                  {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                  }
                )
              : 'No Data'}
          </p>
        </div>

        {/* Plan Date */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Plan Date
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.plan_date
              ? new Date(previewData?.log?.data?.plan_date).toLocaleDateString(
                  'en-US',
                  {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                  }
                )
              : 'No Data'}
          </p>
        </div>

        {/* Units */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>Units</span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.budget_book?.units || 'No Data'}
          </p>
        </div>
        {/* Project Values */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Project Values
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.budget_book?.project_value || 'No Data'}
          </p>
        </div>
        {/* Estimated Value */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Estimated Value
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.budget_book?.estimated_value || 'No Data'}
          </p>
        </div>
        {/*  GROSS SQFT */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            GROSS SQFT
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.budget_book?.gross_sqft || 'No Data'}
          </p>
        </div>
        {/* Start Date */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Start Date
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.budget_book?.start_date
              ? new Date(
                  previewData?.log?.data?.budget_book?.start_date
                ).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric'
                })
              : 'No Data'}
          </p>
        </div>
        {/* End Date */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            End Date
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.budget_book?.end_date
              ? new Date(
                  previewData?.log?.data?.budget_book?.end_date
                ).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric'
                })
              : 'No Data'}
          </p>
        </div>

        {/* Address */}
        <div className='flex flex-col'>
          <span className='mb-1 text-sm font-medium text-gray-600'>
            Address
          </span>
          <p className='text-base text-gray-900'>
            {previewData?.log?.data?.address || ''},{' '}
            {previewData?.log?.data?.city || ''},{' '}
            {previewData?.log?.data?.state || ''},{' '}
            {previewData?.log?.data?.zip?.zipcode || ''}
          </p>
        </div>
      </div>

      {/* Plan Note */}
      <div className='mt-4 flex flex-col'>
        <span className='mb-1 text-sm font-medium text-gray-600'>
          Plan Note
        </span>
        <p className='text-base text-gray-900'>
          {previewData?.log?.data?.plan_note || 'No Data'}
        </p>
      </div>
    </div>
  )
}

export default CoverPreview
