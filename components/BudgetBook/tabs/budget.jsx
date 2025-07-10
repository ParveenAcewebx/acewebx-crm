'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import BudgetChildTab from '../BudgetBookChildTab/budgetChildTab'
import CostBldgChildTab from '../BudgetBookChildTab/costBldgChildTab'
import CostBldgChildTypeTab from '../BudgetBookChildTab/costBldgChildTypeTab'
import PriceBldgChildTab from '../BudgetBookChildTab/priceBldgChildTab'
import PriceBldgChildTypeTab from '../BudgetBookChildTab/priceBldgChildTypeTab '

export function BudgetTab({ form, siteId, siteName, scope, budgetFields }) {
  const { control } = form
  const { fields } = useFieldArray({
    name: 'budgets',
    control
  })
  const [activeTab, setActiveTab] = useState('budget')

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
          <TabsTrigger
            value='budget'
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
          >
            Budget
          </TabsTrigger>
          <TabsTrigger
            value='costBldgChildTab'
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
          >
            Cost Bldg
          </TabsTrigger>
          <TabsTrigger
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
            value='priceBldgChildTab'
          >
            Price Bldg
          </TabsTrigger>
          <TabsTrigger
            value='costBldgChildTypeTab'
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
          >
            Cost Bldg Type
          </TabsTrigger>
          <TabsTrigger
            value='priceBldgChildTypeTab'
            className='rounded-none px-4 py-2 text-sm font-medium text-gray-500 !shadow-none'
          >
            Price Bldg Type
          </TabsTrigger>
        </TabsList>

        <TabsContent value='budget'>
          <BudgetChildTab
            scope={scope}
            budgetFields={budgetFields}
            siteId={siteId}
            siteName={siteName}
            fields={fields}
            form={form}
            activeTab={activeTab}
          />
        </TabsContent>
        <TabsContent value='costBldgChildTab'>
          {' '}
          <CostBldgChildTab fields={fields} form={form} />
        </TabsContent>
        <TabsContent value='priceBldgChildTab'>
          <PriceBldgChildTab fields={fields} form={form} />
        </TabsContent>
        <TabsContent value='costBldgChildTypeTab'>
          <CostBldgChildTypeTab fields={fields} form={form} />
        </TabsContent>
        <TabsContent value='priceBldgChildTypeTab'>
          <PriceBldgChildTypeTab fields={fields} form={form} />
        </TabsContent>
      </Tabs>
    </>
  )
}
