'use client'

import FormDatePicker from '@/components/share/form/datePicker'
import FormInputField from '@/components/share/form/FormInputField'
import SelectFilter from '@/components/share/form/SelectFilter'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import MaterialQuotesService from '@/services/Leads/material'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'

const defaultRow = {
  itemNumber: '',
  dateWanted: '',
  salesOrder: '',
  customerId: '',
  shipToName: '',
  um: '',
  qtyOrdered: '',
  qtyBO: '',
  orderQtyLinked: ''
}

const OrdersTab = ({ form, setRemovedOrderTab }) => {
  const { control, setValue, getValues, watch } = form
  const [salesOrderData, setSalesOrderData] = useState([])
  console.log('salesOrderData', salesOrderData)
  const {
    fields: orderFields,
    append: orderAppend,
    remove: orderRemove
  } = useFieldArray({
    control,
    name: 'orderTab'
  })

  const materialItems = useWatch({
    control,
    name: 'orderTab'
  })
  useEffect(() => {
    if (orderFields?.length > 0) {
      const initialExpanded = {}
      orderFields.forEach((_, index) => {
        initialExpanded[index] = true
      })
    }
  }, [orderFields])

  useEffect(() => {
    const existingOrders = getValues('orderTab')
    if (!existingOrders || existingOrders.length === 0) {
      orderAppend(defaultRow)
    }
  }, [])

  //  useEffect  used to set up the data in the repeater field according to the selected item
  useEffect(() => {
    materialItems?.forEach((matItem, index) => {
      if (!matItem?.salesOrder) return

      const matchedItem = salesOrderData?.find(
        mi => mi?.id == matItem?.salesOrder
      )
      if (!matchedItem) return

      // Set Customer ID
      if (
        getValues(`orderTab.${index}.customerId`) !== matchedItem?.customers?.id
      ) {
        setValue(`orderTab.${index}.customerId`, matchedItem?.customers?.id)
      }

      // Set Ship To Name
      if (getValues(`orderTab.${index}.shipToName`) !== matchedItem?.ship_to) {
        setValue(`orderTab.${index}.shipToName`, matchedItem?.ship_to)
      }

      //  Set U/M
      // const uom = matchedItem?.lineTab?.materialItems?.[0]?.uom

      // if (uom && getValues(`orderTab.${index}.um`) !== uom) {
      //   setValue(`orderTab.${index}.um`, uom||"")
      // }
    })
  }, [materialItems, salesOrderData, getValues, setValue])

  // get sales order data
  useEffect(() => {
    const fetchSalesOrderData = async () => {
      try {
        const response = await MaterialQuotesService.getMaterialQuotesList()
        if (response.status === 200) {
          setSalesOrderData(response?.data?.data)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchSalesOrderData()
  }, [])

  // const onDelete = async () => {
  //   setDeleteOpenModal(false)
  // }

  // const deleteHandleModalClose = () => {
  //   setDeleteOpenModal(false)
  // }
  const handleRemove = (index, id) => {
    if (id) {
      setRemovedOrderTab(prev => [...prev, id])
    }
    orderRemove(index)
  }
  return (
    <>
      {/* <Card>
        <CardHeader className='flex p-4'></CardHeader>
      </Card> */}
      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead
              className='border border-gray-100 px-4 py-2 text-left'
              style={{ width: '1%' }}
            >
              Item Number
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Date Wanted
            </TableHead>
            <TableHead className='w-1/6 border border-gray-100 px-4 py-2 text-left'>
              Sales Order
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Customer Id
            </TableHead>
            <TableHead className='w-1/6 border border-gray-100 px-4 py-2 text-left'>
              Ship To Name
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              U/M
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Quantity Ordered
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Quantity B/O
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Order QTY Linked
            </TableHead>
            <TableHead
              className='w-1/12 border border-gray-100 px-4 py-2 text-left'
              style={{ width: '1%' }}
            >
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderFields.map((item, index) => (
            <TableRow key={item.id} className='hover:bg-gray-100'>
              <TableCell className='cursor-pointer border'>
                <FormInputField
                  form={form}
                  name={`orderTab.${index}.itemNumber`}
                  placeholder='Item Number'
                  type='number'
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <FormDatePicker
                  form={form}
                  name={`orderTab.${index}.dateWanted`}
                  placeholder='Select Date'
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <SelectFilter
                  form={form}
                  name={`orderTab.${index}.salesOrder`}
                  placeholder='Select'
                  options={
                    salesOrderData.length > 0
                      ? salesOrderData.map(data => ({
                          label: data?.customers?.name,
                          value: String(data?.id)
                        }))
                      : []
                  }
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`orderTab.${index}.customerId`}
                  placeholder='Customer Id'
                  disable
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`orderTab.${index}.shipToName`}
                  placeholder='Ship To Name '
                  disable
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`orderTab.${index}.um`}
                  placeholder=' U/M'
                  type='number'
                />
              </TableCell>

              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`orderTab.${index}.qtyOrdered`}
                  placeholder='QTY Ordered'
                  type='number'
                />
              </TableCell>

              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`orderTab.${index}.qtyBO`}
                  placeholder='QTY B/O'
                  type='number'
                />
              </TableCell>
              <TableCell className='border px-2 py-2'>
                <FormInputField
                  form={form}
                  type='number'
                  name={`orderTab.${index}.orderQtyLinked`}
                  placeholder='Order QTY Linked'
                />
              </TableCell>
              <TableCell className='flex !h-20 items-center justify-center px-2 py-2'>
                <Trash2
                  onClick={() =>
                    handleRemove(index, getValues(`orderTab.${index}.id`))
                  }
                  className='h-4 w-4 cursor-pointer text-red-600'
                />
              </TableCell>

              {/* <DialogBox
                onDelete={onDelete}
                description='Are you certain you want to proceed with this deletion?'
                deleteOpenModal={deleteOpenModal}
                deleteHandleModalClose={deleteHandleModalClose}
              /> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        type='button'
        onClick={() => orderAppend(defaultRow)}
        className='site-button-small mb-5 mt-2 text-white'
      >
        Add More
      </Button>
    </>
  )
}

export default OrdersTab
