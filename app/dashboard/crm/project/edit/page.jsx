'use client'
import LayoutHeader from '@/components/layoutHeader'
import ProjectFields from '@/components/Project/ProjectFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import { ProjectService } from '@/services/Crm/project'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditProject = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const form = useForm()
  const router = useRouter()
  const [imageUpload, setImageUpload] = useState(null)
  const [updateImage, setUpdateImage] = useState([])
  const fetProjectById = async () => {
    try {
      const response = await ProjectService.GetProjectBYId(id)
      if (response?.status == 200) {
        const data = response?.data?.data
        const mappedImages = data.projectAttechment?.map(file => ({
          id: file.id,
          image: file.filePath // replace with your actual path
        }))
        const formattedData = {
          ...data,
          projectName: data?.name,
          engineer: String(data?.engineer),
          architecture: String(data?.architecture),

          projectTags: JSON.parse(data?.projectTags),
          projectType: JSON.parse(data?.projectType),
          projectAttachmentUrls: data?.projectAttachmentUrls
        }
        setUpdateImage(mappedImages)

        form.reset(formattedData)
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetProjectById()
  }, [])

  const onSubmitProject = async data => {
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
    formData.append('units', data.units)
    formData.append('address', data.address)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('zip', data.zip)
    formData.append('projectStatus', data.projectStatus)
    formData.append('grossSqft', data.grossSqft)
    formData.append('projectData', data.projectData)
    formData.append('projectManager', Number(data.projectManager))
    formData.append('projectTags', JSON.stringify(data.projectTags))
    formData.append('projectType', JSON.stringify(data.projectType))
    formData.append(
      'projectAttachmentUrls',
      JSON.stringify(data.projectAttachmentUrls.map(item => item.url))
    )
    formData.append('projectValue', data.projectValue)
    formData.append('estimatedValue', data.estimatedValue)
    formData.append('description', data.description)
    formData.append('start_date', formatDateForMySQL(data.start_date))
    formData.append('end_date', formatDateForMySQL(data.end_date))
    formData.append('engineer', Number(data.engineer))
    formData.append('architecture', Number(data.architecture))
    formData.append('_method', 'PUT')
    formData.append('id', id)

    try {
      const response = await ProjectService.UpdateProjectById(id, formData)

      if (response?.status == 200) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/crm/project')
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Edit Project' />
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
            setImageUpload={setImageUpload}
            updateImage={updateImage}
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
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default EditProject
