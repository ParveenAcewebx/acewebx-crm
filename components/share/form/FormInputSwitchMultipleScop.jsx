'use client'

import { useFormContext, useWatch } from 'react-hook-form'

const FormScopeToggle = ({ scopeItem }) => {
  const { setValue } = useFormContext()
  const projectScopeIncludes = useWatch({ name: 'projectScopeIncludes' }) || []

  const categoryId = scopeItem?.budgetCategory?.id

  const currentItemIndex = projectScopeIncludes.findIndex(
    item => item.budget_category_id === categoryId
  )

  const currentItem =
    currentItemIndex !== -1
      ? projectScopeIncludes[currentItemIndex]
      : { budget_category_id: categoryId, is_include: 0, is_exclude: 0 }

  const updateValue = (key, value) => {
    const updatedItem = {
      ...currentItem,
      [key]: value ? 1 : 0
    }

    let updatedList = [...projectScopeIncludes]

    if (currentItemIndex !== -1) {
      updatedList[currentItemIndex] = updatedItem
    } else {
      updatedList.push(updatedItem)
    }

    setValue('projectScopeIncludes', updatedList)
  }

  return (
    <div className='flex items-center space-x-4'>
      {/* Include Checkbox */}
      <label className='flex items-center space-x-1'>
        <input
          type='checkbox'
          checked={!!currentItem.is_include}
          onChange={e => updateValue('is_include', e.target.checked)}
          className='h-4 w-4 border-gray-400'
        />
        {/* <span className='text-xs'>INC</span> */}
      </label>

      {/* Exclude Checkbox */}
      <label className='flex items-center space-x-1'>
        <input
          type='checkbox'
          checked={!!currentItem.is_exclude}
          onChange={e => updateValue('is_exclude', e.target.checked)}
          className='h-4 w-4 border-gray-400'
        />
        {/* <span className='text-xs'>EXC</span> */}
      </label>

      {/* Category Label */}
      <span className='text-sm font-medium'>
        {scopeItem?.budgetCategory?.catName}
      </span>
    </div>
  )
}

export default FormScopeToggle
