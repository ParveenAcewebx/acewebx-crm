import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function GeneralChildTab({
  fields,
  form,
  deleteRowHandler,
  handleAppend
}) {
  console.log("siteFieldssiteFieldssiteFields",fields)
  return (
    <div className='custom-scroll-bar overflow-auto pb-4'>
      <div style={{ width: '800px' }}>
        <table className='rounded-6 border text-xs'>
          <thead className='bg-gray-100'>
            <tr>
              <th
                className='border border-gray-300 bg-blue-300 p-2 text-center'
                colSpan={13}
              >
                GENERAL DATA
              </th>
            </tr>
            <tr>
              <th className='border border-gray-300 p-2'></th>
              <th className='border border-gray-300 p-2'>Name</th>
              <th className='border border-gray-300 p-2'>QTY</th>
              <th className='border border-gray-300 p-2'>GSQFT</th>
              <th className='border border-gray-300 p-2'>TSQFT </th>
              <th className='border border-gray-300 p-2'>CSQFT</th>
              <th className='border border-gray-300 p-2'>PSQFT</th>
              <th className='border border-gray-300 p-2'>COST</th>
              <th className='border border-gray-300 p-2'>CTOTAL</th>

              <th className='border border-gray-300 p-2'>C.SW</th>
              <th className='border border-gray-300 p-2'>C.UP</th>
              <th className='border border-gray-300 p-2'>C.SP</th>
              <th className='border border-gray-300 p-2'>C.MC</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className='text-center'>
                <td className='px-2 pb-2 pt-3'>
                  <Button
                    type='button'
                    variant='ghost'
                    className='h-6 w-6 p-0'
                    onClick={() => deleteRowHandler(index)}
                  >
                    <Trash2 className='h-4 w-4 text-red-500' />
                  </Button>
                </td>

                {Object.keys(field).map(key => {
                  const isEditable = ['name', 'qty', 'gs_qft'].includes(key)

                  // Skip 'id' always
                  if (key === 'id') return null

                  // If field has a 'bid' key, skip rendering the 'bid' field
                  if ('bid' in field && key === 'bid') return null

                  const iskeys = [
                    'name',
                    'qty',
                    'gs_qft',
                    'ts_qft',
                    'cs_qft',
                    'ps_qft',
                    'cost',
                    'c_total',
                    'c_sw',
                    'c_up',
                    'c_sp',
                    'c_mc'
                  ].includes(key)

                  if (!iskeys) return null

                  return (
                    <td key={key} className='site-tab'>
                      {isEditable ? (
                        <FormInputField
                          name={`sites.${index}.${key}`}
                          className='h-8 w-20 px-1 text-xs'
                          inputMode='decimal'
                          control={form.control}
                          type={key === 'name' ? 'text' : 'number'}
                        />
                      ) : (
                        <div className='flex justify-center gap-1'>
                          <span>$</span>
                          <input
                            name={`sites.${index}.${key}`}
                            value={form.getValues(`sites.${index}.${key}`)}
                            readOnly
                            className='h-8 w-20 border border-gray-300 bg-gray-100 px-1 text-xs'
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

      <div className='mt-3'>
        <Button type='button' onClick={handleAppend} className='site-button'>
          Add More
        </Button>
      </div>
    </div>
  )
}
