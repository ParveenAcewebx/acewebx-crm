'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'

import { Loader2 } from 'lucide-react'

const DocumentView = ({ isOpen, onClose, url ,loading}) => {
  

  const fullUrl = url ? decodeURIComponent(`${process.env.NEXT_PUBLIC_API_URL}${url}`) : ''
  const fileExtension = url?.split('.').pop()?.toLowerCase()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-[1000px]">
        <DialogTitle>Document Preview</DialogTitle>
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
            </div>
          ) : url ? (
            fileExtension === 'pdf' ? (
              <iframe
                src={fullUrl}
                width="100%"
                height="600px"
                title="PDF Preview"
              />
            ) : fileExtension === 'docx' ? (
              <div className="text-center space-y-4">
                <p className="text-gray-600">.docx preview not supported in-browser.</p>
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600"
                >
                  Download Document
                </a>
              </div>
            ) : (
              <p className="text-red-500">Unsupported file format.</p>
            )
          ) : (
            <p>No document URL provided.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DocumentView
