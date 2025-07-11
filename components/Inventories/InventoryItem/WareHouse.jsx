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
import api from '@/lib/api'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'

const WareHouse = ({ form, setDelWareHouse }) => {
  const [itemName, setItem] = useState([])
  const { control, getValues, watch, setValue } = form
  const {
    fields: wareHouseField,
    append: wareHouseAppend,
    remove: wareHouseRemove
  } = useFieldArray({
    control,
    name: 'wareHouse'
  })
  useEffect(() => {
    const fetchVendors = async () => {
      const response = await api.get(`/where-houses?limit=100`)
      if (response.status === 200) {
        const modifyProjectData = response?.data?.data.map(item => {
          return {
            label: item.name,
            value: String(item.id)
          }
        })

        setItem(modifyProjectData)
      }
    }
    fetchVendors()
  }, [])
  const handleRemove = (index, id) => {
    if (id) {
      setDelWareHouse(prev => [...prev, id])
    }
    wareHouseRemove(index)
  }
  const wareHouseCalculation = useWatch({
    control,
    name: `wareHouse`
  })?.map((item, Index) => ({ id: wareHouseField[Index]?.id, ...item }))
  useEffect(() => {
    wareHouseCalculation?.forEach((item, index) => {
      if (item) {
        const costPerItem = Number(item?.costPer)
        const marginOnItem = Number(item?.margin)
        const retailPrice = Math.ceil(costPerItem / (1 - marginOnItem / 100))
        const currentValue = getValues(`wareHouse.${index}.retailPrice`)
        if (retailPrice && currentValue !== retailPrice) {
          setValue(`wareHouse.${index}.retailPrice`, retailPrice, {
            shouldValidate: true
          })
        }
        const t = getValues(`wareHouse.${index}.total`, currentValue)
        if (retailPrice && t !== retailPrice)
          setValue(`wareHouse.${index}.total`, retailPrice, {
            shouldValidate: true
          })
      }
    })
  }, [wareHouseCalculation])

  return (
    <>
      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Warehouse
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Retail Price
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              List Price Gross Margin
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Retail Price Gross Margin
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Cost Per
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Std Cost
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Average
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Last Cost
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Last Land
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Margin
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Total
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wareHouseField.map((item, index) => (
            <TableRow key={item.id} className='hover:bg-gray-100'>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <SelectFilter
                  form={form}
                  name={`wareHouse.${index}.name`}
                  placeholder='Select Warehouse'
                  options={itemName}
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.retailPrice`}
                  label=''
                  placeholder='Enter Retail Price'
                  type='number'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.listGrossMargin`}
                  label=''
                  placeholder='Enter List Price Gross Margin'
                  type='number'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.retailGrossMargin`}
                  label=''
                  placeholder='Enter Retail Price Gross Margin'
                  type='number'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.costPer`}
                  label=''
                  placeholder='Enter Cost Per'
                  type='number'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.stdCost`}
                  label=''
                  placeholder='Enter Std Cost'
                  type='number'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.average`}
                  label=''
                  placeholder='Enter Average'
                  type='number'
                />
              </TableCell>{' '}
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.lastCost`}
                  label=''
                  placeholder='Enter Last Cost'
                  type='number'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.lastLand`}
                  label=''
                  placeholder='Enter Last Land'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.margin`}
                  label=''
                  placeholder='Enter Margin'
                  type='number'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`wareHouse.${index}.total`}
                  label=''
                  placeholder='Enter Total'
                  type='number'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <div className='flex justify-stretch gap-1'>
                  <div className=''>
                    <Button
                      type='button'
                      variant='ghost'
                      className='h-6 w-6'
                      onClick={() =>
                        handleRemove(index, watch(`wareHouse.${index}.id`))
                      }
                    >
                      {' '}
                      <Trash className='h-4 w-4 cursor-pointer text-red-500' />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        type='button'
        onClick={() => wareHouseAppend({})}
        className='mt-2'
      >
        Add More
      </Button>
    </>
  )
}

export default WareHouse
