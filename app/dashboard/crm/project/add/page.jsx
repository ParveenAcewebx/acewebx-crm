'use client'
import { ProjectValidation } from '@/components/form-validations/projectValidation'
import LayoutHeader from '@/components/layoutHeader'
import ProjectFields from '@/components/Project/ProjectFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import { ProjectService } from '@/services/Crm/project'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const AddProject = () => {
  const form = useForm({
    resolver: yupResolver(ProjectValidation),
    defaultValues: {
      projectAttachmentUrls: [{ url: '' }]
    }
  })
  const [imageUpload, setImageUpload] = useState(null)

  const router = useRouter()
  const onSubmitProject = async data => {
    console.log('myyyy', data)

    const formData = new FormData()

    // Append the file (assuming single file)
    if (Array.isArray(imageUpload)) {
      imageUpload.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`projectFile[${index}][file]`, file)
        }
      })
    }

    // Append other fields
    formData.append('projectName', data.projectName)
    formData.append('address', data.address)
    formData.append('units', data.units)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('zip', data.zip)
    formData.append(
      'projectAttachmentUrls',
      JSON.stringify(data.projectAttachmentUrls.map(item => item.url))
    )
    formData.append('projectStatus', data.projectStatus)
    formData.append('grossSqft', data.grossSqft)
    formData.append('projectManager', Number(data.projectManager))
    formData.append('projectTags', JSON.stringify(data.projectTags))
    formData.append('projectType', JSON.stringify(data.projectType))
    formData.append('projectValue', data.projectValue)
    formData.append('estimatedValue', data.estimatedValue)
    formData.append('description', data.description)
    formData.append('start_date', formatDateForMySQL(data.start_date))
    formData.append('end_date', formatDateForMySQL(data.end_date))
    formData.append('engineer', Number(data.engineer))
    formData.append('architecture', Number(data.architecture))

    try {
      const response = await ProjectService.AddProject(formData)
      if (response?.status == 200) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/crm/project')
      }
    } catch (error) {
      console.log('response?.data?.message ', error?.response?.data?.message)
    }
  }
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Add Project' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/crm/project`)}
        >
          Project List
        </Button>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitProject)}>
          <ProjectFields
            form={form}
            updateImage={[]}
            setImageUpload={setImageUpload}
          />
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

export default AddProject
