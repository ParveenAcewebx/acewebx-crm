'use client'

import FormInputField from '@/components/share/form/FormInputField'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
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
import { Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import BudgetCategoryForm from '../budgetCategoryForm'
import BudgetCategoryOtherFields from '../budgetCategoryOtherFields'

const SillPlateAddForm = ({
  selectedCategory,
  activeTab,
  scopeTitle,

  budgetCategoryFields,
  site_Id,
  site_name,
  labelValue,
  handleModalClose,
  form,
  budgetIndex
}) => {
  const [regularTotal, setRegularTotal] = useState(0)
  const [otherTotal, setOtherTotal] = useState(0)

  const { control, getValues, setValue } = form
  const categoryId = budgetCategoryFields?.budgetCategory?.id
  // Ensure the site object exists in scopeOther
  useEffect(() => {
    const sitePath = `scopeOther.${budgetIndex}`
    const currentSiteObj = getValues(sitePath)

    if (!currentSiteObj || typeof currentSiteObj !== 'object') {
      setValue(sitePath, {})
    }

    const catPath = `scopeOther.${budgetIndex}.${categoryId}`
    if (!Array.isArray(getValues(catPath))) {
      setValue(catPath, [])
    }
  }, [budgetIndex, categoryId, getValues, setValue])

  const {
    fields: otherSegments,
    append,
    remove
  } = useFieldArray({
    control,
    name: `scopeOther.${budgetIndex}.${categoryId}`
  })

  useEffect(() => {
    const sitePath = `scopeOther.${budgetIndex}`
    const catPath = `scopeOther.${budgetIndex}.${categoryId}`
    const currentSiteData = getValues(sitePath)
    const currentCatData = getValues(catPath)

    // Ensure the outer object exists
    if (!currentSiteData || typeof currentSiteData !== 'object') {
      setValue(sitePath, {})
    }

    // Ensure the category key exists
    if (!Array.isArray(currentCatData)) {
      setValue(catPath, [])
    }

    // Append default row only if not already present
    if (!currentCatData || currentCatData.length === 0) {
      const dynamicKey = `${site_Id}_0`
      append({
        siteId: site_Id,
        budget_Cat_Id: categoryId,
        data: {
          [dynamicKey]: {
            pricePerSqft: '',
            additional: '',
            cost: '',
            priceWithAdditional: '',
            costSqft: '',
            total: ''
          }
        }
      })
    }
  }, [budgetIndex, categoryId, getValues, setValue, append, site_Id])

  // mapping of all scopes/categories/groups/segments per site
  // This builds structure required for displaying scope/category/group/segment forms
  const siteIds = Array.isArray(site_Id) ? site_Id : [site_Id]
  const siteCategoryMap = {}

  for (const siteId of siteIds) {
    siteCategoryMap[siteId] = {}
  }

  const titleScope = budgetCategoryFields?.scopes?.[0]?.title ?? ''
  const budgetCatName = budgetCategoryFields?.budgetCategory?.catName || ''
  const scopes = budgetCategoryFields?.scopes || []

  for (const scope of scopes) {
    const scopeTitle = scope?.title
    const scopeId = scope.scope_id
    for (const category of scope.categories || []) {
      const categoryId = category.scope_category_id
      for (const group of category.groups || []) {
        const groupId = group.scope_group_id
        for (const segment of group.sagments || []) {
          const segmentId = segment.scope_sagment_id

          for (const siteId of siteIds) {
            siteCategoryMap[siteId][budgetCatName] ??= []
            const siteScopes = siteCategoryMap[siteId][budgetCatName]

            // Find or create scope structure
            let targetScope = siteScopes.find(s => s.scope_id === scopeId)
            if (!targetScope) {
              targetScope = {
                ...scope,
                categories: [],
                scope_category_id: categoryId
              }
              siteScopes.push(targetScope)
            }
            // Find or create category
            let targetCategory = targetScope.categories.find(
              c => c.scope_category_id === categoryId
            )
            if (!targetCategory) {
              targetCategory = {
                ...category,
                groups: []
              }
              targetScope.categories.push(targetCategory)
            }
            // Find or create group
            let targetGroup = targetCategory.groups.find(
              g => g.scope_group_id === groupId
            )
            if (!targetGroup) {
              targetGroup = {
                ...group,
                sagments: []
              }
              targetCategory.groups.push(targetGroup)
            }
            // Find or create segment
            let targetSegment = targetGroup.sagments.find(
              s => s.scope_sagment_id === segmentId
            )
            if (!targetSegment) {
              targetSegment = {
                ...segment,
                data: []
              }
              targetGroup.sagments.push(targetSegment)
            }
            // Add site_id to segment if not already present
            const alreadyHas = targetSegment.data?.some(
              d => d.site_id === siteId
            )
            if (!alreadyHas) {
              targetSegment.data.push({
                site_id: siteId
              })
            }
          }
        }
      }
    }
  }
  //Default site and category name list for rendering
  const defaultSite = siteIds[0] || ''
  const categories = siteCategoryMap[defaultSite] || {}
  const catNames = Object.keys(categories)
  // When regular or other totals change, update total in budgets form
  useEffect(() => {
    const combined = regularTotal + otherTotal
    setValue(
      `budgets.${budgetIndex}.${
        budgetCategoryFields?.budgetCategory?.cat_value
      }`,
      combined.toFixed(4)
    )
  }, [regularTotal, otherTotal])
  console.log('budgetCategoryFields', budgetCategoryFields)

  return (
    <>
      {catNames.length > 0 ? (
        catNames.map(catName => {
          const scopes = categories[catName]
          return (
            <div key={`site-${defaultSite}-${catName}`} className='mb-6'>
              {scopes?.map((scopeItem, idx) => (
                <div key={`scope-${idx}`}>
                  <Accordion
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
                              <TableHead className='text-left'>
                                Cost/SQFT
                              </TableHead>{' '}
                              <TableHead>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className='cursor-help'>
                                      Add. Cost
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side='top'>
                                    Additional Cost
                                  </TooltipContent>
                                </Tooltip>
                              </TableHead>
                              <TableHead className='text-left'>Cost</TableHead>
                              <TableHead
                                style={{ width: '9%' }}
                                className='text-left'
                              >
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className='cursor-help'>
                                      Cost w/Add.
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side='top'>
                                    Cost With Additional
                                  </TooltipContent>
                                </Tooltip>
                              </TableHead>
                              <TableHead className='text-left'>
                                Cost/SQFT+
                              </TableHead>
                              <TableHead className='w-1/2 text-left'>
                                Condition
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {scopeItem?.categories?.map(category => (
                              <React.Fragment
                                key={`cat-${category.scope_category_id}`}
                              >
                                <TableRow>
                                  <TableCell colSpan={14}>
                                    <span className='block pt-2 text-base font-semibold text-muted-foreground'>
                                      {category.title || 'Category'}
                                    </span>
                                  </TableCell>
                                </TableRow>

                                {category.groups?.map(group =>
                                  group.sagments?.map(segment => (
                                    <TableRow key={segment.scope_sagment_id}>
                                      <BudgetCategoryForm
                                        budgetCategoryFields={
                                          budgetCategoryFields
                                        }
                                        control={control}
                                        budgetCatId={
                                          budgetCategoryFields?.budgetCategory
                                            ?.id
                                        }
                                        budgetField={
                                          budgetCategoryFields?.budgetCategory
                                            ?.cat_value
                                        }
                                        activeTab={activeTab}
                                        form={form}
                                        budgetIndex={budgetIndex}
                                        site_Id={site_Id}
                                        scopeItem={scopeItem}
                                        segment={segment}
                                        category={category}
                                        group={group}
                                        onCostUpdate={setRegularTotal}
                                      />
                                    </TableRow>
                                  ))
                                )}
                              </React.Fragment>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}

              <Accordion
                type='single'
                collapsible
                className='w-full'
                defaultValue='Other'
              >
                <AccordionItem value='Other'>
                  <AccordionTrigger className='Accordion-Trigger mt-3 rounded bg-slate-300'>
                    <span className='ml-3 text-lg text-black'>Other</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow className='theme-bg-light-rgba rounded-6 border'>
                          <TableHead className='w-2/6 text-left'>
                            Category
                          </TableHead>
                          <TableHead>INC</TableHead>
                          <TableHead>EXC</TableHead>
                          <TableHead>NA</TableHead>
                          <TableHead>Option</TableHead>
                          <TableHead className='w-0 text-left'>
                            Cost/SQFT
                          </TableHead>
                          <TableHead>
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
                          <TableHead
                            style={{ width: '9%' }}
                            className='text-left'
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className='cursor-help'>Cost w/Add.</span>
                              </TooltipTrigger>
                              <TooltipContent side='top'>
                                Cost With Additional
                              </TooltipContent>
                            </Tooltip>
                          </TableHead>
                          <TableHead className='text-left'>
                            Cost/SQFT+
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {otherSegments
                          .filter(field => field.budget_Cat_Id === categoryId) // ✅ Filter for this category only
                          .map((field, localIndex) => {
                            const dynamicKey = `${site_Id}_${localIndex}`
                            const fakeSegment = {
                              ...(field.data?.[dynamicKey] || {}),
                              scope_sagment_id: `other-${localIndex}`,
                              option: []
                            }

                            return (
                              <TableRow key={field.id}>
                                <BudgetCategoryOtherFields
                                  form={form}
                                  budgetCategoryFields={budgetCategoryFields}
                                  budgetIndex={budgetIndex}
                                  site_Id={site_Id}
                                  segment={fakeSegment}
                                  dynamicKey={dynamicKey}
                                  budgetCatId={field.budget_Cat_Id}
                                  control={control}
                                  otherFieldId={field.id}
                                  repeterIndex={localIndex}
                                  onOtherCostUpdate={setOtherTotal}
                                />
                                <TableCell>
                                  <Button
                                    className='h-6 w-6 p-0'
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    onClick={() => remove(localIndex)}
                                  >
                                    <Trash2 className='h-4 w-4 text-red-500' />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}

                        <TableRow>
                          <TableCell>
                            <Button
                              type='button'
                              variant='outline'
                              className='site-button'
                              size='sm'
                              onClick={() => {
                                const dynamicKey = `${site_Id}_${otherSegments.length}`

                                append({
                                  siteId: site_Id,
                                  budget_Cat_Id: categoryId,
                                  data: {
                                    [dynamicKey]: {
                                      pricePerSqft: '',
                                      additional: '',
                                      cost: '',
                                      priceWithAdditional: '',
                                      costSqft: '',
                                      total: ''
                                    }
                                  }
                                })
                              }}
                            >
                              + Add Other
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className='mt-4 flex justify-between text-right font-semibold'>
                <div>Total:</div>
                <FormInputField
                  className='h-8 px-1 text-xs'
                  inputMode='decimal'
                  type='number'
                  readOnly={true}
                  form={form}
                  name={`budgets.${budgetIndex}.${budgetCategoryFields?.budgetCategory?.cat_value}`}
                />
              </div>
            </div>
          )
        })
      ) : (
        <div className='my-6 text-center'>
          <p>In this category, there are no scope items.</p>
        </div>
      )}
    </>
  )
}

export default SillPlateAddForm
