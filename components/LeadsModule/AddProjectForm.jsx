'use client'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import BudgetBooksServices from '../../services/BudgetBook/budgetBook'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormTextArea from '../share/form/TextArea'
import { errorMessage, successMessage } from '../ToasterMessage'


const AddProjectForm = ({ id, handleCloseDialog, getBudgetBooks }) => {
  useDocumentTitle('Add lead')
  const form = useForm({
    defaultValues: {
      projectName: ''
    }
  })
  const router = useRouter()

  function formatDateForMySQL(date) {
    console.log('date', date)
    const d = new Date(date)
    const pad = n => (n < 10 ? '0' + n : n)
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }
  
  const handleProjectSubmit = async data => {
    console.log('data--project--submit', data)
    try {
      const formData = new FormData()
      formData.append('projectName', data.projectName || '')
      formData.append('start_date', formatDateForMySQL(data?.start_date) || '')
      formData.append('end_date', formatDateForMySQL(data?.end_date) || '')
      formData.append('description', data.description || '')

      // Submit to API
      const response = await BudgetBooksServices.addbudgetBooks(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        if (id) {
          router.push(`/dashboard/leads/edit?id=${id}`)
        } else {
          router.push('/dashboard/leads/add')
        }
        form.reset()
      } else {
        errorMessage({
          description: response?.data?.message || 'Something went wrong.'
        })
      }
      handleCloseDialog(false)
      getBudgetBooks()
    } catch (error) {
      console.error('project submission error:', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  return (
    <>
      <div className='text-center !text-xl font-semibold'>Add Project</div>
      <FormProvider {...form}>
        <form
          id='modal-form'
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(handleProjectSubmit)()
          }}
          className='mt-5'
        >
          <FormInputField
            form={form}
            name='projectName'
            label='Project Name'
            placeholder='Enter Name'
          />
          <div className='mt-3 grid grid-cols-2 gap-4'>
            <FormDatePicker
              form={form}
              name='start_date'
              label='Start Date'
              // disabled={date =>
              //   date < new Date(new Date().setHours(0, 0, 0, 0))
              // }
            />
            <FormDatePicker
              form={form}
              name='end_date'
              label='End Date'
              // disabled={date =>
              //   date < new Date(new Date().setHours(0, 0, 0, 0))
              // }
            />
          </div>
          <FormTextArea form={form} name='description' label='Description' />
          <div className='mt-4 flex justify-end'>
            <Button type='submit' form='modal-form' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddProjectForm
