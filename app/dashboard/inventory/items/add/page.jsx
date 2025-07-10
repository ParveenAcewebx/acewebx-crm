'use client'
import { inventoyItemsDefaultValues } from '@/components/DefaultValues'
import InventoryItemsTabs from '@/components/Inventories/InventoryItem/InventoryItemsTabs'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import InventoryServices from '@/services/Inventory/Inventory'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const InventoryItemsAdd = () => {
  const router = useRouter()
  const [imageUpload, setImageUpload] = useState(null)

  const form = useForm({
    defaultValues: inventoyItemsDefaultValues
  })

  const onSubmitItem = async data => {
    console.log("datadata",data)
    try {
      const formData = new FormData()

      // Keep image logic as-is
      if (imageUpload && Array.isArray(imageUpload)) {
        imageUpload.forEach((file, index) => {
          formData.append(`itemImages[${index}]`, file)
        })
      }
      if (data?.image && data?.image[0]) {
        formData.append('image', data?.image[0])
      }

      // Append simple fields
      formData.append('website_id', data?.website_id)
      formData.append('freeform', data?.freeform)
      formData.append('meta', data?.meta)
      formData.append('meta_description', data?.meta_description)
      formData.append('sku', data?.sku)
      formData.append('title_tag', data?.title_tag)
      formData.append('brand_id', data?.brand_id)
      formData.append('short_description', data?.short_description)
      formData.append('description', data?.description)
      // Properly append itemTags array
      if (Array.isArray(data?.itemTags)) {
        data?.itemTags?.forEach((tag, idx) => {
          formData.append(`itemTags[${idx}]`, tag)
        })
      }
      // Properly append itemCategories array
      if (Array.isArray(data?.itemCategories)) {
        data?.itemCategories?.forEach((cat, idx) => {
          formData.append(`itemCategories[${idx}]`, cat)
        })
      }
      // Properly append itemWeb (if it's an array of objects)
      if (Array.isArray(data?.itemWebs)) {
        data?.itemWebs?.forEach((web, idx) => {
          formData.append(`itemWebs[${idx}][category]`, web?.category)
          formData.append(`itemWebs[${idx}][description]`, web?.description)
          formData.append(`itemWebs[${idx}][sequence]`, web?.sequence)
        })
      }

      // Properly append itemUnits (if it's an array of objects)
      if (Array.isArray(data?.itemUnits)) {
        data?.itemUnits?.forEach((unit, idx) => {
          formData.append(`itemUnits[${idx}][unit_id]`, unit?.unit_id)
          formData.append(`itemUnits[${idx}][qty]`, unit?.qty)
          formData.append(`itemUnits[${idx}][per_unit_id]`, unit?.per_unit_id)
          formData.append(`itemUnits[${idx}][upc]`, unit?.upc)
          formData.append(`itemUnits[${idx}][height]`, unit?.height)
          formData.append(`itemUnits[${idx}][weight]`, unit?.weight)
          formData.append(`itemUnits[${idx}][length]`, unit.length)
          formData.append(`itemUnits[${idx}][width]`, unit.width)
        })
      }
      if (Array.isArray(data?.vendor)) {
        data?.vendor?.forEach((vend, idx) => {
          formData.append(`vendor[${idx}][vendor]`, vend?.vendor)
          formData.append(
            `vendor[${idx}][vendorComments]`,
            vend?.vendorComments
          )
          formData.append(`vendor[${idx}][vendorCost]`, vend?.vendorCost)
          formData.append(
            `vendor[${idx}][vendorCostPerUom]`,
            vend?.vendorCostPerUom
          )
          formData.append(`vendor[${idx}][vendorItem]`, vend?.vendorItem)
          formData.append(`vendor[${idx}][vendorUom]`, vend?.vendorUom)
        })
      }

      if (Array.isArray(data?.wareHouse)) {
        data?.wareHouse?.forEach((vend, idx) => {
          formData.append(`wareHouse[${idx}][average]`, vend?.average)
          formData.append(`wareHouse[${idx}][costPer]`, vend?.costPer)
          formData.append(`wareHouse[${idx}][lastCost]`, vend?.lastCost)
          formData.append(`wareHouse[${idx}][lastLand]`, vend?.lastLand)
          formData.append(
            `wareHouse[${idx}][listGrossMargin]`,
            vend?.listGrossMargin
          )
          formData.append(`wareHouse[${idx}][name]`, vend?.name)
          formData.append(
            `wareHouse[${idx}][retailGrossMargin]`,
            vend?.retailGrossMargin
          )
          formData.append(`wareHouse[${idx}][retailPrice]`, vend?.retailPrice)
          formData.append(`wareHouse[${idx}][stdCost]`, vend?.stdCost)
        })
      }

      const itemVendors = Array.isArray(data?.itemVendors)
        ? data.itemVendors
        : []

      if (itemVendors.length > 0) {
        itemVendors.forEach((vendor, idx) => {
          formData.append(
            `itemVendors[${idx}][vendor_name]`,
            vendor?.vendor_name
          )
          formData.append(`itemVendors[${idx}][item]`, vendor?.item)
          formData.append(`itemVendors[${idx}][cost]`, vendor?.cost)
          formData.append(`itemVendors[${idx}][uom]`, vendor?.uom)
          formData.append(
            `itemVendors[${idx}][cost_per_each]`,
            vendor?.cost_per_each
          )
          formData.append(`itemVendors[${idx}][comment]`, vendor?.comment)
          formData.append(`itemVendors[${idx}][is_stocked]`, vendor?.is_stocked)
        })
      }

      const response = await InventoryServices.AddItems(formData)

      if (response?.status === 200) {
        router.push('/dashboard/inventory/items/list')
        successMessage({ description: response?.data?.message })
      }
    } catch (error) {
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  const handleBack = () => {
    router.push('/dashboard/inventory/items/list')
  }
  return (
    <>
      <div>
        <div className='mb-3 flex items-center justify-between'>
          <LayoutHeader pageTitle='Add Items' />
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/inventory/items/list`)}
          >
            All Items
          </Button>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitItem)}>
            <InventoryItemsTabs
              form={form}
              setImageUpload={setImageUpload}
              updateImage={[]}
            />
            <div className='mt-4 flex justify-end gap-4'>
              <Button
                onClick={handleBack}
                type='button'
                className='site-button bg-white'
              >
                Back
              </Button>
              <Button type='submit' className='site-button'>
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default InventoryItemsAdd
