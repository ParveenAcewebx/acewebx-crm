'use client'
import BudgetCategoryForm from '@/components/BudgetBook/budgetCategoryForm'
import FormInputField from '@/components/share/form/FormInputField'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import api from '@/lib/api'
import React, { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

const ScopeTab = ({ form, scope, site_Id, budgetIndex, cat }) => {
  const [budgetCatId, setBudgetCatId] = useState([])
  const { control, setValue, getValues } = useFormContext()
  const tiedowns = useWatch({ control, name: 'tieDowns' })
  const projectScopes = useWatch({ control, name: 'projectScopes' })

  const [budgetFields, setBudgetFields] = useState([])
  const titleScope = scope[0].title
  // console.log('budgetFields', budgetFields.budgetCategory.catName)

  const getBudgetCategory = async () => {
    const response = await api.get('/budget-category')
    if (response.status === 200) {
      setBudgetFields(response?.data)
    }
  }
  useEffect(() => {
    getBudgetCategory()
  }, [])

  const isBudgetFields = budgetFields.filter(
    item => item?.budgetCategory?.catName === cat
  )
  const budgetFieldName = isBudgetFields[0]?.budgetCategory?.cat_value

  useEffect(() => {
    projectScopes.map(item => setBudgetCatId(item?.budget_category_id))
  }, [])

  useEffect(() => {
    if (!Array.isArray(scope)) return
    const tiedownFormData = scope.flatMap(scopeItem =>
      scopeItem?.categories?.flatMap(category =>
        category.groups?.flatMap(group =>
          group.sagments?.map(segment => {
            const fieldName = segment.title?.replace(/\s+/g, '_') || ''
            return {
              fieldName,
              data: {
                is_include: segment.is_include,
                notes: segment.notes || '',
                acc: segment.acc || '',
                client_notes: segment.client_notes || '',
                internal_notes: segment.internal_notes || ''
              }
            }
          })
        )
      )
    )

    const currentValues = getValues('tieDowns') || {}
    const mapped = tiedownFormData.reduce((acc, { fieldName, data }) => {
      if (!fieldName) return acc
      // Only set if not already present
      if (!currentValues[fieldName]) {
        acc[fieldName] = data
      }
      return acc
    }, {})

    if (Object.keys(mapped).length > 0) {
      setValue(
        'tieDowns',
        { ...currentValues, ...mapped },
        { shouldValidate: true, shouldDirty: true }
      )
    }
  }, [scope])

  useEffect(() => {
    if (!tiedowns || typeof tiedowns !== 'object') return
    const updatedScopes = projectScopes?.map(scopeItem => ({
      ...scopeItem,
      categories: scopeItem?.categories?.map(category => ({
        ...category,
        groups: category.groups?.map(group => ({
          ...group,
          sagments: group.sagments?.map(segment => {
            const fieldName = segment.title?.replace(/\s+/g, '_') || ''
            const dataFromForm = tiedowns[fieldName]
            return dataFromForm
              ? {
                  ...segment,
                  is_include: dataFromForm.is_include,
                  notes: dataFromForm.notes,
                  acc: dataFromForm.acc,
                  client_notes: dataFromForm.client_notes,
                  internal_notes: dataFromForm.internal_notes
                }
              : segment
          })
        }))
      }))
    }))
    setValue('projectScopes', updatedScopes, { shouldValidate: true })
  }, [tiedowns])
  return (
    <div className='scope-table space-y-4'>
      {scope?.map((scopeItem, idx) => {
        const matchedScopeObj = projectScopes?.find(item =>
          item?.scopes?.some(
            sc => sc?.title?.toLowerCase() === scopeItem?.title?.toLowerCase()
          )
        )
        const budgetCatId = matchedScopeObj?.budget_category_id || null

        return (
          <Accordion
            key={`accordion-${idx}`}
            type='single'
            collapsible
            className='w-full'
            defaultValue={titleScope}
          >
            <AccordionItem value={scopeItem?.title}>
              <AccordionTrigger className='Accordion-Trigger mt-3 rounded bg-slate-300'>
                <span className='ml-3 text-lg text-black'>
                  {scopeItem?.title}
                </span>{' '}
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow className='theme-bg-light-rgba rounded-6 border'>
                      <TableHead className='w-2/6 text-left'>
                        Category
                      </TableHead>
                      <TableHead></TableHead>
                      <TableHead>INC</TableHead>
                      <TableHead>EXC</TableHead>
                      <TableHead>NA</TableHead>
                      <TableHead>Option</TableHead>
                      <TableHead className='text-left'>Cost/SQFT</TableHead>
                      <TableHead className='text-left'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className='cursor-help'>Add. Cost</span>
                          </TooltipTrigger>
                          <TooltipContent side='top'>
                            Additional Cost
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                      <TableHead className='text-left'>Cost</TableHead>
                      <TableHead style={{ width: '9%' }} className='text-left'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className='cursor-help'>Cost w/Add.</span>
                          </TooltipTrigger>
                          <TooltipContent side='top'>
                            Cost With Additional
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>

                      <TableHead className='text-left'>Cost/SQFt+</TableHead>
                      <TableHead className='w-1/4 text-left'>
                        Condition
                      </TableHead>
                      <TableHead className='w-full text-left'>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scopeItem?.categories?.map(category => (
                      <React.Fragment key={`cat-${category.scope_category_id}`}>
                        <TableRow>
                          <TableCell colSpan={8}>
                            <span className='block pt-2 text-base font-semibold text-muted-foreground'>
                              {category.title}
                            </span>
                          </TableCell>
                        </TableRow>
                        {category.groups?.map(group =>
                          group.sagments?.map(segment => {
                            const fieldName =
                              segment.title?.replace(/\s+/g, '_') || ''
                            return (
                              <TableRow
                                key={`seg-${segment.scope_sagment_id || fieldName}`}
                                className='align-top'
                              >
                                <BudgetCategoryForm
                                  budgetCatId={budgetCatId}
                                  form={form}
                                  budgetIndex={budgetIndex}
                                  site_Id={site_Id}
                                  scopeItem={scopeItem}
                                  segment={segment}
                                  category={category}
                                  group={group}
                                  budgetField={budgetFieldName}
                                />
                              </TableRow>
                            )
                          })
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      })}
      <div className='mt-4 flex justify-between text-right font-semibold'>
        <div>Total:</div>
        <FormInputField
          className='h-8 px-1 text-xs'
          inputMode='decimal'
          type='number'
          readOnly={true}
          form={form}
          name={`budgets.${budgetIndex}.${budgetFieldName}`}
        />
      </div>
    </div>
  )
}
export default ScopeTab
