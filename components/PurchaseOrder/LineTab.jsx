'use client'

import InventoryServices from '@/services/Inventory/Inventory'
import ItemSettingsServices from '@/services/Settings/ItemSettings'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import DialogBox from '../modal/DialogBox'
import FormInputField from '../share/form/FormInputField'
import SelectFilter from '../share/form/SelectFilter'
import { Button } from '../ui/button'
import { Card, CardHeader } from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import OtherFields from './OtherFields'

const defaultRow = {
  line: '',
  item: '',
  description: '',
  order: '',
  uom: '',
  unit_cost: '',
  ordered_ext: ''
}

const LineTab = ({ form, setRemovelinetab }) => {
  const { control, setValue, getValues, watch } = form
  const [materialItem, setMaterialItem] = useState([])
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [units, setUnits] = useState([])

  const {
    fields: materialFields,
    append: materialAppend,
    remove: materialRemove
  } = useFieldArray({
    control,
    name: 'lineTab'
  })

  const materialItems = useWatch({
    control,
    name: 'lineTab'
  })
  useEffect(() => {
    if (materialFields?.length > 0) {
      const initialExpanded = {}
      materialFields.forEach((_, index) => {
        initialExpanded[index] = true
      })
    }
  }, [materialFields])
  useEffect(() => {
    const existingOrders = getValues('lineTab')
    if (!existingOrders || existingOrders.length === 0) {
      materialAppend(defaultRow)
    }
  }, [])
  // get the selected vendor id to filter the item data
  const selectedVendor = watch('vendor_id')

  //  useEffect s used to set up the data in the repeater field according to the selected item
  useEffect(() => {
    materialItems?.forEach((matItem, index) => {
      if (!matItem?.item) return

      const matchedItem = materialItem?.find(mi => mi?.id == matItem?.item)
      if (!matchedItem) return
      // Strip <p> and </p> tags from the description
      const description =
        matchedItem?.description?.replace(/^<p>|<\/p>$/g, '') || ''

      if (getValues(`lineTab.${index}.description`) !== description) {
        setValue(`lineTab.${index}.description`, description)
      }
      // item is filter by the select item and what vendoer we have selected on the main header
      const vendorData = matchedItem?.itemVendors?.find(
        v => v?.vendor?.id == selectedVendor
      )
      if (vendorData) {
        if (!matItem?.uom && vendorData?.uom) {
          setValue(`lineTab.${index}.uom`, vendorData?.uom, {
            shouldValidate: true
          })
        }
        if (!matItem?.unit_cost && vendorData?.cost) {
          setValue(`lineTab.${index}.unit_cost`, vendorData?.cost, {
            shouldValidate: true
          })
        }
      }
      // Calculated the Order Ext by calculating the order and the unit cost field
      const qty = getValues(`lineTab.${index}.order`)
      const cost = getValues(`lineTab.${index}.unit_cost`)
      const total = Number(qty) * Number(cost)
      if (getValues(`lineTab.${index}.ordered_ext`) !== total) {
        setValue(`lineTab.${index}.ordered_ext`, total, {
          // shouldValidate: true
        })
      }
    })
  }, [materialItems])
  const fetchUnitsData = async () => {
    const response = await ItemSettingsServices.AllUnits()
    if (response.status === 200) {
      const modifyProjectData = response?.data?.data.map(item => {
        return {
          label: item.name,
          value: String(item.id)
        }
      })

      setUnits(modifyProjectData)
    }
  }
  const fetchAllData = async () => {
    try {
      const response = await InventoryServices.GetAllItems()

      if (response?.status === 200) {
        setMaterialItem(response?.data?.data)
      }
    } catch (error) {
      console.log('Fetch error', error)
    }
  }
  useEffect(() => {
    fetchUnitsData()
    fetchAllData()
  }, [])

  const onDelete = async () => {
    setDeleteOpenModal(false)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleRemove = (index, id) => {
    if (id) {
      setRemovelinetab(prev => [...prev, id])
    }
    materialRemove(index)
  }
  return (
    <>
      <Card>
        <CardHeader className='flex p-4'></CardHeader>
      </Card>

      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead
              className='border border-gray-100 px-4 py-2 text-left'
              style={{ width: '1%' }}
            >
              Line
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Item
            </TableHead>
            <TableHead className='w-1/4 border border-gray-100 px-4 py-2 text-left'>
              Description
            </TableHead>
            {['Ordered', 'U/M', 'Unit Cost', 'Ordered Ext'].map(
              (header, idx) => (
                <TableHead
                  key={idx}
                  className='w-1/12 border border-gray-100 px-4 py-2 text-left'
                >
                  {header}
                </TableHead>
              )
            )}
            <TableHead
              className='w-1/12 border border-gray-100 px-4 py-2 text-left'
              style={{ width: '1%' }}
            >
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {materialFields.map((item, index) => (
            <TableRow key={item.id} className='hover:bg-gray-100'>
              <TableCell className='cursor-pointer border'>
                <OtherFields index={index} form={form} />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <SelectFilter
                  form={form}
                  name={`lineTab.${index}.item`}
                  placeholder='Select Item'
                  options={
                    materialItem.length > 0
                      ? materialItem.map(data => ({
                          label: data.sku,
                          value: String(data.id)
                        }))
                      : []
                  }
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`lineTab.${index}.description`}
                  placeholder='Description'
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`lineTab.${index}.order`}
                  placeholder='Ordered '
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <SelectFilter
                  form={form}
                  name={`lineTab.${index}.uom`}
                  placeholder=' U/M'
                  options={units}
                />
              </TableCell>

              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`lineTab.${index}.unit_cost`}
                  placeholder='Unit Cost'
                />
              </TableCell>

              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`lineTab.${index}.ordered_ext`}
                  placeholder='Ordered Ext'
                  disable
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <Trash2
                  onClick={() =>
                    handleRemove(index, getValues(`lineTab.${index}.id`))
                  }
                  className='mr-2 h-4 w-4 cursor-pointer text-red-600'
                />
              </TableCell>

              <DialogBox
                onDelete={onDelete}
                description='Are you certain you want to proceed with this deletion?'
                deleteOpenModal={deleteOpenModal}
                deleteHandleModalClose={deleteHandleModalClose}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        type='button'
        onClick={() => materialAppend(defaultRow)}
        className='site-button-small mb-5 mt-2 text-white'
      >
        Add More
      </Button>
    </>
  )
}

export default LineTab
