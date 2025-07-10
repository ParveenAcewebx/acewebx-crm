import FormInputField from '@/components/share/form/FormInputField'
import { useFieldArray } from 'react-hook-form'

export default function BudgetSitePlan({ control, watch, setValue }) {
  const { fields } = useFieldArray({
    name: 'sitePlan2',
    control
  })

  return (
    <div>
      <div className='custom-scroll-bar overflow-auto pb-4'>
        <div style={{ minWidth: '800px' }}>
          <table className='rounded-6 w-full border text-xs'>
            <thead>
              <tr className='!gap-4'>
                <th
                  className='border border-gray-300 bg-yellow-400 p-2 text-center'
                  colSpan={4}
                >
                  SITE PLAN SUMMARY
                </th>
              </tr>
              <tr className='whitespace-nowrap bg-blue-50 text-center text-xs font-semibold'>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  BLDG TYPES
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  QTY
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  QA
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  QR
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className='text-center'>
                  {Object.keys(field).map(key => {
                    const isEditable = [
                      'site_qty',
                      'sov_qa',
                      'sov_qr'
                    ].includes(key)
                    if (key === 'id') return null
                    if (key === 'site_index') return null
                    if (key === 'bldg_id') return null
                    return (
                      <td key={key} className='site-tab'>
                        {isEditable ? (
                          <div className='flex gap-1'>
                            <FormInputField
                              name={`sitePlan2.${index}.${key}`}
                              className='h-8 w-40 px-1 text-xs'
                              inputMode='decimal'
                              control={control}
                              readOnly={true}
                            />
                          </div>
                        ) : (
                          <div className='flex gap-1'>
                            <FormInputField
                              name={`sitePlan2.${index}.${key}`}
                              className='h-8 w-40 px-1 text-xs'
                              inputMode='decimal'
                              control={control}
                              readOnly={true}
                            />
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
