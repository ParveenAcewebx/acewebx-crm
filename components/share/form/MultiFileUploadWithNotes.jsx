'use client'

import { DocumentTypes } from '@/components/static-Values'
import { successMessage } from '@/components/ToasterMessage'
import api from '@/lib/api'
import { Upload } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const MultiImageUploaderWithNotes = ({
  setImageUpload,
  updateImage,
  setFiles,
  files,
  setFileNotes,
  fileNotes,
  setFileTypes,
  fileTypes
}) => {
  const [finalUpdatedImg, setFinalUpdatedImg] = useState(updateImage)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      const updatedFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: `${file.name}-${Date.now()}`
        })
      )

      const newFiles = [...files, ...updatedFiles]
      setFiles(newFiles)
    }
  })

  // Combine notes & types
  useEffect(() => {
    const combined = files.map(file => ({
      file,
      note: fileNotes[file.id] || '',
      type: fileTypes[file.id] || '',
      displayToCustomer: 1
    }))
    setImageUpload(combined)
  }, [files, fileNotes, fileTypes])

  // remove image file
  const removeFile = useCallback(
    id => {
      setFiles(prevFiles => {
        const updatedFiles = prevFiles.filter(file => file.id !== id)

        const updatedNotes = { ...fileNotes }
        const updatedTypes = { ...fileTypes }
        delete updatedNotes[id]
        delete updatedTypes[id]

        setFileNotes(updatedNotes)
        setFileTypes(updatedTypes)

        return updatedFiles
      })
    },
    [fileNotes, fileTypes]
  )

  // note change
  const handleNoteChange = (fileId, note) => {
    setFileNotes(prev => ({ ...prev, [fileId]: note }))
  }

  // type change
  const handleTypeChange = (fileId, type) => {
    setFileTypes(prev => ({ ...prev, [fileId]: type }))
  }

  const imagedeleteHandler = async (e, id) => {
    e.preventDefault()
    try {
      const { data } = await api.delete(`workOrder/deleteImage?imageId=${id}`)
      if (data?.status) {
        setFinalUpdatedImg(data.data.getAllImages)
        successMessage({ description: 'Image has been deleted successfully.' })
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  useEffect(() => {
    setFinalUpdatedImg(updateImage)
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [updateImage])

  return (
    <div className='theme-bg-light-rgba mx-auto w-full rounded-sm border-2 border-dashed p-8'>
      <div {...getRootProps({ className: 'text-center cursor-pointer' })}>
        <input {...getInputProps()} />
        <>
          <h2 className='text-xl'>Drop your files here</h2>
          <p className='rounded-6 bg-white p-4 text-sm font-medium'>
            <Upload className='m-auto' /> Upload
          </p>
        </>
      </div>

      <div className='mt-4 space-y-2'>
        {files.length > 0 && (
          <span className='w-full font-semibold'>New Images</span>
        )}
        <div className='!mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {files.map(file => {
            if (!file?.id) return null 

            return (
              <div
                key={file?.id}
                className='relative flex w-full flex-col items-start rounded-md border bg-white p-2'
              >
                <div className='flex w-full items-center'>
                  {file?.preview && (
                    <img
                      src={file?.preview}
                      alt={file?.name}
                      className='h-10 w-10 rounded object-cover'
                    />
                  )}
                  <div className='ml-2 flex-1'>
                    <p className='text-sm font-medium'>{file?.name}</p>
                    <p className='text-xs text-gray-500'>
                      {(file?.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type='button'
                    className='close-icon absolute right-2 top-2 w-5 rounded-full bg-red-500 text-sm font-medium text-white'
                    onClick={() => removeFile(file?.id)}
                  >
                    ×
                  </button>
                </div>

                <select
                  className='mt-2 h-7 w-full rounded border bg-white px-2 text-sm'
                  value={fileTypes[file?.id] || ''}
                  onChange={e => handleTypeChange(file?.id, e.target.value)}
                >
                  <option value=''>Select type...</option>
                  {DocumentTypes.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <textarea
                  name='note'
                  type='text'
                  placeholder='Add note...'
                  className='mt-2 min-h-9 w-full rounded border px-2 py-1 text-sm'
                  value={fileNotes[file?.id] || ''}
                  onChange={e => handleNoteChange(file?.id, e?.target?.value)}
                />
              </div>
            )
          })}
        </div>

        {finalUpdatedImg?.length > 0 && (
          <span className='w-full font-semibold'>Old Images</span>
        )}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {finalUpdatedImg?.map(file => (
            <div
              key={file.id}
              className='relative flex w-full items-center justify-between rounded-md border bg-white p-2'
            >
              <img
                src={file.image}
                alt='Old Image'
                className='h-10 w-10 rounded object-cover'
              />
              <div className='ml-2 flex-1'>
                <p className='text-sm font-medium'>
                  {file.image?.split('/').pop()?.slice(-18)}
                </p>
              </div>
              <button
                type='button'
                className='close-icon absolute w-5 rounded-full bg-red-500 text-sm font-medium text-white'
                onClick={e => imagedeleteHandler(e, String(file.id))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { MultiImageUploaderWithNotes }
