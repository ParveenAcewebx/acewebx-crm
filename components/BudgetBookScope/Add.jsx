'use client'
import BudgetScopeService from '@/services/BudgetBook/Budget-scope-api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { ScopeSchema } from '../form-validations/scopeSettings'
import LayoutHeader from '../layoutHeader'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import Scope from './Scope'

const Add = () => {
  const form = useForm({
    resolver: yupResolver(ScopeSchema)
  })
  const router = useRouter()
  const onSubmitScope = async data => {
    const formData = {
      ...data,
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

    console.log('formDataformData', formData)

    try {
      const response = await BudgetScopeService.AddScopes(formData)
      if (response.status === 200) {
        successMessage({ description: 'Scope Added Successfully' })
        router.push(`/dashboard/settings/budget-book-setting/scopelist`)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const handleBack = () => {
    router.push('/dashboard/settings/budget-book-setting/scopelist')
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Scope' />
        <Button
          className='site-button-dark'
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
            <Button
              onClick={handleBack}
              type='button'
              className='site-button bg-white'
            >
              Back
            </Button>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default Add
