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
import FormMultiSelectField from '../share/form/FormMultiSelect'
import { preferredShiftOptions, totalExperienceOptions } from '../constants/StaticData'
import { Label } from '../ui/label'

const AddvanceFilterDeveloper = ({ isOpen, onClose, search, dcsValue, getListLeads, handleAddvanceSearch }) => {
  const form = useForm({
    defaultValues: {
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      },
      preferredShift: [],
      totalExperience: "",
      lastContected: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      },
    }
  })
  const handleDateChnage = (date) => {
    console.log("valuedate", date)
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent className="!top-4 !translate-y-0 w-full"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
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
              <div>
                <Label className='mb-2'>Application Submitted Date</Label>

                <FormDateRangePicker
                  name='dob'
                  label='D.O.B '
                  onChange={handleDateChnage}
                  form={form}
                  inputFormat='YYYY-MM-DD'
                  className='datepickerouter'

                />
              </div>
              {/* salary range */}
              <SalaryRangInput form={form} name="salary" label="Salary" />
              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <FormMultiSelectField
                  name='preferredShift'
                  label='Preferred Shift'
                  form={form}
                  options={preferredShiftOptions}
                  className='colum-box-bg-change !w-[100%]'
                />
              </div>
              <div>
                {/* Daten lastContected */}
                <Label>Last Contected</Label>
                <FormDateRangePicker
                  name='lastContected'
                  label='Last Contected'
                  onChange={handleDateChnage}
                  form={form}
                  inputFormat='YYYY-MM-DD'
                  className='datepickerouter'

                />
              </div>
              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <FormMultiSelectField
                  name='totalExperience'
                  label='Total Experience'
                  form={form}
                  options={totalExperienceOptions}
                  className='colum-box-bg-change'
                /> </div>
              <Button type='submit' className='site-button mt-4'>Search</Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddvanceFilterDeveloper
