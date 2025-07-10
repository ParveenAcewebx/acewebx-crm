'use client'

import ScopeTab from '@/components/BudgetTabsForm/BudgetScopeTabs/ScopeTabe'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { useWatch } from 'react-hook-form'

const BudgetScopeTab = ({ form, siterepeaterId = [], siteName = [] }) => {
  console.log('siteName', siteName)
  const { watch, control } = form

  const projectScopes = watch('projectScopes') || []
  const budget = useWatch({
    control,
    name: 'budgets'
  })
  console.log('testing-scope', projectScopes)

  const siteCategoryMap = {}

  const siteIds = Array.isArray(siterepeaterId)
    ? siterepeaterId
    : [siterepeaterId]

  // Ensure siteCategoryMap has empty structure for each site
  for (const siteId of siteIds) {
    siteCategoryMap[siteId] = {}
  }
  const [activeSiteId, setActiveSiteId] = useState(siteIds[0])
  const budgetIndex = siteIds.indexOf(activeSiteId)
  for (const catWrapper of projectScopes) {
    const catName = catWrapper?.catName || ''
    for (const scope of catWrapper.scopes || []) {
      const scopeId = scope.scope_id
      for (const category of scope.categories || []) {
        const categoryId = category.scope_category_id
        for (const group of category.groups || []) {
          const groupId = group.scope_group_id
          for (const segment of group.sagments || []) {
            const segmentId = segment.scope_sagment_id

            for (const siteId of siteIds) {
              siteCategoryMap[siteId][catName] ??= []
              const siteScopes = siteCategoryMap[siteId][catName]

              let targetScope = siteScopes.find(s => s.scope_id === scopeId)
              if (!targetScope) {
                targetScope = {
                  ...scope,
                  categories: []
                }
                siteScopes.push(targetScope)
              }

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

              // Ensure a siteData object exists for this site
              const alreadyHas = targetSegment.data?.some(
                d => d.site_id === siteId
              )
              if (!alreadyHas) {
                targetSegment.data.push({
                  site_id: siteId
                  // Add default values here if needed (e.g., cost, quantity, etc.)
                })
              }
            }
          }
        }
      }
    }
  }

  const defaultSite = siteIds[0] || ''

  return siteIds.length ? (
    <Tabs
      defaultValue={defaultSite}
      onValueChange={val => setActiveSiteId(val)}
    >
      <TabsList className='mb-2'>
        {siteIds.map((siteId, index) => (
          <TabsTrigger
            key={siteId}
            value={siteId}
            className='data-[state=active]:bg-blue-500 data-[state=active]:text-white'
          >
            {siteName[index] || siteId}
          </TabsTrigger>
        ))}
      </TabsList>

      {siteIds.map(siteId => {
        const categories = siteCategoryMap[siteId] || {}
        const catNames = Object.keys(categories)
        const defaultCat = catNames[0] || ''

        return (
          <TabsContent key={siteId} value={siteId}>
            <Tabs defaultValue={defaultCat}>
              <TabsList className='mb-2'>
                {catNames.map(cat => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className='data-[state=active]:bg-green-500 data-[state=active]:text-white'
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>

              {catNames.map(cat => (
                <TabsContent key={cat} value={cat}>
                  <ScopeTab
                    form={form}
                    scope={categories[cat]}
                    site_Id={siteId}
                    budgetIndex={budgetIndex}
                    cat={cat}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        )
      })}
    </Tabs>
  ) : (
    <p className='text-sm text-gray-500'>No site data found.</p>
  )
}

export default BudgetScopeTab
