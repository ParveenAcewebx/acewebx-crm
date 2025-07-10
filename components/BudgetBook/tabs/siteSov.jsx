import FormInputField from '@/components/share/form/FormInputField'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import BudgetSitePlan from './sitePlan'

export default function BudgetSov({ form }) {
  const { control, watch, setValue, getValues } = form
  const sites = watch('sites') // Watching your 'sites' input
  const { fields } = useFieldArray({
    name: 'sitePlan',
    control
  })
  useEffect(() => {
    if (!sites || !Array.isArray(sites)) return

    const currentValues = getValues('sitePlan') || []
    const newSitePlan = []
    let counter = 1

    sites?.forEach((site, siteIndex) => {
      console.log('siteIndex', siteIndex)

      const qty = parseInt(site.qty)
      const totalQty = isNaN(qty) || qty <= 0 ? 1 : qty

      for (let i = 0; i < totalQty; i++) {
        const existing = currentValues[newSitePlan.length] || {}
        newSitePlan.push({
          site_index: siteIndex,
          bldg_id: existing.bldg_id ?? counter, // Preserve existing or set default
          sitePlan_name: existing.sitePlan_name ?? '',
          sov_sp: existing.sov_sp ?? '0.00',
          sov_td: existing.sov_td ?? '0.00',
          sov_up: existing.sov_up ?? '0.00',
          sov_mc: existing.sov_mc ?? '0.00',
          sov_total: existing.sov_total ?? '0.0000'
        })
        counter++
      }
    })
    setValue('sitePlan', newSitePlan)
  }, [sites, getValues, setValue])

  return (
    <div>
      <div className='custom-scroll-bar overflow-auto pb-4'>
        <div style={{ minWidth: '800px' }}>
          <table className='rounded-6 w-full border text-xs'>
            <thead>
              <tr className='!gap-4'>
                <th
                  className='border border-gray-300 bg-blue-300 p-2 text-center'
                  colSpan={9}
                >
                  SCHEDULE OF VALUES
                </th>
              </tr>

              <tr className='whitespace-nowrap bg-blue-50 text-center text-xs font-semibold'>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  ORDER NO
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  BLDG ID
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  BLDG TYPES
                </th>

                <th rowSpan={2} className='border border-gray-300 p-2'>
                  SP
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  TD
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  UP
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  MC
                </th>
                <th rowSpan={2} className='border border-gray-300 p-2'>
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className='text-center'>
                  <td className='site-tab'>
                    <FormInputField
                      name={`sitePlan.${index}.order_no`}
                      className='h-8 w-40 px-1 text-xs'
                      control={form.control}
                      type='number'
                    />
                  </td>
                  <td className='site-tab'>
                    <FormInputField
                      name={`sitePlan.${index}.bldg_id`}
                      className='h-8 w-40 px-1 text-xs'
                      control={form.control}
                      type='number'
                    />
                  </td>

                  {Object.keys(field).map(key => {
                    const isEditable = [
                      'sov_sp',
                      'sov_td',
                      'sov_up',
                      'sov_mc',
                      'sov_total'
                    ].includes(key)
                    if (key === 'id') return null
                    if (key === 'site_index') return null
                    if (key === 'bldg_id') return null
                    return (
                      <td key={key} className='site-tab'>
                        {isEditable ? (
                          <div className='flex gap-1'>
                            <span>$</span>
                            <FormInputField
                              name={`sitePlan.${field.site_index}.${key}`}
                              className='h-8 w-40 px-1 text-xs'
                              inputMode='decimal'
                              control={form.control}
                              readOnly={true}
                            />
                          </div>
                        ) : (
                          <FormInputField
                            name={`sitePlan.${field.site_index}.${key}`}
                            className='h-8 w-40 px-1 text-xs'
                            inputMode='decimal'
                            control={form.control}
                            readOnly={true}
                          />
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
      <BudgetSitePlan control={control} watch={watch} setValue={setValue} />
    </div>
  )
}
