'use client'
import Scope from '@/components/BudgetBookScope/Scope'
import LayoutHeader from '@/components/layoutHeader'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import BudgetScopeService from '@/services/BudgetBook/Budget-scope-api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditScope = () => {
  const form = useForm({})
  const [editData, setEditData] = useState()
  const router = useRouter()
  const setOption = ['t1', 't2', 't3']
  useEffect(() => {
    const resetData = {
      ...editData,
      category: editData?.categoryId,
      categories: editData?.categories?.map(category => ({
        ...category,
        groups: category?.groups?.map(group => ({
          ...group,
          sagments: group?.sagments?.map(segment => ({
            ...segment,
            option: Array.isArray(segment.option)
              ? segment.option.map(opt => ({ value: opt }))
              : []
          }))
        }))
      }))
    }

    form.reset(resetData)
  }, [editData])
  const searchParams = useSearchParams()
  const scopId = searchParams.get(`id`)
  const FetchScopeById = async () => {
    try {
      const response = await BudgetScopeService.GetScopesBYId(scopId)
      if (response.status === 200) {
        setEditData(response?.data?.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    FetchScopeById()
  }, [scopId])

  const onSubmitScope = async data => {
    const formData = {
      ...data,
      _method: 'PUT',
      categories: data.categories.map(category => ({
        ...category,
        groups: category.groups.map(group => ({
          ...group,
          sagments: group.sagments.map(segment => ({
            ...segment,
            option: segment.option.map(opt => opt.value)
          }))
        }))
      }))
    }

    try {
      const response = await BudgetScopeService.UpdateScopesById(
        scopId,
        formData
      )
      if (response.status === 200) {
        successMessage({ description: 'Scope Update Successfully' })
        router.push(`/dashboard/settings/budget-book-setting/scopelist`)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Scope' />
        <Button
          className='site-button'
          onClick={() =>
            router.push(`/dashboard/settings/budget-book-setting/scopelist`)
          }
        >
          All Scope
        </Button>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitScope)}>
          <Scope form={form} />
          <div className='mt-4 flex justify-end gap-4'>
            <Button type='submit' className='site-button'>
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default EditScope
