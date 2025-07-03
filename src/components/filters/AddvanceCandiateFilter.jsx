import * as React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import FormInputSelect from '../forminputs/FormInputSelect'
import { designationOptions, preferredShiftOptions } from '../constants/StaticData'
import FormInput from '../forminputs/FormInput'
import FormMobileDatePicker from '../forminputs/FormMobileDatePicker'

export default function AddvanceCandiateFilter({ handleClickOpen, handleClose, open, onSubmit, form }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='filter-dialog-title'
      PaperProps={{
        style: {
          width: '90%',
          maxWidth: '600px',
          borderRadius: '1rem',
          padding: '1rem'
        }
      }}
    >
      {/* Title + Close Button in One Row */}
      <div className='flex justify-between items-center px-3 pt-2 pb-0'>
        <DialogTitle id='filter-dialog-title' className='pl-3 text-xl font-semibold text-[#333]'>
          Advance Candidate Filter
        </DialogTitle>
        <Button
          onClick={handleClose}
          className='!text-gray-500 pr-3-3 !text-2xl !font-bold hover:!text-red-500 transition-all min-w-[unset]'
        >
          ✕
        </Button>
      </div>

      <DialogContent className='pt-4'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormInput
              name='minSalary'
              label='Min Salary'
              control={form.control}
              errors={form.errors}
              inputType='text'
            />
            <FormInput
              name='maxSalary'
              label='Max Salary'
              control={form.control}
              errors={form.errors}
              inputType='text'
            />
            <FormMobileDatePicker
              name='startDate'
              label='Start Date'
              control={form.control}
              inputFormat='YYYY-MM-DD'
              errors={form.errors}
            />
            <FormMobileDatePicker
              name='endDate'
              label='End Date'
              control={form.control}
              inputFormat='YYYY-MM-DD'
              errors={form.errors}
            />
            <FormInputSelect
              name='Skill'
              label='Skill'
              control={form.control}
              errors={form.errors}
              options={designationOptions}
            />
            <FormInputSelect
              name='preferredShift'
              label='Preferred Shift'
              control={form.control}
              errors={form.errors}
              options={preferredShiftOptions}
            />
          </div>

          <div className='flex justify-end pt-4'>
            <Button
              type='submit'
              variant='contained'
              className='!bg-[#8C57FF] !text-white !rounded-xl px-6 py-2 shadow-md hover:!bg-[#7a45f3] transition-all'
            >
              Apply Filter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
