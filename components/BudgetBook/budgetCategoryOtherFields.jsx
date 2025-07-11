'use client'

import FormInputField from '@/components/share/form/FormInputField'
import { TableCell } from '@/components/ui/table'
import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import RadioButton from '../share/form/RadioButton'

export default function BudgetCategoryOtherFields({
  form,
  budgetIndex,
  site_Id,
  budgetCatId,
  dynamicKey,
  control,
  budgetField,
  otherFieldId,
  repeterIndex,
  onOtherCostUpdate
}) {
  console.log('repeterId', repeterIndex)

  const { setValue, getValues } = form
  const baseName = `scopeOther.${budgetIndex}.${budgetCatId}.${repeterIndex}.data.${dynamicKey}`

  const [sqft, setSqft] = useState(0)

  // Watch values
  const pricePerSqft = useWatch({
    control,
    name: `${baseName}.pricePerSqft`,
    defaultValue: 0
  })
  const additional = useWatch({
    control,
    name: `${baseName}.additional`,
    defaultValue: 0
  })
  const grossSqft = useWatch({ control, name: 'bldg_gsqft' })
  const sites = useWatch({ control, name: 'sites' })
  const noteValue = useWatch({ control, name: `${baseName}.notes` })
  console.log('pricePerSqft', pricePerSqft)

  const calculateCost = useMemo(
    () =>
      debounce(() => {
        sites.forEach((i, item) => {
          if (i.site_Id === site_Id) {
            setSqft(i.gs_qft)

            const price = parseFloat(pricePerSqft) || 0
            const add = parseFloat(additional) || 0
            const sqft = i.gs_qft

            const cost = price * sqft
            const costWithAdditional = cost + add
            const costPerSqftPlus = sqft > 0 ? costWithAdditional / sqft : 0
            const total =
              price + add + cost + costWithAdditional + costPerSqftPlus

            setValue(`${baseName}.cost`, cost.toFixed(4))
            setValue(
              `${baseName}.priceWithAdditional`,
              costWithAdditional.toFixed(4)
            )
            setValue(`${baseName}.costSqft`, costPerSqftPlus.toFixed(4))
            setValue(`${baseName}.total`, total.toFixed(4))

            const allOtherScopes =
              getValues(`scopeOther.${budgetIndex}.${budgetCatId}`) || []
            let otherCostSum = 0
            allOtherScopes.forEach(item => {
              if (item?.data && typeof item.data === 'object') {
                Object.values(item.data).forEach(entry => {
                  const val = parseFloat(entry?.costSqft)
                  if (!isNaN(val)) {
                    otherCostSum += val
                  }
                })
              }
            })

            console.log('otherCostSum', otherCostSum)
            onOtherCostUpdate?.(otherCostSum)
          }
        })
      }, 200),
    [pricePerSqft, additional, grossSqft]
  )

  useEffect(() => {
    // Initialize default values on mount
    setValue(`${baseName}.pricePerSqft`, 0, { shouldValidate: true })
    setValue(`${baseName}.additional`, 0, { shouldValidate: true })
    calculateCost()
    return () => calculateCost.cancel()
  }, [pricePerSqft, additional, grossSqft])

  return (
    <>
      <TableCell className='flex gap-6'>
        <FormInputField
          className='h-10 px-1 text-xs'
          type='text'
          form={form}
          name={`${baseName}.title`}
        />
      </TableCell>
      {['inc', 'exc', 'na', 'option'].map(option => (
        <TableCell key={option} className='!text-center'>
          <RadioButton
            name={`${baseName}.is_include`}
            options={[{ label: '', value: option }]}
            form={form}
            className='text-gray-300'
          />
        </TableCell>
      ))}

      <TableCell className='text-sm'>
        <FormInputField
          className='h-8 px-1 text-xs'
          inputMode='decimal'
          type='number'
          form={form}
          name={`${baseName}.pricePerSqft`}
          defaultValue={0} // Set default value
        />
      </TableCell>

      <TableCell className='text-sm'>
        <FormInputField
          className='h-8 w-20 px-1 text-xs'
          inputMode='decimal'
          type='number'
          form={form}
          name={`${baseName}.additional`}
          defaultValue={0} // Set default value
        />
      </TableCell>

      <TableCell className='text-sm'>
        <FormInputField
          className='h-8 w-20 px-1 text-xs'
          inputMode='decimal'
          type='number'
          form={form}
          name={`${baseName}.cost`}
          readOnly
        />
      </TableCell>

      <TableCell className='text-sm'>
        <FormInputField
          className='h-8 w-20 px-1 text-xs'
          inputMode='decimal'
          type='number'
          form={form}
          name={`${baseName}.priceWithAdditional`}
          readOnly
        />
      </TableCell>

      <TableCell className='text-sm'>
        <FormInputField
          className='h-8 w-20 px-1 text-xs'
          inputMode='decimal'
          type='number'
          form={form}
          name={`${baseName}.costSqft`}
          readOnly
        />
      </TableCell>

      <TableCell></TableCell>
    </>
  )
}
