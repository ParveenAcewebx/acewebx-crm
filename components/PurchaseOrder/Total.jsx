'use client'
import { Trash } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { Button } from '../ui/button'

const Total = ({ form }) => {
  const { control } = form

  const orderGross = useWatch({ control, name: 'totalTab.orderGross' }) || 0
  const receivedGross =
    useWatch({ control, name: 'totalTab.receivedGross' }) || 0
  const invoiceGross = useWatch({ control, name: 'totalTab.invoiceGross' }) || 0
  const openGross = useWatch({ control, name: 'totalTab.openGross' }) || 0
  const field4Values =
    useWatch({
      control,
      name: 'totalTab.totalAdditionalFields'
    })?.map(row => parseFloat(row.field4) || 0) || []

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'totalTab.totalAdditionalFields'
  })

  // Calculate sum
  useEffect(() => {
    const field4Total = field4Values.reduce((acc, curr) => acc + curr, 0)

    const sum =
      parseFloat(orderGross) +
      parseFloat(receivedGross) +
      parseFloat(invoiceGross) +
      parseFloat(openGross) +
      parseFloat(field4Total)

    const roundedSum = isNaN(sum) ? 0 : parseFloat(sum.toFixed(4))
    form.setValue('totalTab.pODollarTotal', roundedSum)
  }, [orderGross, receivedGross, invoiceGross, openGross, field4Values, form])

  return (
    <>
      <div className='text-sm'>
        <div className='mt-5'>
          <label className='mb-2 block text-sm font-medium'>
            Total Additional Fields:
          </label>

          <div className='w-10/12'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='mb-3 flex w-full items-center gap-4'
              >
                <div className='w-[10%]'>
                  <FormInputField
                    control={control}
                    name={`totalTab.totalAdditionalFields.${index}.field1`}
                    type='number'
                    // className='w-full'
                  />
                </div>

                <div className='flex w-[80%] items-center gap-3'>
                  <div className='w-[40%]'>
                    <FormInputField
                      control={control}
                      name={`totalTab.totalAdditionalFields.${index}.field2`}
                      type='number'
                      // className='w-full'
                    />
                  </div>

                  <div className='relative w-[18%]'>
                    <FormInputField
                      control={control}
                      name={`totalTab.totalAdditionalFields.${index}.field3`}
                      type='number'
                      step='0.01'
                      className='pr-8'
                      placeholder='0.00'
                    />
                    <span className='absolute right-2 top-1/2 -translate-y-1/2 transform text-sm text-gray-500'>
                      $
                    </span>
                  </div>

                  <div className='w-[32%]'>
                    <FormInputField
                      control={control}
                      name={`totalTab.totalAdditionalFields.${index}.field4`}
                      type='number'
                      className='w-full'
                    />
                  </div>

                  <Button
                    type='button'
                    variant='ghost'
                    className='h-6 w-6'
                    onClick={() => remove(index)}
                  >
                    <Trash className='h-4 w-4 text-red-500' />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button
            type='button'
            className='site-button mt-4'
            onClick={() =>
              append({ field1: '', field2: '', field3: '', field4: '' })
            }
          >
            + Add More
          </Button>
        </div>
      </div>
      <div className='w-10/12'>
        <div className='grid grid-cols-2 gap-10 text-sm'>
          <div className='mt-6 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <label className='w-24'>Item Add On’s:</label>
              <FormInputField
                control={control}
                name='totalTab.itemAddOns'
                type='number'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-24'>Landed Cost:</label>
              <FormInputField
                control={control}
                name='totalTab.landedCost'
                type='number'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-24'>Total List:</label>
              <FormInputField
                control={control}
                name='totalTab.totalList'
                type='number'
              />
            </div>
          </div>
          <div className='mt-5 flex flex-col gap-3'>
            {[
              { name: 'orderGross', label: 'Order Gross' },
              { name: 'receivedGross', label: 'Received Gross' },
              { name: 'invoiceGross', label: 'Invoiced Gross' },
              { name: 'openGross', label: 'Open Gross' }
            ].map(field => (
              <div key={field.name} className='flex items-center gap-2'>
                <label className='w-28'>{field.label}:</label>
                <FormInputField
                  control={control}
                  name={`totalTab.${field.name}`}
                  type='number'
                />
              </div>
            ))}

            <div className='mt-2 flex items-center gap-2'>
              <label className='w-28'>P.O. $ Total:</label>
              <FormInputField
                control={control}
                name='totalTab.pODollarTotal'
                type='number'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4 text-sm'>
        {/* Column 5: Ordered Totals */}
        <div className='mt-6 flex flex-col gap-2'>
          <label>Ordered</label>
          {[
            { name: 'orderedTotalPieces', label: 'Total Pieces' },
            { name: 'orderedTotalWeight', label: 'Total Weight' },
            { name: 'orderedTotalCubes', label: 'Total Cubes' }
          ].map(field => (
            <div key={field.name} className='flex items-center gap-2'>
              <label className='w-24'>{field.label}:</label>
              <FormInputField
                control={control}
                name={`totalTab.${field.name}`}
                type='number'
              />
            </div>
          ))}
        </div>

        {/* Column 6: Received Totals */}
        <div className='mt-6 flex flex-col gap-2'>
          <label>Received</label>
          {[
            { name: 'receivedTotalPieces', label: 'Total Pieces' },
            { name: 'receivedTotalWeight', label: 'Total Weight' },
            { name: 'receivedTotalCubes', label: 'Total Cubes' }
          ].map(field => (
            <div key={field.name} className='flex items-center gap-2'>
              <label className='w-24'>{field.label}:</label>
              <FormInputField
                control={control}
                name={`totalTab.${field.name}`}
                type='number'
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Total
