'use client'

import { Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

export default function DayIndicator({ form, setRemovedDayIds }) {
  const { control, watch, getValues } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pipelineDelayIndicators'
  })

  const handleRemove = (index, id) => {
    if (id) {
      setRemovedDayIds(prev => [...prev, id])
    }
    remove(index)
  }

  return (
    <>
      <div className='!my-6 flex justify-between'>
        <h4 className='text-xl font-semibold text-gray-800'>Delay Indicator</h4>
      </div>

      <Table className='w-full border text-black'>
        <TableHeader>
          <TableRow className='bg-gray-200'>
            <TableHead className='text-left'>Color</TableHead>
            <TableHead className='text-left'>Day</TableHead>
            <TableHead className='text-left'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => {
            return (
              <>
                <TableRow className='hover:bg-gray-50'>
                  <TableCell className='relative py-2 pl-3'>
                    <div className='flex items-center gap-2 rounded border px-1 py-0'>
                      <FormInputField
                        form={form}
                        name={`pipelineDelayIndicators[${index}].color`}
                        type='color'
                        className='h-12 w-12 !rounded-xl border-none p-0'
                      />
                      <FormInputField
                        form={form}
                        name={`pipelineDelayIndicators[${index}].color`}
                        type='text'
                        className='w-full border-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0'
                        placeholder='#000000'
                        disable
                      />
                    </div>
                  </TableCell>
                  <TableCell className='py-2'>
                    <FormInputField
                      form={form}
                      name={`pipelineDelayIndicators[${index}].delayDays`}
                      type='number'
                      placeholder='Enter Delay Days'
                    />
                  </TableCell>
                  <TableCell className='relative grid grid-cols-2 gap-2 py-2 pl-8'>
                    <Button
                      type='button'
                      variant='ghost'
                      className='mt-3 h-6 w-6'
                      onClick={() =>
                        handleRemove(
                          index,
                          getValues(`pipelineDelayIndicators[${index}].id`)
                        )
                      }
                    >
                      <Trash2 className='h-4 w-4 text-red-500' />
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            )
          })}
        </TableBody>
      </Table>

      <Button
        type='button'
        className='site-button-small mt-4 text-white'
        onClick={() => append({ delayDays: '', color: '' })}
      >
        + Add More
      </Button>
    </>
  )
}
