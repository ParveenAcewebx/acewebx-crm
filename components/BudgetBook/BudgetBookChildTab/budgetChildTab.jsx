'use client'

import LeadSettingModal from '@/components/modal/LeadsettingModal'
import FormInputField from '@/components/share/form/FormInputField'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import SillPlateAddForm from '../BudgetBookForm/sillplateForm'

export default function BudgetChildTab({
  siteId,
  scope,
  budgetFields,
  siteName,
  fields,
  form,
  activeTab
}) {
  const [matchedScope, setMatchedScope] = useState(null)
  const [activeInputs, setActiveInputs] = useState({})
  const [currentSiteId, setCurrentSiteId] = useState({})
  const [matchedBudgetCategory, setMatchedBudgetCategory] = useState({})
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null)
  const [currentSiteName, setCurrentSiteName] = useState({})
  const [openModal, setOpenModal] = useState({
    open: false,
    title: '',
    labelValue: '',
    index: null
  })

  const matchMap = useMemo(
    () =>
      scope?.reduce((acc, item) => {
        const title = item?.budgetCategory?.catName?.toLowerCase()
        const shortTitle = item?.budgetCategory?.cat_value?.toLowerCase()
        acc[title] = title
        acc[shortTitle] = title
        return acc
      }, {}),
    [scope]
  )

  const selectedCategory = budgetFields.find(
    item => item.budgetCategory.cat_value === selectedCategoryKey
  )

  // const handleOnScope = (value, index) => {
  //   setSelectedCategoryKey(value)
  //   setActiveInputs(prev => ({ ...prev, [`budgets.${index}.${value}`]: true }))

  //   const matchedScopeTitle = matchMap[value]
  //   if (!matchedScopeTitle) return

  //   const matchedScope = scope.find(
  //     s => s.budgetCategory?.catName?.toLowerCase() === matchedScopeTitle
  //   )
  //   if (!matchedScope) return

  //   const currentSiteId = Array.isArray(siteId) ? siteId[index] : siteId
  //   const currentSiteName = Array.isArray(siteName) ? siteName[index] : siteName

  //   setCurrentSiteId(currentSiteId)
  //   setCurrentSiteName(currentSiteName)

  //   const matchedBudget = budgetFields.find(
  //     item => item.budgetCategory.cat_value === value
  //   )
  //   if (!matchedBudget) return

  //   const isSelected = selectedScopes.find(
  //     s =>
  //       Number(s?.budget_category_id) ===
  //       Number(matchedBudget?.budgetCategory?.id)
  //   )

  //   if (!isSelected) {
  //     const transformed = transformScopeItem({ ...matchedBudget, matchedScope })
  //     const updated = [...selectedScopes, transformed]
  //     setValue('projectScopes', updated, { shouldValidate: true })
  //   }
  // }

  const handleModalClose = () => {
    setOpenModal({ open: false, title: '', labelValue: '', index: null })
  }

  const handleOpenModal = (value, index) => {
    const matchedBudget = budgetFields.find(
      item => item.budgetCategory.cat_value === value
    )

    const matchedScope = scope.find(
      s =>
        s.budgetCategory?.cat_value?.toLowerCase() ===
        matchMap[value]?.toLowerCase()
    )
    setMatchedScope(matchedScope)

    const currentSiteId = Array.isArray(siteId) ? siteId[index] : siteId
    setCurrentSiteId(currentSiteId)
    setMatchedBudgetCategory(matchedBudget)

    const title = matchedBudget ? matchedBudget.budgetCategory.catName : ''
    setOpenModal({ open: true, title, labelValue: value, index })
  }

  return (
    <>
      <div className='budget-tab custom-scroll-bar overflow-auto pb-4'>
        <div style={{ width: '800px' }}>
          <table className='min-w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-blue-100 text-center text-xs font-bold'>
                <th className='bg-blue-300 p-2'></th>
                <th colSpan={15} className='bg-blue-300 p-2'>
                  BUDGET
                </th>
              </tr>
              <tr className='bg-blue-50 text-center text-xs font-semibold'>
                <th className='border p-2'>BLDG</th>
                {budgetFields?.map((header, i) => (
                  <th key={i} className='border p-2'>
                    {header?.budgetCategory?.catName}
                  </th>
                ))}
                <th className='border p-2'>TOTALS</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index} className='text-center'>
                  <td className='border p-1.5'>
                    <FormInputField
                      name={`budgets.${index}.site_name`}
                      className='h-6 !border-none px-1 text-[10px]'
                      control={form.control}
                      readOnly
                    />
                  </td>
                  {budgetFields?.map(({ budgetCategory }, i) => {
                    const labelValue = budgetCategory.cat_value
                    const fieldPath = `budgets.${index}.${labelValue}`

                    return (
                      <td key={i} className='border p-1'>
                        <div className='flex items-center justify-between'>
                          <FormInputField
                            // onClick={() => handleOnScope(labelValue, index)}
                            name={fieldPath}
                            className='h-6 !border-none px-1 text-xs'
                            inputMode='decimal'
                            type='number'
                          />
                          <Plus
                            onClick={() => {
                              // handleOnScope(labelValue, index)
                              handleOpenModal(labelValue, index)
                            }}
                            className='ml-1 cursor-pointer'
                          />
                        </div>
                      </td>
                    )
                  })}
                  <td className='border p-1.5'>
                    <FormInputField
                      name={`budgets.${index}.budget_total`}
                      className='h-6 !border-none px-1 text-[10px]'
                      control={form.control}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openModal.open && (
        <LeadSettingModal
          className='!max-w-[75%]'
          submitOpenModal={openModal.open}
          submitHandleModalClose={handleModalClose}
          description={
            <SillPlateAddForm
              selectedCategory={selectedCategory}
              labelValue={openModal.labelValue}
              activeTab={activeTab}
              form={form}
              budgetCategoryFields={matchedBudgetCategory}
              budgetIndex={openModal.index}
              site_Id={currentSiteId}
              siteName={siteName?.[openModal.index]}
              scopeTitle={openModal.title}
              handleModalClose={handleModalClose}
              matchedScope={matchedScope}
            />
          }
          message={openModal.title}
        />
      )}
    </>
  )
}
