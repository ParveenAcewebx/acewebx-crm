import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
export default function BudgetOptionPackagesTab({ form }) {
  const { control, setValue } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'optionPackages'
  })
  // Define the default row
  const defaultRow = {
    subject: '',
    description: '',
    amount: ''
  }
  // Append the default row only if no rows exist
  useEffect(() => {
    if (fields.length === 0) {
      append(defaultRow) // Append default row
      setValue('optionPackages', [defaultRow]) 
    }
    console.log('Form Values:', form.getValues()) // Debugging
  }, [append, fields.length, form, setValue])
  return (
    <div className='space-y-4 mt-10'>
      <div className='overflow-auto rounded border option-tab'>
        <table className='min-w-full'>
          <thead className='theme-bg-light-rgba border-b'>
            <tr>
              <th rowSpan={2} className='capitalize font-semibold text-sm py-2 px-1'></th>
              <th rowSpan={2} className='capitalize font-semibold text-sm py-2 px-1'>Subject</th>
              <th rowSpan={2} className='capitalize font-semibold text-sm py-2 px-1'>Description</th>
              <th rowSpan={2} className='capitalize font-semibold text-sm py-2 px-1'>amount</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className='text-center'>
                <td className='px-2 pt-3 pb-2'>
                  {index !== 0 && (
                    <Button
                      type='button'
                      variant='ghost'
                      className='h-6 w-6 p-0'
                      onClick={() => remove(index)} // Remove the row
                    >
                      <Trash2 className='h-4 w-4 text-red-500' />
                    </Button>
                  )}
                </td>
                {Object.keys(defaultRow).map(key => (
                  <td key={key} className='px-2 pt-3 pb-2'>
                    <FormInputField
                      name={`optionPackages.${index}.${key}`}
                      type={key == 'amount' ? 'number' : 'text'}
                      className='h-8 px-1 text-xs'
                      inputMode='decimal'
                      defaultValue={form.getValues(
                        `optionPackages.${index}.${key}`
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-3'>
        <Button
          type='button'
          onClick={() => append(defaultRow)} // Append a new row
          className='site-button'
        >
          Add More
        </Button>
      </div>
    </div>
  )
}