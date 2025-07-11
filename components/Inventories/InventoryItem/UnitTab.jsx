import FormInputField from '@/components/share/form/FormInputField'
import SelectFilter from '@/components/share/form/SelectFilter'
import { Button } from '@/components/ui/button'
import { CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import api from '@/lib/api'
import ItemSettingsServices from '@/services/Settings/ItemSettings'
import { ChevronDown, ChevronRight, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'

const UnitTab = ({ form }) => {
  const [units, setUnits] = useState([])
  const { control, setValue, getValues } = form
  const {
    fields: unitsFields,
    append: unitsAppend,
    remove: unitsRemove
  } = useFieldArray({
    control,
    name: 'itemUnits'
  })
  const [expandedRows, setExpandedRows] = useState({})
  const toggleRow = index => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }))
  }

  useEffect(() => {
    const fetchUnits = async () => {
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
    fetchUnits()
  }, [])
  const watchedItemDimension = useWatch({
    control,
    name: `itemUnits`
  })?.map((item, Index) => ({ id: unitsFields[Index]?.id, ...item }))
  useEffect(() => {
    watchedItemDimension?.forEach((item, index) => {
      if (item) {
        const { length, width, height } = item
        const volume = width * length * height
        if (volume) {
          if (getValues(`itemUnits.${index}.volume`) !== volume) {
            setValue(`itemUnits.${index}.volume`, volume, {
              shouldValidate: true
            })
          }
        }
      }
    })
  }, [watchedItemDimension])

  return (
    <>
      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              U/M
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              QTY
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              PER
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              UPC
            </TableHead>

            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unitsFields.map((item, index) => (
            <>
              <TableRow key={item.id} className='hover:bg-gray-100'>
                <TableCell className='w-2/12 border border-gray-200 px-4 py-3'>
                  <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2'>
                    <div className='text-sm font-medium text-gray-700'>
                      U/M {index + 1}
                    </div>
                    <SelectFilter
                      form={form}
                      name={`itemUnits.${index}.unit_id`}
                      placeholder='Select U/M'
                      options={units}
                    />
                    <div className='font-medium text-gray-500'>=</div>
                  </div>
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    label=''
                    name={`itemUnits.${index}.qty`}
                    placeholder='QTY'
                    type='number'
                  />
                </TableCell>

                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <SelectFilter
                    form={form}
                    name={`itemUnits.${index}.per_unit_id`}
                    placeholder='Select Per'
                    options={units}
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`itemUnits.${index}.upc`}
                    placeholder='UPC'
                    type='number'
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <div className='grid grid-cols-2'>
                    <Button
                      type='button'
                      onClick={() => toggleRow(index)}
                      variant='ghost'
                      className='text-dark-color h-6 w-6 rounded-full !shadow-none'
                    >
                      {expandedRows[index] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </Button>

                    <Button
                      type='button'
                      variant='ghost'
                      className='h-6 w-6'
                      onClick={() => unitsRemove(index)}
                    >
                      <Trash className='h-4 w-4 text-red-500' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              {expandedRows[index] && (
                <>
                  <CardHeader>Dimensions</CardHeader>{' '}
                  <TableRow className='bg-gray-100'>
                    <TableCell colSpan='9'>
                      <div className='grid grid-cols-5 items-center gap-4'>
                        <FormInputField
                          form={form}
                          name={`itemUnits.${index}.weight`}
                          label='Weight'
                          placeholder='Enter Weight'
                          type='number'
                        />
                        <FormInputField
                          form={form}
                          name={`itemUnits.${index}.height`}
                          label='Height'
                          placeholder='Enter Height'
                          type='number'
                        />
                        <FormInputField
                          form={form}
                          name={`itemUnits.${index}.length`}
                          label='Length'
                          placeholder='Enter Length'
                          type='number'
                        />
                        <FormInputField
                          form={form}
                          name={`itemUnits.${index}.width`}
                          label='Width'
                          placeholder='Enter Width'
                          type='number'
                        />
                        <FormInputField
                          form={form}
                          name={`itemUnits.${index}.volume`}
                          label='Volume'
                          placeholder='Enter Volume'
                          disable
                          type='number'
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </>
          ))}
        </TableBody>
      </Table>
      <Button type='button' onClick={() => unitsAppend()} className='mt-2'>
        Add More
      </Button>
    </>
  )
}

export default UnitTab
