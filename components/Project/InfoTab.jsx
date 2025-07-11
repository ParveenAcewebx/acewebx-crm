import api from '@/lib/api'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import { MultiImageUploader } from '../share/form/MultiFileUpload'
import SelectFilter from '../share/form/SelectFilter'
import TextEditor from '../share/form/TextEditor'
import {
  projectManager,
  ProjectStatus,
  ProjectTags,
  ProjectType,
  State
} from '../static-Values'
import { Button } from '../ui/button'

const InfoTab = ({ form, updateImage, setImageUpload }) => {
  const [engineer, setEngineer] = useState([])
  const [company, setCompany] = useState([])
  const [zipCode, setZipCode] = useState([])

  // Initialize useFieldArray for projectAttachmentUrls
  // Initialize useFieldArray for projectAttachmentUrls with a single default field
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'projectAttachmentUrls'
  })

  // Fetch data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [companyRes, engRes, zipCodeRes] = await Promise.all([
          api.get('/companies'),
          api.get('/projects-companies'),
          api.get('taxes?limit=100')
        ])

        if (companyRes.status === 200) {
          const modifyProjectData = companyRes?.data?.data.map(item => ({
            label: item.name,
            value: String(item.id)
          }))
          setCompany(modifyProjectData)
        }
        if (engRes.status === 200) {
          const modifyProjectData = engRes?.data?.data.map(item => ({
            label: item.name,
            value: String(item.id)
          }))
          setEngineer(modifyProjectData)
        }
        if (zipCodeRes.status === 200) {
          const modifyProjectData = zipCodeRes?.data?.data.map(item => ({
            label: `${item.zipcode}`,
            value: String(item.id)
          }))
          setZipCode(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='projectName'
          label='Project Name'
          placeholder='Enter Project Name'
        />
        <SelectFilter
          form={form}
          name='projectStatus'
          label='Project Status'
          placeholder='Enter Project Status'
          options={ProjectStatus}
        />
      </div>
      <div className='mt-4 grid grid-cols-1'>
        <FormInputField
          form={form}
          name='address'
          label='Address'
          placeholder='Enter Address'
        />
      </div>
      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormInputField
          form={form}
          name='city'
          label='City'
          placeholder='Enter City'
        />
        <SelectFilter
          form={form}
          name='state'
          label='State'
          placeholder='Enter State'
          options={State}
        />
        <SelectFilter
          form={form}
          name='zip'
          label='Zip'
          placeholder='Zip'
          options={zipCode}
        />
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <SelectFilter
          form={form}
          name='engineer'
          label='Engineer'
          placeholder='Enter Engineer'
          options={engineer}
        />
        <SelectFilter
          form={form}
          name='architecture'
          label='Architect'
          placeholder='Enter Architect'
          options={company}
        />
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='grossSqft'
          label='Gross SQFT'
          placeholder='Enter Gross SQFT'
        />
        <FormMultiSelectField
          form={form}
          name='projectTags'
          label='Project Tags'
          placeholder='Enter Project Tags'
          options={ProjectTags}
        />
        <FormMultiSelectField
          form={form}
          name='projectType'
          label='Project Type'
          placeholder='Enter Project Type'
          options={ProjectType}
        />
        <SelectFilter
          form={form}
          name='projectManager'
          label='Project Manager'
          placeholder='Enter Project Manager'
          options={projectManager}
        />
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormDatePicker name='start_date' label='Start Date' />
        <FormDatePicker name='end_date' label='End Date' />
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Project Attachment URLs
          </label>

          {fields.map((field, index) => (
            <div key={field.id} className='mt-2 flex w-full items-center gap-2'>
              {/* <React.Fragment key={field.id}> */}
              <div className='w-full'>
                <FormInputField
                  form={form}
                  name={`projectAttachmentUrls.${index}.url`}
                  placeholder='Enter Project Attachment URL'
                  className='flex-1'
                  rules={{
                    required: 'URL is required',
                    pattern: {
                      value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
                      message: 'Enter a valid URL'
                    }
                  }}
                />
              </div>
              <Button
                type='button'
                variant='ghost'
                className='h-6 w-6 p-0'
                onClick={() => remove(index)}
              >
                <Trash2 className='h-4 w-4 text-red-500' />
              </Button>
            </div>
          ))}

          <Button
            type='button'
            onClick={() => append({ url: '' })}
            className='mt-2'
          >
            Add URL
          </Button>
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1'>
        <TextEditor
          form={form}
          name='description'
          label='Description'
          placeholder='Enter Description'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Project File
        </label>
        <MultiImageUploader
          updateImage={updateImage}
          setImageUpload={setImageUpload}
        />
      </div>
    </>
  )
}

export default InfoTab
