'use client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { FormDateRangePicker } from '../share/form/DateRangePicker'
import { SalaryRangInput } from '../share/form/SalaryRangInput'

const AddvanceFilterDeveloper = ({ isOpen, onClose, dcsValue, getListLeads,handleAddvanceSearch }) => {
  const form = useForm({
    defaultValues: {
        dateRange: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      }
  })
const handleDateChnage =(date)=>{
    console.log("valuedate" , date)
}
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogTitle>Addvance Search</DialogTitle>
        <div>
          <FormProvider {...form}>
            <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit(handleAddvanceSearch)()
              }}
            >

{/* Daten range */}
                <FormDateRangePicker
                  name='dob'
                  label='D.O.B '
                  onChange={handleDateChnage}
                  form={form}
                  inputFormat='YYYY-MM-DD'
                  className='datepickerouter'
                
                />
{/* salary range */}
                <SalaryRangInput form={form} name="salary" label="Salary"  />

              <Button type='submit' className='site-button mt-4'>Search</Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddvanceFilterDeveloper
