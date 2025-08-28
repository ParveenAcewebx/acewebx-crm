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
import { preferredShiftOptions } from '../constants/StaticData'
import { Label } from '../ui/label'
import { startOfWeek, endOfWeek, subDays } from 'date-fns'
import { YearRangInput } from '../share/form/YearRangInput'
import { useEffect } from 'react'

const AddvanceFilterDeveloper = ({ isOpen, onClose, handleAddvanceSearch, skillsData, oldSerachParams = {} }) => {
  const today = new Date()
  const startOfLastWeek = subDays(startOfWeek(today), 7)
  const endOfLastWeek = subDays(endOfWeek(today), 7)
  const form = useForm({
    defaultValues: {
      dob: {
        startDate: startOfLastWeek,
        endDate: endOfLastWeek,
        key: 'selection'
      },
      lastContected: {
        startDate: "",
        endDate: "",
        key: 'selection'
      },

      preferredShift: [],
      skill: [],
      totalExperience: "",
    }
  })


  // useEffect(() => {
  //   if (!oldSerachParams) return;

  //   const safeParse = (value) => {
  //     try {
  //       return typeof value === "string" ? JSON.parse(value) : value;
  //     } catch {
  //       return [];
  //     }
  //   };

  //   const oldData = {
  //     dob: {
  //       startDate: oldSerachParams?.startDate
  //         ? new Date(oldSerachParams.startDate)
  //         : null,
  //       endDate: oldSerachParams?.endDate
  //         ? new Date(oldSerachParams.endDate)
  //         : null,
  //     },
  //     lastContected: {
  //       startDate: oldSerachParams?.connectStartDate
  //         ? new Date(oldSerachParams.connectStartDate)
  //         : null,
  //       endDate: oldSerachParams?.connectEndDate
  //         ? new Date(oldSerachParams.connectEndDate)
  //         : null,
  //     },
  //     salary: [
  //       oldSerachParams?.minSalary ? Number(oldSerachParams.minSalary) : null,
  //       oldSerachParams?.maxSalary ? Number(oldSerachParams.maxSalary) : null,
  //     ],
  //     totalExperience: [
  //       oldSerachParams?.minExperience
  //         ? Number(oldSerachParams.minExperience)
  //         : null,
  //       oldSerachParams?.maxExperience
  //         ? Number(oldSerachParams.maxExperience)
  //         : null,
  //     ],
  //     skill: safeParse(oldSerachParams?.skill) || [],
  //     preferredShift: safeParse(oldSerachParams?.preferredShift) || [],
  //   };

  //   form.reset(oldData);
  // }, []);



  const handleDateChnage = (date) => {
    console.log("valuedate", date)
  }

  const clearFilter = (e) => {
    e.preventDefault()
    form.setValue("preferredShift", "")
    form.setValue("lastContected", "")
    form.setValue("totalExperience", "")
    form.setValue("skill", "")

  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent className="!top-4 !translate-y-0 w-full max-w-[40vw]"
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
              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1 mt-2'>
                <Label className=''>Application Submitted Date</Label>
                <FormDateRangePicker
                  name='dob'
                  label='D.O.B '
                  onChange={handleDateChnage}
                  form={form}
                  inputFormat='YYYY-MM-DD'
                  className='datepickerouter'

                />


                <FormMultiSelectField
                  name="skill"
                  form={form}
                  label="Skills"
                  options={skillsData}
                  placeholder="Enter Your Skills"
                  className="mt-2"
                />
              </div>
              {/* salary range */}

              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <SalaryRangInput form={form} name="salary" label="Salary" />
              </div>

              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <YearRangInput form={form} name="totalExperience" label="Total Experience" />
              </div>
              <div className='mb-4 grid grid-cols-2 gap-6 md:grid-cols-2'>
                <FormMultiSelectField
                  name='preferredShift'
                  label='Preferred Shift'
                  form={form}
                  options={preferredShiftOptions}
                  className='colum-box-bg-change !w-[100%]'
                />
                <div>
                  {/* Daten lastContected */}
                  <Label>Last Contacted</Label>
                  <FormDateRangePicker
                    name='lastContected'
                    label='Last Contected'
                    onChange={handleDateChnage}
                    form={form}
                    inputFormat='YYYY-MM-DD'
                    className='datepickerouter'

                  />
                </div>
              </div>


              <div className="flex justify-between items-center gap-4 mt-4">
                <Button className="site-button" variant="outline" onClick={(e) => clearFilter(e)}>
                  Clear
                </Button>
                <Button type="submit" className="site-button">
                  Search
                </Button>
              </div>

            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddvanceFilterDeveloper
