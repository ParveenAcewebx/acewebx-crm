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
import SkillApi from '@/services/cadidateApis/settings/SkillApi'
import { useEffect, useState } from 'react'

const AddvanceFilterDeveloper = ({ isOpen, onClose, handleAddvanceSearch, skillsData }) => {
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

      preferredShift: [],
      skill: [],
      totalExperience: "",
      // lastContected: {
      //   startDate: startOfLastWeek,
      //   endDate: endOfLastWeek,
      //   key: 'selection'
      // }, 
    }
  })
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



  // fetch skill list
  // const fetchAllSkill = async () => {
  //   try {
  //     const response = await SkillApi.getAllSkillByType(CandidateType)
  //     if (response.status === 200) {
  //       const candidateOptions = response?.data?.data?.map((item) => ({
  //         label: item.title,
  //         value: item.title.toLowerCase(), // assuming you meant to use lowercase
  //       }));

  //       setSkillsData(candidateOptions);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllSkill()
  // }, [])

 
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
