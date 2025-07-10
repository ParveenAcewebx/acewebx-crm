'use client'
import { inventoyItemsDefaultValues } from '@/components/DefaultValues'
import InventoryItemsTabs from '@/components/Inventories/InventoryItem/InventoryItemsTabs'
import LayoutHeader from '@/components/layoutHeader'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import InventoryServices from '@/services/Inventory/Inventory'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const InventoryItemsEdit = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [vendorDel, setVendorDelete] = useState([])
  const [delWareHouse, setDelWareHouse] = useState([])
  const [updateImage, setUpdateImage] = useState([])
  const [imageUpload, setImageUpload] = useState(null)
  const id = searchParams.get('id')
  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await InventoryServices.GetItemsBYId(id)
        const itemData = response?.data
        console.log('itemData.item_vendors', itemData.item_vendors)
        // Transform and map backend structure to form structure
        const mappedData = {
          id: itemData.id,
          sku: itemData.sku || '',
          short_description: itemData.short_description || '',
          description: itemData.description || '',
          website_id: itemData.website_id || '',
          freeform: itemData.freeform || '',
          meta: itemData.meta || '',
          title_tag: itemData.title_tag || '',
          brand_id: String(itemData.brand_id) || '',
          meta_description: itemData.meta_description || '',

          itemVendors:
            itemData.item_vendors?.map(v => ({
              vendor_name: String(v.vendor_id) || '',
              item: v.item || '',
              cost: v.cost || '',
              uom: v.uom || '',
              cost_per_each: v.cost_per_each || '',
              comment: v.comment || '',
              is_stocked: v.is_stocked?.toString() || '0'
            })) || [],

          wareHouse:
            itemData.ware_house_items?.map(v => ({
              average: v.avg_cost || '',
              costPer: v.cost_per_unit || '',
              cost: v.cost_per_unit || '',
              lastCost: v.last_cost || '',
              cost_per_each: v.cost_per_unit || '',
              lastLand: v.last_landed_cost || '',
              listGrossMargin: v.list_price_margin || '',
              name: String(v.ware_house_id) || '',
              retailGrossMargin: v.retail_price_margin || '',
              retailPrice: v.retail_price || '',
              stdCost: v.std_cost || '',
              id: v?.id || ''
            })) || [],

          itemUnits:
            itemData.item_units?.map(u => ({
              unit_id: String(u.unit_id) || '',
              qty: u.qty || '',
              per_unit_id: String(u.per_unit_id) || '',
              upc: u.upc || '',
              height: u.height || '',
              weight: u.weight || '',
              length: u.length || '',
              width: u.width || ''
            })) || [],

          itemWebs:
            itemData.item_webs?.map(w => ({
              category: w.category || '',
              description: w.description || '',
              sequence: w.sequence || ''
            })) || [],

          itemTags: itemData.item_tags?.map(t => t.product_tag?.id) || [],
          itemCategories:
            itemData.item_categories?.map(c => c.product_category?.id) || [],
          itemImages: itemData.item_images || []
        }

        // setUpdateImage(itemData?.itemImages)
        // Set form values
        form.reset(mappedData)
      } catch (error) {
        console.error('Error fetching item data:', error)
      }
    }
    fetchDataById()
  }, [])

  const form = useForm({
    defaultValues: inventoyItemsDefaultValues
  })

  const onSubmitItem = async data => {
    try {
      const formData = new FormData()

      // Keep image logic as-is
      if (imageUpload && Array.isArray(imageUpload)) {
        imageUpload.forEach((file, index) => {
          formData.append(`itemImages[${index}]`, file)
        })
      }
      console.log('data?.imag', data?.image)
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
      console.log('data?.itemTags', data?.itemTags)
      formData.append('_method', 'PUT')
      formData.append('id', id)
      formData.append('deleteWareHouse', JSON.stringify(delWareHouse))
      // Properly append itemTags array
      if (Array.isArray(data?.itemTags)) {
        data?.itemTags?.forEach((tag, idx) => {
          formData.append(`itemTags[${idx}]`, tag)
        })
      }
      console.log('data?.itemCategories', data?.itemCategories)
      // Properly append itemCategories array
      if (Array.isArray(data?.itemCategories)) {
        data?.itemCategories?.forEach((cat, idx) => {
          formData.append(`itemCategories[${idx}]`, cat)
        })
      }

      console.log('data?.itemWeb', data?.itemWebs)
      // Properly append itemWeb (if it's an array of objects)
      if (Array.isArray(data?.itemWebs)) {
        data?.itemWebs?.forEach((web, idx) => {
          formData.append(`itemWebs[${idx}][category]`, web?.category)
          formData.append(`itemWebs[${idx}][description]`, web?.description)
          formData.append(`itemWebs[${idx}][sequence]`, web?.sequence)
        })
      }
      console.log('data?.itemUnits', data?.itemUnits)

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
      } else {
        //         formData.append(`itemVendors[0][vendor_name]`, 'Default Vendor');
        // formData.append(`itemVendors[0][item]`, 'N/A');
        // formData.append(`itemVendors[0][cost]`, '0');
        // formData.append(`itemVendors[0][uom]`, 'pcs');
        // formData.append(`itemVendors[0][cost_per_each]`, '0');
        // formData.append(`itemVendors[0][comment]`, '');
        // formData.append(`itemVendors[0][is_stocked]`, '0');
        console.log('work')
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

      const response = await InventoryServices.UpdateItemsById(id, formData)

      if (response?.status === 200) {
        router.push('/dashboard/inventory/items/list')
        successMessage({ description: response?.data?.message })
      }
    } catch (error) {
      // errorMessage({
      //   description:
      //     error?.response?.data?.message ||
      //     'Submission failed. Please try again.'
      // })
      console.log('errorsss', error)
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
              updateImage={updateImage}
              setVendorDelete={setVendorDelete}
              setDelWareHouse={setDelWareHouse}
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
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default InventoryItemsEdit
