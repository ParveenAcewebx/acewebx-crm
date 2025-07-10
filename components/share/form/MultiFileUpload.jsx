'use client'

import { successMessage } from '@/components/ToasterMessage'
import api from '@/lib/api'
import { Upload } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const MultiImageUploader = ({ setImageUpload, updateImage }) => {
  const [files, setFiles] = useState([])
  const [finalUpdatedImg, setFinalUpdatedImg] = useState(updateImage)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      const updatedFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
      const newFiles = [...files, ...updatedFiles]
      setFiles(newFiles)
      setImageUpload(newFiles)
    }
  })

  const removeFile = useCallback(name => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => file.name !== name)
      prevFiles.forEach(file => {
        if (!updatedFiles.some(f => f.preview === file.preview)) {
          URL.revokeObjectURL(file.preview)
        }
      })
      return updatedFiles
    })
  }, [])
  // const imagedeleteHandler = (e, id) => {
  //   e.preventDefault()
  //   setFinalUpdatedImg(prev => prev.filter(img => img.id !== id))
  //   successMessage({ description: 'Image removed from view (not deleted from server).' })
  // }
  
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
        {files.length > 0 && <span className='w-full font-semibold'>New Images</span>}
        <div className='!mb-4 grid grid-cols-4 gap-4'>
          {files.map(file => (
            <div
              key={file.name}
              className='relative flex w-full items-center justify-between rounded-md border bg-white p-2'
            >
              {file.type.startsWith('image') && (
                <img
                  src={file.preview}
                  alt={file.name}
                  className='h-10 w-10 rounded object-cover'
                />
              )}
              <div className='ml-2 flex-1'>
                <p className='!m-0 !line-clamp-1 !w-fit !border-0 !p-0 text-sm font-medium'>
                  {file.name}
                </p>
                <p className='text-xs text-gray-500'>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type='button'
                className='close-icon absolute w-5 rounded-full bg-red-500 text-sm font-medium text-white'
                onClick={() => removeFile(file.name)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {finalUpdatedImg?.length > 0 && <span className='w-full font-semibold'>Old Images</span>}
        <div className='grid grid-cols-4 gap-4'>
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
                <p className='!m-0 !line-clamp-1 !w-fit !border-0 !p-0 text-sm font-medium'>
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

export { MultiImageUploader }
