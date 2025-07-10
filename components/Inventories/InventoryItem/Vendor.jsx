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
import ItemSettingsServices from '@/services/Settings/ItemSettings'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'

const Vendor = ({ form, setVendorDelete }) => {
  const [vendor, setvendors] = useState([])
  const [units,setUnits]= useState([])
  const { control } = form
  const {
    fields: vendorField,
    append: vendorAppend,
    remove: vendorRemove
  } = useFieldArray({
    control,
    name: 'itemVendors'
  })
  useEffect(() => {
    const fetchVendors = async () => {
      const response = await api.get(`/vendors?limit=100`)
      if (response.status === 200) {
        const modifyProjectData = response?.data?.data.map(item => {
          return {
            label: item.name,
            value: String(item.id)
          }
        })

        setvendors(modifyProjectData)
      }
    }
    fetchVendors()
  }, [])
  const handleRemove = (index, id) => {
    if (id) {
      setVendorDelete(prev => [...prev, id])
    }
    vendorRemove(index)
  }
  const fetchUnitsData = async () => {
    const response = await ItemSettingsServices.AllUnits()
    if (response.status === 200) {
      const modifyProjectData = response?.data?.data.map(item => {
        return {
          label: item?.name,
          value: String(item?.id)
        }
      })

      setUnits(modifyProjectData)
    }
  }
  useEffect(() => {
    fetchUnitsData()
  }, [])
  return (
    <>
      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Vendor
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Vendor Item
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Vendor Cost
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Vendor UOM
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Cost Per UOM
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Comments
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendorField.map((item, index) => (
            <TableRow key={item.id} className='hover:bg-gray-100'>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <SelectFilter
                  form={form}
                  name={`itemVendors.${index}.vendor_name`}
                  placeholder='Select Vendor '
                  options={vendor}
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`itemVendors.${index}.item`}
                  placeholder='Enter Vendor Item'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`itemVendors.${index}.cost`}
                  placeholder='Enter Vendor Cost'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <SelectFilter
                  form={form}
                  name={`itemVendors.${index}.uom`}
                  placeholder=' UOM'
                  options={units}
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`itemVendors.${index}.cost_per_each`}
                  placeholder='Enter Cost Per UOM'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`itemVendors.${index}.comment`}
                  placeholder='Enter Comments'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <div className='flex justify-stretch gap-1'>
                  <Button
                    type='button'
                    variant='ghost'
                    className='h-6 w-6'
                    onClick={() =>
                      handleRemove(
                        index,
                        form.getValues(`itemVendors[${index}].id`)
                      )
                    }
                  >
                    <Trash className='h-4 w-4 cursor-pointer text-red-500' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button type='button' onClick={() => vendorAppend({})} className='mt-2'>
        Add More
      </Button>
    </>
  )
}

export default Vendor
