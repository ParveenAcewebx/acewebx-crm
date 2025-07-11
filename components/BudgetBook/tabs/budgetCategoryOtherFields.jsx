'use client'

import FormInputField from '@/components/share/form/FormInputField'
import { TableCell } from '@/components/ui/table'
import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import RadioButton from '../share/form/RadioButton'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'

export default function BudgetCategoryOtherFields({
  form,
  budgetCategoryFields,
  budgetIndex,
  site_Id,
  scopeItem,
  segment,
  category,
  budgetCatId,
  group,
  activeTab,
  control,
  budgetField,
  otherFieldId,
  repeterId,
  onOtherCostUpdate
}) {
  console.log('repeterId', repeterId)

  const { setValue, getValues } = form
  const baseName = `scopes.${budgetIndex}.other.${repeterId}.${site_Id}_${scopeItem.scope_id}`

  const [sqft, setSqft] = useState(0)
  const {
    fields: others,
    append,
    remove
  } = useFieldArray({
    control: form.control,
    name: baseName
  })
  // Watch values
  const pricePerSqft = useWatch({ control, name: `${baseName}.pricePerSqft` })
  const additional = useWatch({ control, name: `${baseName}.additional` })
  const grossSqft = useWatch({ control, name: 'bldg_gsqft' })
  const sites = useWatch({ control, name: 'sites' })
  const noteValue = useWatch({ control, name: `${baseName}.notes` })

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
              getValues(`scopes.${budgetIndex}.other`) || {}

            let otherCostSum = 0
            const sum = Object.values(allOtherScopes).reduce(
              (acc, scopeObj) => {
                if (scopeObj.budget_Cat_Id === budgetCatId) {
                  const nested = Object.values(scopeObj).find(
                    v => v && typeof v === 'object' && 'costSqft' in v
                  )
                  const val = nested ? parseFloat(nested.costSqft) : 0
                  return acc + val
                }
                return acc
              },
              0
            )
            console.log(sum)

            console.log('otherCostSum', sum)

            onOtherCostUpdate?.(sum)
          }
        })
      }, 200),
    [pricePerSqft, additional, grossSqft]
  )

  useEffect(() => {
    calculateCost()
    return () => calculateCost.cancel()
  }, [pricePerSqft, additional, grossSqft])

  return (
    <>
      <TableCell className='flex justify-between'></TableCell>

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
        />
      </TableCell>

      <TableCell className='text-sm'>
        <FormInputField
          className='h-8 w-20 px-1 text-xs'
          inputMode='decimal'
          type='number'
          form={form}
          name={`${baseName}.additional`}
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

      {/*   <TableCell className='text-sm'>
          <FormInputField
            className='h-8 w-28 px-1 text-xs'
            inputMode='decimal'
            type='hidden'
            form={form}
            name={`${baseName}.total`}
            readOnly
          />
        </TableCell> */}

      {activeTab !== 'budget' && (
        <TableCell className='text-sm'>
          <Dialog>
            <DialogTrigger asChild>
              <div className='cursor-pointer'>
                <FormInputField
                  form={form}
                  name={`${baseName}.notes`}
                  className='h-8 w-40 cursor-pointer truncate bg-white px-1 text-xs'
                  readOnly
                  placeholder='Click to add note'
                  value={
                    noteValue
                      ? noteValue.split(' ').slice(0, 5).join(' ') +
                        (noteValue.split(' ').length > 6 ? '...' : '')
                      : ''
                  }
                />
              </div>
            </DialogTrigger>

            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>Notes</DialogTitle>
              </DialogHeader>

              <Textarea
                className='min-h-[100px]'
                placeholder='Enter note here'
                value={noteValue || ''}
                onChange={e =>
                  setValue(`${baseName}.notes`, e.target.value, {
                    shouldValidate: true
                  })
                }
              />

              <DialogFooter className='mt-4'>
                <DialogClose asChild>
                  <Button type='button' variant='default'>
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableCell>
      )}

      {/* Other Fields Repeater */}
    </>
  )
}
