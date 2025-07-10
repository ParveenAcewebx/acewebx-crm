import FormInputField from '@/components/share/form/FormInputField'

export default function AddersBldgTypeChild({ fields, form }) {
  return (
    <div className='custom-scroll-bar overflow-auto pb-4'>
      <div style={{ width: '800px' }}>
        <table className='rounded-6 border text-xs'>
          <thead className='bg-gray-100'>
            <tr>
              <th
                className='border border-gray-300 bg-green-400 p-2 text-center'
                colSpan={18}
              >
                ADDERS/BLDG TYPE
              </th>
            </tr>
            <tr>
              <th className='border border-gray-300 p-2'>NAME</th>
              <th className='border border-gray-300 p-2'>DESIGN</th>

              <th className='border border-gray-300 p-2'>ENGINEERING </th>

              <th className='border border-gray-300 p-2'>BUDGET</th>

              <th className='border border-gray-300 p-2'>SHIPPING</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className='text-center'>
                <td className='site-tab'>
                  <FormInputField
                    name={`budgets.${index}.site_name`}
                    className='h-8 px-1 text-[10px]'
                    inputMode='text'
                    control={form.control}
                    readOnly
                  />
                </td>
                {Object.keys(field).map(key => {
                  const isEditable = ['name', 'qty', 'gs_qft'].includes(key)

                  // Skip 'id' always
                  if (key === 'id') return null

                  // If field has a 'bid' key, skip rendering the 'bid' field
                  if ('bid' in field && key === 'bid') return null

                  const iskeys = [
                    'site_design_type',
                    'site_engineering_type',
                    'site_budget_type',
                    'site_shipping_type'
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
    </div>
  )
}
