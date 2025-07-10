/* eslint-disable @next/next/no-img-element */
'use client'
import BreakDown from '@/components/BudgetBook/BudgetBookChildTab/pdf/Breakdown'
import { errorMessage } from '@/components/ToasterMessage'
import BudgetBookService from '@/services/BudgetBook/budget-book-api'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const VeOptionBudget = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [invoiceLink, setInvoiceLink] = useState([])
  const [editData, setEditData] = useState([])
  const [scopeData, setscopeData] = useState([])

  // Fetch the inventory by Id To update the Id
  const fetchBudgetById = async () => {
    try {
      const response = await BudgetBookService.getBudgetById(id)

      if (response?.status === 200) {
        const budgetData = response?.data?.data?.data?.projectScopes
        setEditData(budgetData)
        // Build scope values from project scopes
        // const scopeValues = {}
        // budgetData?.projectScopes?.forEach(item => {
        //   if (item?.budget_Cat_Id !== undefined) {
        //     scopeValues[`scope[${item.budget_Cat_Id}]`] = true
        //   }
        // })

        const budgetCategoryId = budgetData?.budgetCategory?.id
        const projectScopeData = budgetData?.projectScopes || []
        const projectScopeOtherData = budgetData?.sitePlan || []
        console.log('projectScopeOtherData22', projectScopeOtherData)

        const scopeValues = {}

        projectScopeData.forEach(scopeItem => {
          const siteId =
            scopeItem?.categories?.[0]?.groups?.[0]?.sagments?.[0]?.site_id // Assuming one site_id per scope
          const categories = scopeItem.categories || []

          categories.forEach(cat => {
            cat.groups?.forEach(group => {
              group.sagments?.forEach(segment => {
                const keyPrefix = `scopes.${segment.budgetIndex}.${segment.site_id}_${scopeItem.scope_id}_${segment.scopeSagment.id}`
                scopeValues[`${keyPrefix}.notes`] = segment.notes
                scopeValues[`${keyPrefix}.is_include`] = segment.is_include
                scopeValues[`${keyPrefix}.pricePerSqft`] = segment.price_sqft
                scopeValues[`${keyPrefix}.additional`] = segment.additionals
                scopeValues[`${keyPrefix}.condition`] = segment.condition
                scopeValues[`${keyPrefix}.priceWithAdditional`] =
                  segment.price_w_additional
                scopeValues[`${keyPrefix}.cost`] = segment.cost
              })
            })
          })
        })
        const transformSitePlansToScopeOther = sitePlans => {
          const scopeOther = []

          sitePlans.forEach((plan, budgetIndex) => {
            const scopeEntry = {}

            // Create a map to track index per budgetCatId
            const repIndexMap = {}

            plan.budgetBookOthers?.forEach(entry => {
              const budgetCatId = entry.budget_cat_id.toString()

              if (!scopeEntry[budgetCatId]) {
                scopeEntry[budgetCatId] = []
                repIndexMap[budgetCatId] = 0 // Initialize local index
              }

              const localIndex = repIndexMap[budgetCatId]
              const dynamicKey = `${entry.site_id}_${localIndex}`

              scopeEntry[budgetCatId].push({
                siteId: entry.site_id,
                budget_Cat_Id: entry.budget_cat_id,
                data: {
                  [dynamicKey]: {
                    title: entry.title,
                    notes: entry.notes,
                    is_include: entry.is_include,
                    pricePerSqft: entry.price_sqft,
                    additional: entry.additionals,
                    condition: entry.condition,
                    priceWithAdditional: entry.price_w_additional,
                    cost: entry.cost,
                    costSqft: entry.costSqft,
                    total: entry.total
                  }
                }
              })

              repIndexMap[budgetCatId] += 1 // Increment per-category index
            })

            scopeEntry['data'] = []
            scopeOther.push(scopeEntry)
          })

          return scopeOther
        }

        const scopeOtherData = transformSitePlansToScopeOther(
          projectScopeOtherData
        )

        setLeadName(budgetData?.lead)
        setLeadId(budgetData?.lead?.id)

        // Pre-fill form values
        const formattedData = {
          ...budgetData,
          // ...scopeValues, // <-- Include scopeValues here
          projectType: JSON.parse(budgetData?.projectType),
          lead_project_id: budgetData?.lead?.id?.toString(),
          projectScopeIncludes: budgetData?.projectScopeIncludes?.map(item => ({
            budget_category_id: item?.budget_category_id,
            is_include: item?.is_include === 0 ? false : true
          })),
          projectScopes: budgetData.projectScopes,
          budget_book_id: budgetData.budgetBook?.id?.toString() || '',
          customer_id: budgetData.customer?.id?.toString() || '',
          contact_id: budgetData.contact?.id?.toString() || '',
          job_no: budgetData.job_no?.toString() || '',
          date_record: budgetData.quote_date
            ? new Date(budgetData.quote_date)
            : null,
          zip_id: budgetData?.zip?.id?.toString() || '',
          engineer_id: budgetData?.engineer?.id?.toString() || ''
        }
        setscopeData(scopeValues)
        methods.reset({
          ...formattedData,
          ...scopeValues,
          scopeOther: scopeOtherData
        })
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (id) {
      fetchBudgetById()
    }
  }, [id])
  console.log('editData', editData)

  const handlePrint = () => {
    print()
  }
  return (
    <>
      <button onClick={handlePrint}></button>

      <table
        align='center'
        cellPadding='0'
        cellSpacing='0'
        style={{
          maxWidth: '1000px',
          borderCollapse: 'collapse',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Logo Row */}
        <tr>
          <td colSpan={3} style={{ padding: '20px 0px' }}>
            <strong>BreakDown</strong>
          </td>
        </tr>
      </table>

      <BreakDown editData={editData} scopeData={scopeData} />
    </>
  )
}

export default VeOptionBudget
