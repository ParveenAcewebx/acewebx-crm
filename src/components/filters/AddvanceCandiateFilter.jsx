import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import FormInputSelect from '../forminputs/FormInputSelect'
import { designationOptions, preferredShiftOptions } from '../constants/StaticData'
import FormInput from '../forminputs/FormInput'
import FormMobileDatePicker from '../forminputs/FormMobileDatePicker'

export default function AddvanceCandiateFilter({ handleClickOpen, handleClose, open,onSubmit,form }) {
  

  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='filter-dialog-title'
      aria-describedby='filter-dialog-description'
      PaperProps={{
        style: {
          width: '90%',
          maxWidth: '600px'
        }
      }}
    >
      <DialogActions className='justify-end'>
        <Button onClick={handleClose} className='!text-xl !font-bold !text-gray-600'>
          ✕
        </Button>
      </DialogActions>

      <DialogContent>
        <DialogContentText id='filter-dialog-description'>
          <form encType='multipart/form-data' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
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

            <div className='flex justify-end'>
              <Button type='submit' variant='contained' className='!bg-[#8C57FF] !text-white'>
                Submit
              </Button>
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
