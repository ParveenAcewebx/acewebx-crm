
'use client'

import { Upload, X } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller } from 'react-hook-form'

const FormInputFileUploaderSingle = ({
  name,
  control,
  label,
  errors,
  className = '',
  form
}) => {
  const renderDropzone = useCallback(
    field => {
      const { onChange, value } = field

      const onDrop = acceptedFiles => {
        const file = acceptedFiles[0]
        if (file) {
          onChange(file)
        }
      }

      const handleRemove = () => {
        onChange(null)
      }

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxSize: 15 * 1024 * 1024, // 15 MB
        accept: {
          'application/pdf': ['.pdf'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            ['.docx']
        },
        onDrop,
        onDropRejected: () => {
          console.error('Only PDF/Docx file allowed. Max size 15 MB.')
        }
      })

      const renderPreview = file => {
        if (!file) return null

        const isBlob = file instanceof File
        const url = isBlob ? URL.createObjectURL(file) : file

        return (
          <div className='mt-4 space-y-2'>
            <div className='flex items-center justify-between rounded-md border bg-gray-50 p-3'>
              <div className='flex items-center gap-3'>
                <i className='ri-file-text-line text-2xl text-gray-700' />
                <div>
                  <p className='text-sm font-medium'>
                    {isBlob ? file.name : 'Resume'}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {isBlob && `${(file.size / 1024).toFixed(1)} KB`}
                  </p>
                </div>
              </div>
              <button
                type='button'
                onClick={handleRemove}
                className='text-red-600 hover:text-red-800'
              >
                <X className='h-4 w-4' />
              </button>
            </div>

            {/* View Resume link */}
            <button className='text-sm text-blue-600 underline'>
              {' '}
              <a href={url} target='_blank' rel='noopener noreferrer'>
                View Resume
              </a>
            </button>
          </div>
        )
      }

      return (
        <div>
          <div
            {...getRootProps()}
            className={`mt-6 flex cursor-pointer flex-col items-center justify-center space-y-3 rounded-md border-2 border-dashed border-gray-300 p-6 text-center transition hover:bg-gray-50 ${className}`}
          >
            <input {...getInputProps()} />
            <p className='rounded-6 bg-white p-4 text-sm font-medium'>
              <Upload className='m-auto' /> Upload
            </p>
            <p className='text-base font-medium text-gray-800'>
              {label || 'Drop Resume here or click to upload.'}
            </p>
            <p className='text-sm text-gray-500'>
              Allowed: PDF/Docx (max 15 MB)
            </p>
          </div>

          {form?.formState.errors?.[name] && (
            <p className='mt-2 text-sm text-red-600'>
              {form?.formState?.errors[name]?.message}
            </p>
          )}

          {value && renderPreview(value)}
        </div>
      )
    },
    [errors, label, name]
  )

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => renderDropzone(field)}
    />
  )
}

export default FormInputFileUploaderSingle
