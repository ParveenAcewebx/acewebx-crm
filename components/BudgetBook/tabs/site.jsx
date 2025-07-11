'use client'

import {
  defaultBudgetRow,
  defaultSitePlanRow,
  defaultSiteRow
} from '@/components/DefaultValues/BudgetBook'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import AddersBldgChildTab from '../BudgetSiteChildTab/addersBldgChildTab'
import AddersBldgTypeChild from '../BudgetSiteChildTab/addersBldgType'
import BldgChildTab from '../BudgetSiteChildTab/bldgChildTab'
import GeneralChildTab from '../BudgetSiteChildTab/generalChildTab'
import PriceChildTab from '../BudgetSiteChildTab/priceChildTab'

export default function BudgetSiteTab({ form, setSiteId, setSiteName }) {
  const { control, getValues, setValue, watch } = form
  const [activeTab, setActiveTab] = useState('general')
  const {
    fields: siteFields,
    append: appendSite,
    remove: removeSite
  } = useFieldArray({
    control,
    name: 'sites'
  })


  const {
    fields: budgetFields,
    append: appendBudget,
    remove: removeBudget
  } = useFieldArray({
    control,
    name: 'budgets'
  })

  const {
    fields: sitePlanields,
    append: appendSitePlan,
    remove: removeSitePlan
  } = useFieldArray({
    control,
    name: 'sitePlan'
  })

  const watchedMaterials = useWatch({
    control,
    name: 'sites'
  })?.map((item, index) => ({
    ...item,
    index,
    id: siteFields[index]?.id
  }))

  useEffect(() => {
    watchedMaterials?.forEach((item, index) => {
      const currentSiteId = getValues(`sites.${index}.site_Id`)

      if (currentSiteId == '') {
        setValue(`sites.${index}.site_Id`, uuid(), {
          shouldValidate: true,
          shouldDirty: true
        })
      }
    })
  }, [watchedMaterials])

  const sites = useWatch('sites')
  const siteData = sites.sites

  useEffect(() => {
    const siteId = siteData?.map(site => site.site_Id)
    const siteName = siteData?.map(site => site.name)
    setSiteId(siteId)
    setSiteName(siteName)
  }, [siteFields, siteData, setSiteId, setSiteName])

  // append field according to key
  const handleAppend = () => {
    const currentSites = getValues('sites')
    const siteName = currentSites?.[siteFields.length]?.name || ''
    const qty = currentSites?.[siteFields.length]?.qty || ''
    const ts_qft = currentSites?.[siteFields.length]?.ts_qft || ''
    appendSite(defaultSiteRow)
    appendBudget({ ...defaultBudgetRow, bldg: siteName })
    appendSitePlan({
      ...defaultSitePlanRow
    })
  }
  /// delete row handler
  const deleteRowHandler = index => {
    removeSite(index)

    // delete budget values manually
    const updatedBudgets = getValues('budgets').filter((_, i) => i !== index)
    setValue('budgets', updatedBudgets)

    const updatedSitePlan = getValues('sitePlan').filter((_, i) => i !== index)
    setValue('sitePlan', updatedSitePlan)
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
          <TabsTrigger
            value='general'
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
          >
            General Data
          </TabsTrigger>
          <TabsTrigger
            value='price'
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
          >
            Price
          </TabsTrigger>
          <TabsTrigger
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
            value='bldg'
          >
            Bldg
          </TabsTrigger>
          <TabsTrigger
            value='adders'
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
          >
            Adders Bldg
          </TabsTrigger>
          <TabsTrigger
            value='addersType'
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
          >
            Adders Bldg Type
          </TabsTrigger>
        </TabsList>

        <TabsContent value='general' className='site-generaldata'>
          <GeneralChildTab
            fields={siteFields}
            form={form}
            deleteRowHandler={deleteRowHandler}
            handleAppend={handleAppend}
          />
        </TabsContent>
        <TabsContent value='price' className='site-pricedata'>
          <PriceChildTab fields={siteFields} form={form} />
        </TabsContent>
        <TabsContent value='bldg' className='site-bldgdata'>
          <BldgChildTab fields={siteFields} form={form} />
        </TabsContent>
        <TabsContent value='adders' className='site-addersdata'>
          <AddersBldgChildTab fields={siteFields} form={form} />
        </TabsContent>
        <TabsContent value='addersType' className='site-adderstypedata'>
          <AddersBldgTypeChild fields={siteFields} form={form} />
        </TabsContent>
      </Tabs>
    </>
  )
}
