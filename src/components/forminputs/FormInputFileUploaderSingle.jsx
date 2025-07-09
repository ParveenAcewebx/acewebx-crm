import React, { useCallback } from 'react'

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'

// React Hook Form
import { Controller } from 'react-hook-form'

// Dropzone & Toast
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

const FormInputFileUploaderSingle = ({ name, control, label, errors, className }) => {
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

      const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxSize: 15 * 1024 * 1024, // 15 MB
        accept: {
          'application/pdf': ['.pdf'],
        },
        onDrop,
        onDropRejected: () => {
          toast.error('Only 1 file allowed. Max size 15 MB.', {
            autoClose: 3000
          })
        }
      })

      const renderPreview = file => {
        if (!file) return null

        return (
          <List sx={{ mt: 2 }} className='border border-gray-600 rounded-md'>
            <ListItem 
              secondaryAction={
                <IconButton edge='end' onClick={handleRemove}>
                  <i className='ri-close-line text-xl' />
                </IconButton>
              }
            >
              <div className='file-details flex gap-3 items-center '>
                {file.type.startsWith('image/') ? (
                  <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
                ) : (
                  <i className='ri-file-text-line text-2xl' />
                )}
                <div>
                  <Typography>{file.name}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </div>
              </div>
            </ListItem>
          </List>
        )
      }

      return (
        <div style={{ border: '2px gray' }}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className={className}>
              <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
                <i className='ri-upload-2-line' />
              </Avatar>
              <Typography variant='h6' className='mbe-2.5'>
                {label || 'Drop a file here or click to upload.'}
              </Typography>
              <Typography color='text.secondary'>Allowed: PDF (max 15 MB)</Typography>
              {errors?.[name] && (
                <Typography className='!text-red-600' color='error' sx={{ mt: 1 }}>
                  {errors[name].message}
                </Typography>
              )}
            </div>
          </div>

          {value && renderPreview(value)}
        </div>
      )
    },
    [errors, label, name]
  )

  return <Controller name={name} control={control} defaultValue={null} render={({ field }) => renderDropzone(field)} />
}

export default FormInputFileUploaderSingle
