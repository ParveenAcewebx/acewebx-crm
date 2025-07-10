import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const FileUpload = ({ name, form, label, disable, className }) => {
  const [files, setFiles] = useState([]) // keep File objects
  const [previewUrls, setPreviewUrls] = useState([]) // keep preview URLs

  const handleFileChange = e => {
    const newFiles = Array.from(e.target.files)

    // Create preview URLs for new files
    const newPreviews = newFiles.map(file => ({
      id: `${file.name}-${Date.now()}`,
      url: URL.createObjectURL(file),
      file
    }))

    // Add to existing files
    setFiles(prev => [...prev, ...newPreviews.map(item => item.file)])
    setPreviewUrls(prev => [...prev, ...newPreviews])

    // Update react-hook-form field
    form.setValue(name, [...files, ...newPreviews.map(item => item.file)])
  }

  const removeFile = id => {
    setPreviewUrls(prev => prev.filter(item => item.id !== id))
    setFiles(prev => prev.filter((_, index) => previewUrls[index].id !== id))

    // Update react-hook-form field after removing
    const updatedFiles = files.filter(
      (_, index) => previewUrls[index].id !== id
    )
    form.setValue(name, updatedFiles)
  }

  return (
    <FormField
      control={form?.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <>
              <Input
                id={name}
                type='file'
                multiple
                disabled={disable}
                className={className}
                onChange={handleFileChange}
              />

              {previewUrls.length > 0 && (
                <div className='mt-2 flex flex-wrap gap-2'>
                  {previewUrls.map(item => (
                    <div key={item.id} className='relative'>
                      <img
                        src={item.url}
                        alt='Preview'
                        className='max-h-32 w-40 rounded border'
                      />
                      <button
                        type='button'
                        className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white'
                        onClick={() => removeFile(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FileUpload
