import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Trash } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'

const WebTab = ({ form }) => {
  const { control } = form
  const {
    fields: webField,
    append: webAppend,
    remove: webRemove
  } = useFieldArray({
    control,
    name: 'itemWebs'
  })
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='website_id'
          placeholder='Enter Website Url'
          label='Website Url'
        />
        <FormInputField
          form={form}
          name='freeform'
          placeholder='Enter Free Form'
          label='Freeform'
        />
        <FormInputField
          form={form}
          name='meta'
          placeholder='Enter Meta'
          label='Meta'
        />
        <FormInputField
          form={form}
          name='title_tag'
          placeholder='Enter Title Tag'
          label='Title Tag'
        />
        <FormInputField
          form={form}
          name='meta_description'
          placeholder='Enter Meta Description'
          label='Meta Description'
        />
      </div>

      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Category
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Description
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Sequence
            </TableHead>

            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {webField.map((item, index) => (
            <>
              <TableRow key={item.id} className='hover:bg-gray-100'>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`itemWebs.${index}.category`}
                    placeholder='Category'
                  />
                </TableCell>

                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`itemWebs.${index}.description`}
                    placeholder='Description'
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <FormInputField
                    form={form}
                    name={`itemWebs.${index}.sequence`}
                    placeholder='Sequence'
                  />
                </TableCell>
                <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                  <Trash
                    className='h-4 w-4 text-red-500'
                    onClick={() => webRemove(index)}
                  />
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <Button type='button' onClick={() => webAppend()} className='mt-2'>
        Add More
      </Button>
    </>
  )
}

export default WebTab
