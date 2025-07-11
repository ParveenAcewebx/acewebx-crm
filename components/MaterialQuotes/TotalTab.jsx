import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
const defaultRow = {
  item: '',
  cost: '',
  price: ''
}
const TotalTab = ({ form }) => {
  const [materialItem, setMaterialItem] = useState([])
  const { control } = form

  const {
    fields: additionalField,
    append: additionalAppend,
    remove: additionalRemove
  } = useFieldArray({
    control,
    name: 'totalTab.additionalItems'
  })
  // useEffect(() => {
  //   if (additionalField.length === 0) {
  //     additionalAppend(defaultRow)
  //   }
  // }, [additionalField, additionalAppend])

  useEffect(() => {
    const currentRows = form.getValues('totalTab.additionalItems')
    if (!currentRows || currentRows.length === 0) {
      additionalAppend(defaultRow)
    }
  }, []) // empty array: run only once on mount

  
  return (
    <>
    <Card>{/* Optional Header */}</Card>
  
    {/* Table */}
    <div className="overflow-x-auto mt-4">
      <Table className='w-full border-collapse border border-gray-100 text-black ml-0'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>Item</TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>Price</TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>Cost</TableHead>
            <TableHead className='w-[5%] border border-gray-100 px-4 py-2 text-left'></TableHead>
          </TableRow>
        </TableHeader>
  
        <TableBody>
          {additionalField.map((item, index) => (
            <TableRow key={item.id} className='hover:bg-gray-100'>
              <TableCell className='border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`totalTab.additionalItems.${index}.item`}
                  placeholder='Enter Item'
                  options={materialItem}
                />
              </TableCell>
              <TableCell className='border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`totalTab.additionalItems.${index}.price`}
                  placeholder='Price'
                />
              </TableCell>
              <TableCell className='border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`totalTab.additionalItems.${index}.cost`}
                  placeholder='Cost'
                />
              </TableCell>
              <TableCell className='border border-gray-300 px-2 py-2 text-center'>
                {index !== 0 && (
                  <Button
                    type='button'
                    variant='ghost'
                    className='h-6 w-6 p-0'
                    onClick={() => additionalRemove(index)}
                  >
                    <Trash className='h-4 w-4 text-red-500' />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  
    {/* Add Button */}
    <Button
      type='button'
      onClick={() => additionalAppend(defaultRow)}
      className='site-button-small mt-2 text-white mb-2'
    >
      Add More
    </Button>
  
    <Separator />
  
    {/* Inline Label/Input Fields */}
    <div className='mt-6 grid grid-cols-2 gap-4'>
      {[
        { name: 'orderGross', label: 'Order Gross' },
        { name: 'discountAmount', label: 'Discount Amount' },
        { name: 'totalMisc', label: 'Total Misc' },
        { name: 'total', label: 'Total' },
        { name: 'taxable', label: 'Taxable' },
        { name: 'taxAmount', label: 'Tax Amount' },
        { name: 'freight', label: 'Freight' },
      ].map((field) => (
        <div key={field.name} className='flex items-center gap-2'>
          <label htmlFor={field.name} className='w-40 font-medium text-sm text-gray-700'>
            {field.label}
          </label>
          <FormInputField
            name={`totalTab.${field.name}`}
            id={field.name}
            placeholder={`Enter ${field.label}`}
            type='number'
            className='flex-1 w-72'
          />
        </div>
      ))}
    </div>
  
    {/* Order GP */}
    <div className='mt-5 flex items-center gap-2'>
      <label htmlFor='orderGp' className='w-40 font-medium text-sm text-gray-700'>
        Order GP
      </label>
      <FormInputField
        name='totalTab.orderGp'
        id='orderGp'
        placeholder='Enter Order GP'
        type='number'
        className='flex-1 w-72'
      />
    </div>
  </>
  
  
  )
}

export default TotalTab
