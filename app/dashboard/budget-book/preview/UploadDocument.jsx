import { Button } from '@/components/ui/button'

const UploadedDocument = ({ newData }) => {
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: 'cors' })
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.click()
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  return (
    <div className='space-y-4'>
      {/* <h2 className='text-lg font-semibold text-gray-800'>Document</h2> */}

      {newData?.uploadDocument?.length > 0 ? (
        <div className='overflow-x-auto'>
          <table className='w-full table-auto border border-[#00b1de] text-sm'>
            <thead className='bg-[#00b1de]'>
              <tr>
                <th className='border border-[#00AEEF] px-4 py-2 text-left'>
                  #
                </th>

                <th className='border border-[#00AEEF] px-4 py-2 text-left'>
                  Name
                </th>
                <th className='border border-[#00AEEF] px-4 py-2 text-left'>
                  Notes
                </th>
                <th className='border border-[#00AEEF] px-4 py-2 text-left'>
                  Type
                </th>
                <th className='border border-[#00AEEF] px-4 py-2 text-left'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {newData.uploadDocument.map((doc, index) => (
                <tr key={doc?.id || index} className='bg-white'>
                  <td className='border px-4 py-2'>{index + 1}</td>

                  <td className='border px-4 py-2'>
                    {doc?.file_name || `Document ${index + 1}`}
                  </td>
                  <td className='border px-4 py-2'>
                    {doc?.notes || 'No description available'}
                  </td>
                  <td className='border px-4 py-2'>
                    {doc?.type || 'Unknown Type'}
                  </td>
                  <td className='border px-4 py-2'>
                    <Button
                      type='button'
                      className='bg-[#00AEEF] text-white hover:bg-[#00AEEF]/90'
                      onClick={() =>
                        handleDownload(
                          doc?.file_path,
                          doc?.file_name || 'document'
                        )
                      }
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-sm italic text-gray-500'>
          No documents uploaded.
        </div>
      )}
    </div>
  )
}

export default UploadedDocument
