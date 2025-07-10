import BudgetScopeService from '@/services/BudgetBook/Budget-scope-api'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import GroupField from './GroupField'
const Scope = ({ form }) => {
  const [getCat, setCat] = useState([])
  const { control } = form
  const {
    fields: categories,
    append: appendCategory,
    remove: removeCategory
  } = useFieldArray({
    control,
    name: 'categories'
  })
  const defaultCategoryRow = {
    title: '',
    groups: []
  }
  const handleAppendCategory = () => {
    appendCategory(defaultCategoryRow)
  }
  /// delete row handler
  const deleteRowCategory = catindex => {
    removeCategory(catindex)
  }
  const getCategory = async () => {
    try {
      const response = await BudgetScopeService.GetAllCategory()
      console.log('response111--00', response)
      if (response.status === 200) {
        setCat(response?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }
  console.log('getCa11111111111t', getCat)
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <FormInputField
          forml={form}
          name='title'
          label='Title'
          placeholder='Enter Title'
        />
        <FormInputField
          forml={form}
          name='short_title'
          label='Short Title'
          placeholder='Enter Short Title'
        />
        <FormSelectField
          forml={form}
          name='status'
          label='Scope Status'
          placeholder='Select Scope Status'
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inActive', label: 'In Active' }
          ]}
        />
        <FormSelectField
          forml={form}
          name='category'
          label='Category'
          placeholder='Select Category'
          options={
            getCat.length > 0
              ? getCat.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
      </div>
      {categories.map((item, catindex) => (
        <>
          <div className='add-fileds mb-2 mt-5 flex gap-2'>
            <FormInputField
              form={form}
              name={`categories.${catindex}.title`}
              label='Category Name'
              placeholder='Enter Category Name'
            />
            <Button
              type='button'
              variant='ghost'
              className='mt-10 h-6 w-6'
              onClick={() => deleteRowCategory(catindex)}
            >
              <Trash2 className='h-4 w-4 text-red-500' />
            </Button>
          </div>
          <GroupField catindex={catindex} form={form} />
        </>
      ))}
      <Separator className='mt-4' />
      <div className='mt-3'>
        <Button
          type='button'
          onClick={handleAppendCategory}
          className='site-button-small text-white'
        >
          Add Category
        </Button>
      </div>
    </>
  )
}
export default Scope
