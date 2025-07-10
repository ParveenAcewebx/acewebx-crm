'use client'
import AddContractForm from '@/components/Contract/AddContractForm'
import LayoutHeader from '@/components/layoutHeader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddContract() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      id: '',
      name: ''
    }
    // resolver: yupResolver(ContactSchema)
  })
  const handlePipelineSubmit = async data => {
    console.log('data-pipeeline', data)
    // try {

    //   const response = await ContractServices.AddContracts(formData)
    //   successMessage({ description: response?.data?.message })
    //   router.push('/dashboard/crm/contact')
    // } catch (error) {
    //   errorMessage({
    //     description:
    //       error?.response?.data?.message ||
    //       'Submission failed. Please try again.'
    //   })
    // }
  }
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Contract'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handlePipelineSubmit)}>
          <AddContractForm form={form} />
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
