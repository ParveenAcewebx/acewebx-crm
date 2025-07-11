'use client'

import FormInputField from '@/components/share/form/FormInputField'
import { TableCell } from '@/components/ui/table'
import { debounce } from 'lodash'
import { Link } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import FormMultiSelectField from '../share/form/FormMultiSelect'
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

export default function BudgetCategoryForm({
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
  onCostUpdate,

  budgetField
}) {
  const { setValue, getValues } = form
  const baseName = `scopes.${budgetIndex}.${site_Id}_${scopeItem.scope_id}_${segment.scope_sagment_id}`
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

  // set values
  useEffect(() => {
    setValue(`${baseName}.budget_Cat_Id`, budgetCatId)
    setValue(`${baseName}.budgetIndex`, budgetIndex)
    setValue(`${baseName}.scope_id`, scopeItem?.scope_id)
    setValue(`${baseName}.scope_name`, scopeItem?.title)
    setValue(`${baseName}.segment_id`, segment.scope_sagment_id)
    setValue(`${baseName}.segment_name`, segment?.title)
    setValue(`${baseName}.scope_category_id`, category?.scope_category_id)
    setValue(`${baseName}.category_name`, category?.title)
    setValue(`${baseName}.group_id`, group?.scope_group_id)
    setValue(`${baseName}.group_name`, group?.title)
    setValue(`${baseName}.site_id`, site_Id)
  }, [setValue, baseName, scopeItem, segment, category, group, site_Id])

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

            const allScopes = getValues(`scopes.${budgetIndex}`) || {}
            let totalCostSum = 0
            Object.values(allScopes).forEach(scopeObj => {
              if (scopeObj?.budget_Cat_Id === budgetCatId) {
                const scopeCost = parseFloat(scopeObj.costSqft) || 0
                totalCostSum += scopeCost
              }
            })
            console.log('totalCostSum', totalCostSum)

            onCostUpdate?.(totalCostSum)

            // setValue(
            //   `budgets.${budgetIndex}.${budgetField}`,
            //   totalCostSum.toFixed(4)
            // )
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
      <TableCell className='text-left'>{segment.title}</TableCell>
      <TableCell className='text-left'>
        {segment.url && (
          <a href={segment.url}>
            <Link className='mt-1 cursor-pointer text-xs text-gray-500 hover:text-blue-500' />
          </a>
        )}
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
          defaultValue={0}
        />
      </TableCell>

      <TableCell className='text-sm'>
        <FormInputField
          className='h-8 w-20 px-1 text-xs'
          inputMode='decimal'
          type='number'
          form={form}
          name={`${baseName}.additional`}
          defaultValue={0}
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

      <TableCell>
        <FormMultiSelectField
          name={`${baseName}.condition`}
          className='w-full px-1 text-xs'
          form={form}
          options={
            Array.isArray(segment?.option) &&
            segment.option.filter(Boolean).length > 0
              ? segment.option.filter(Boolean).map(item => ({
                  label: item,
                  value: item
                }))
              : [
                  {
                    label: 'No Option',
                    value: '',
                    disabled: true
                  }
                ]
          }
        />
      </TableCell>
      {/* 
      <TableCell className='text-sm'>
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
          <Dialog className=''>
            <DialogTrigger asChild>
              <div className='cursor-pointer'>
                <FormInputField
                  form={form}
                  name={`${baseName}.notes`}
                  className='h-10 w-full cursor-pointer truncate bg-white px-1 text-xs'
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
                className='min-h-[100px] !w-full'
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
    </>
  )
}
