import { Edit } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { ProjectService } from '@/services/Crm/project'

import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import { ProjectType } from '../static-Values'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

const ProjectData = ({ editData, fetchLeadById }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm({
    defaultValues: {
      projectType: (() => {
        try {
          return JSON.parse(editData?.project?.projectType || '[]')
        } catch {
          return []
        }
      })(),
      units: editData?.project?.units || ''
    }
  })

  const onSubmitProject = async data => {
    const formData = new FormData()

    if (data.projectFile && data.projectFile[0]) {
      formData.append('projectFile', data.projectFile[0])
    }
    formData.append('projectName', editData?.project?.name)
    formData.append('units', data.units)
    formData.append('projectType', JSON.stringify(data.projectType))
    formData.append('_method', 'PUT')
    formData.append('id', editData?.project?.id)

    try {
      const response = await ProjectService.UpdateProjectById(
        editData?.project?.id,
        formData
      )

      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        setOpenDialog(false)
        fetchLeadById()
      }
    } catch (error) {
      console.error('Update error:', error)
    }
  }

  const handleEditCost = () => {
    form.reset({
      projectType: (() => {
        try {
          return JSON.parse(editData?.project?.projectType || '[]')
        } catch {
          return []
        }
      })(),
      units: editData?.project?.units || ''
    })
    setOpenDialog(true)
  }

  return (
    <>
      <CardHeader className='theme-bg-light-rgba min-h-14 !p-0'>
        <CardTitle className='border-color-grey flex justify-between gap-4 border-b p-3'>
          <div className='!text-lg'>Project Data</div>
          <Button onClick={handleEditCost} className='h-8 w-8 rounded-full'>
            <Edit className='h-5 w-5 text-white' />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='flex justify-between border-b border-solid p-3'>
          <CardDescription className='text-sm'># BLDGS</CardDescription>
          <CardContent className='text-dark-color p-0 text-sm font-medium'>
            {editData?.budgetBookProject?.bldg_count}
          </CardContent>
        </div>
        <div className='flex justify-between border-b border-solid p-3'>
          <CardDescription className='text-sm'>TSQFT</CardDescription>
          <CardContent className='text-dark-color p-0 text-sm font-medium'>
            {editData?.budgetBookProject?.bldg_gsqft}
          </CardContent>
        </div>
        <div className='flex justify-between border-b border-solid p-3'>
          <CardDescription className='text-sm'># Units</CardDescription>
          <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
            {editData?.project?.units}
          </CardContent>
        </div>
        <div className='flex justify-between border-b border-solid p-3'>
          <CardDescription className='text-sm'>Project Type</CardDescription>
          <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
            {(() => {
              try {
                const types = JSON.parse(
                  editData?.project?.projectType || '[]'
                )
                return Array.isArray(types) ? types.join(', ') : ''
              } catch {
                return ''
              }
            })()}
          </CardContent>
        </div>
      </CardContent>

      <Dialog
        open={openDialog}
        onOpenChange={isOpen => {
          setOpenDialog(isOpen)
        }}
      >
        <DialogContent className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'>
          <DialogHeader>
            <DialogTitle>Update Project Data</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmitProject)}>
              <FormMultiSelectField
                form={form}
                name='projectType'
                label='Project Type'
                placeholder='Enter Project Type'
                options={ProjectType}
              />
              <FormInputField
                form={form}
                name='units'
                label='Units'
                type='number'
                placeholder='Enter Units'
              />
              <div className='mt-4 flex justify-end'>
                <Button type='submit' className='site-button'>
                  Update
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProjectData
