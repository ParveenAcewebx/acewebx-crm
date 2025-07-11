import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'

export default function BudgetveOptionsTab({ form }) {
  const { control, setValue } = form
  const {
    fields: veFields,
    append: appendVE,
    remove: removeVE
  } = useFieldArray({
    control,
    name: 'veOptions'
  })

  // Define the default row
  const defaultRow = {
    groups: '',
    subject: '',
    description: '',
    amount: ''
  }

  return (
    <div className='space-y-4'>
      <div className='option-tab overflow-auto rounded border'>
        <table className='min-w-full'>
          <thead className='theme-bg-light-rgba border-b'>
            <tr>
              <th
                rowSpan={2}
                className='border-r px-1 py-2 text-sm font-semibold capitalize'
              ></th>
              <th
                rowSpan={2}
                className='border-r px-1 py-2 text-sm font-semibold capitalize'
              >
                Groups
              </th>
              <th
                rowSpan={2}
                className='border-r px-1 py-2 text-sm font-semibold capitalize'
              >
                Subject
              </th>
              <th
                rowSpan={2}
                className='border-r px-1 py-2 text-sm font-semibold capitalize'
              >
                Description
              </th>
              <th
                rowSpan={2}
                className='px-1 py-2 text-sm font-semibold capitalize'
              >
                amount
              </th>
            </tr>
          </thead>
          <tbody>
            {veFields.map((field, index) => (
              <tr key={field.id} className='text-center'>
                <td className='min-w-9 px-2 pb-2 pt-3'>
                  {index !== 0 && (
                    <Button
                      type='button'
                      variant='ghost'
                      className='h-6 w-6 p-0'
                      onClick={() => removeVE(index)}
                    >
                      <Trash2 className='h-4 w-4 text-red-500' />
                    </Button>
                  )}
                </td>
                {Object.keys(defaultRow).map(key => (
                  <td key={key} className='px-2 pb-2 pt-3'>
                    <FormInputField
                      readOnly={true}
                      name={`veOptions.${index}.${key}`}
                      type={key == 'amount' ? 'number' : 'text'}
                      className='h-8 px-1 text-[12px]'
                      inputMode='decimal'
                      defaultValue={form.getValues(`veOptions.${index}.${key}`)}
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
          onClick={() => appendVE(defaultRow)}
          className='site-button'
        >
          Add More
        </Button>
      </div>
    </div>
  )
}
