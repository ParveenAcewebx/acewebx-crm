import FormInputField from '@/components/share/form/FormInputField'
import { budgetHeader, costBldgKeys } from '../table/budgetTable'

export default function CostBldgChildTab({ fields, form }) {
  return (
    <div className='budget-tab custom-scroll-bar overflow-auto pb-4'>
      <div style={{ width: '800px' }}>
        <table className='min-w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-blue-100 text-center text-xs font-bold'>
              <th
                colSpan={16}
                className='border border-gray-300 bg-yellow-400 p-2'
              >
                COST/BLDG
              </th>
            </tr>
            <tr className='whitespace-nowrap bg-blue-50 text-center text-xs font-semibold'>
              <th rowSpan={2} className='border border-gray-300 p-2'>
                BLDG
              </th>
              {budgetHeader.map((header, i) => (
                <th key={i} className='border border-gray-300 p-2'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className='text-center'>
                <td className='border border-gray-300 p-1.5'>
                  <FormInputField
                    name={`budgets.${index}.site_name`}
                    className='h-6 !border-none px-1 text-[10px]'
                    inputMode='text'
                    control={form.control}
                    readOnly
                  />
                </td>
                {costBldgKeys?.map((key, i) => {
                  const isEditable = [
                    'site_name',
                    'misc',
                    'posts',
                    'sill_plate',
                    'tie_down',
                    'sw_misc',
                    'up_lift',
                    'roof',
                    'coridor',
                    'deck',
                    'stair_wells',
                    'beam',
                    'smu',
                    'stl',
                    'rtu',
                  ].includes(key)
                  return (
                    <td key={i} className='border border-gray-300 p-1'>
                      {!isEditable ? (
                        <div className='flex justify-center gap-1'>
                          <span>$</span>
                          <FormInputField
                            name={`budgets.${index}.${key}`}
                            className='h-6 !border-none px-1 text-xs bg-gray-100'
                            inputMode='decimal'
                            type='number'
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        <div className='flex justify-center gap-1'>
                          <span>$</span>
                          <input
                            value={form.getValues(`budgets.${index}.${key}`)}
                            name={`budgets.${index}.${key}`}
                            readOnly
                            className='h-6 w-20 !border-none bg-gray-100 px-1 text-xs'
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
  )
}
