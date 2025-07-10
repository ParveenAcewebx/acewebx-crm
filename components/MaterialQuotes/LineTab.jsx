import { useDebounce } from '@/hooks/quote/useDebounce'
import api from '@/lib/api'
import InventoryServices from '@/services/Inventory/Inventory'
import { ChevronDown, ChevronUp, EllipsisVertical, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import DialogBox from '../modal/DialogBox'
import FormInputField from '../share/form/FormInputField'
import SelectFilter from '../share/form/SelectFilter'
import { Button } from '../ui/button'
import { Card, CardHeader } from '../ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
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
  description: '',
  qty: '',
  cost: '',
  margin: '',
  commission: '',
  price: '',
  total: '',
  notes: ''
}
const LineTab = ({ form }) => {
  const { control, setValue, getValues } = form
  const [materialItem, setMaterialItem] = useState([])
  const [page, setPage] = useState('')
  const [length, setLength] = useState('')
  const [expandedRows, setExpandedRows] = useState({})
  const toggleRow = index => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }))
  }
  const {
    fields: materialFields,
    append: materialAppend,
    remove: materialRemove
  } = useFieldArray({
    control,
    name: 'materialItems'
  })

  // 2. Then useWatch for real-time form values
  const materialItems = useWatch({
    control,
    name: 'materialItems'
  })

  // 3. Memoize selectedValues from materialItems and materialFields
  const selectedValues = useMemo(() => {
    return (
      materialItems?.map((item, index) => ({
        id: materialFields[index]?.id,
        ...item
      })) || []
    )
  }, [JSON.stringify(materialItems), JSON.stringify(materialFields)])

  // 4. Debounce the selected values
  const debouncedSelectedValues = useDebounce(selectedValues, 500)

  // 5. useEffect to fetch data
  useEffect(() => {
    const fetchMaterialData = async () => {
      for (let i = 0; i < debouncedSelectedValues.length; i++) {
        const itemTitle = debouncedSelectedValues[i]?.item
        const margin = Number(debouncedSelectedValues[i]?.margin / 100)
        const price = Number(
          debouncedSelectedValues[i]?.cost / (1 - margin)
        ).toFixed(2)
        if (price) {
          setValue(`materialItems.${i}.price`, price)
        }
        const commission = Number(debouncedSelectedValues[i]?.commission / 100)
        const commissionAmount = Number(price * commission)
        const total = Number(
          (
            debouncedSelectedValues[i]?.qty *
              debouncedSelectedValues[i]?.price +
            commissionAmount
          ).toFixed(2)
        )

        if (!itemTitle) continue

        try {
          const response = await api.get(
            `materials?limit=100&take_all=false&title=${itemTitle}`
          )

          if (response?.status === 200) {
            const material = response.data?.data?.[0]
            console.log('materialmaterial', response)
            const currentQty = getValues(`materialItems.${i}.qty`)
            const currentCost = getValues(`materialItems.${i}.cost`)
            const currentDescription = getValues(
              `materialItems.${i}.description`
            )

            if (!currentQty) {
              setValue(`materialItems.${i}.qty`, material.qty)
            }
            if (!currentCost) {
              setValue(`materialItems.${i}.cost`, material.cost)
            }
            if (!currentDescription) {
              setValue(`materialItems.${i}.description`, material.description)
            }

            if (!total) {
              setValue(`materialItems.${i}.total`, material.total)
            } else {
              setValue(`materialItems.${i}.total`, total)
            }
          }
        } catch (error) {
          console.error('Error fetching material data', error)
        }
      }
    }

    fetchMaterialData()
  }, [debouncedSelectedValues])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [tagRes] = await Promise.all([InventoryServices.GetAllItems()])

        if (tagRes.status === 200) {
          const modifyProjectData = tagRes?.data?.data.map(item => {
            return {
              label: item.sku,
              value: item?.item
            }
          })
          console.log('modifyProjectData', modifyProjectData)

          setMaterialItem(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  const materialTotalSum = useMemo(() => {
    return (
      materialItems?.reduce((acc, curr) => {
        const total = parseFloat(curr?.total || 0)
        return acc + (isNaN(total) ? 0 : total)
      }, 0) || 0
    )
  }, [materialItems])
  setValue('material_total', Number(materialTotalSum.toFixed(2)))

  // delete -----------
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)

  const onDelete = async () => {
    try {
      setDeleteOpenModal(false)
    } catch (error) {}
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  return (
    <>
      <Card>
        <CardHeader className='flex p-4'>
          {/* <span className='font-semibold'>Material Quote</span> */}
        </CardHeader>
      </Card>
      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            {[
              'Item',
              'Description',
              'Qty',
              'Uom',
              'Std Cost',
              'Margin',
              'List Price',
              'price',
              'Total',
              'Action'
            ].map((header, idx) => (
              <TableHead
                key={idx}
                className='w-1/12 border border-gray-100 px-4 py-2 text-left'
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {materialFields.map((item, index) => (
            <>
              <TableRow key={item.id} className='hover:bg-gray-100'>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <SelectFilter
                    form={form}
                    name={`materialItems.${index}.item`}
                    placeholder='Select Item'
                    options={materialItem}
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`materialItems.${index}.description`}
                    placeholder='Description'
                    disable
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`materialItems.${index}.qty`}
                    placeholder='Qty'
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`materialItems.${index}.uom`}
                    placeholder='Uom'
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`materialItems.${index}.StdCost`}
                    placeholder='StdCost'
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`materialItems.${index}.margin`}
                    placeholder='Margin'
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`materialItems.${index}.ListPrice`}
                    placeholder='List Price'
                    disable
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`materialItems.${index}.price`}
                    placeholder='Price'
                    disable
                  />
                </TableCell>

                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`materialItems.${index}.total`}
                    placeholder='Total'
                    disable
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <div className='flex justify-stretch gap-1'>
                    {' '}
                    <div>
                      {' '}
                      <Button
                        type='button'
                        onClick={() => toggleRow(index)}
                        className='text-dark-color h-10 w-10 rounded-full !shadow-none'
                      >
                        {expandedRows[index] ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='grid grid-cols-3'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <EllipsisVertical className='h-5 w-5' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                          onClick={() => materialRemove(index)}
                          className='cursor-pointer text-red-600'
                        >
                          <Trash2 className='mr-2 h-4 w-4' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>

              {expandedRows[index] && (
                <TableRow className='bg-gray-100'>
                  <TableCell colSpan={13}>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <FormInputField
                        form={form}
                        name={`materialItems.${index}.cost`}
                        placeholder='Cost'
                        disable
                      />
                      <FormInputField
                        form={form}
                        name={`materialItems.${index}.commission`}
                        placeholder='Commission'
                      />

                      <FormInputField
                        form={form}
                        name={`materialItems.${index}.notes`}
                        placeholder='Notes'
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              <DialogBox
                onDelete={onDelete}
                description='Are you certain you want to proceed with this deletion?'
                deleteOpenModal={deleteOpenModal}
                deleteHandleModalClose={deleteHandleModalClose}
              />
            </>
          ))}
          <TableRow className='bg-gray-100 font-semibold'>
            <TableCell colSpan={8} className='pr-4 text-right'>
              Total
            </TableCell>
            <TableCell className='pl-4'>
              ${materialTotalSum.toFixed(2)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
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
