import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import FormSelectField from '../share/form/FormSelect'
import { Button } from '../ui/button'
import { Form } from '../ui/form'

const AddQuote = ({ editId }) => {
  const form = useForm()
  const watchQuote = form.watch('quoteName')
  const router = useRouter()

  // Sales Order Submit Handler to Sales order and budget book connnection
  const onSubmitSalesOrder = data => {
    const formData = {
      ...data,
      leadId: editId
    }
    if (watchQuote == 'budgetBook') {
      router.push(`/dashboard/budget-book/add?leadId=${editId}`)
    } else if (watchQuote == 'salesOrder') {
      router.push(`/dashboard/sales-order/add?leadId=${editId}`)
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitSalesOrder)}>
          <div className='grid grid-cols-1 gap-4'>
            <FormSelectField
              name='quoteName'
              label='Quote Name'
              placeholder='Select Quote Name'
              options={[
                { label: 'Budget Book', value: 'budgetBook' },
                { label: 'Sales Order', value: 'salesOrder' }
              ]}
            />
          </div>
          <Button type='submit' className='site-button submit mt-2 bg-white'>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

export default AddQuote
