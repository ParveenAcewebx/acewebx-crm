import { Button } from '@/components/ui/button'

const UploadDocumentDummy = ({ data }) => {
  console.log('attachment', data.project.projectAttechment)

  // Dummy data for 3 rows
  const dummyData = [
    {
      id: 1,
      file_name: 'Contract_Agreement.pdf',
      notes: 'Signed contract for project X',
      type: 'PDF',
      file_path: 'https://example.com/files/contract_agreement.pdf'
    },
    {
      id: 2,
      file_name: 'Project_Plan.docx',
      notes: 'Detailed project roadmap',
      type: 'Word',
      file_path: 'https://example.com/files/project_plan.docx'
    },
    {
      id: 3,
      file_name: 'Budget_Sheet.xlsx',
      notes: 'Financial projections 2025',
      type: 'Excel',
      file_path: 'https://example.com/files/budget_sheet.xlsx'
    }
    // Uncomment the below object to add a 4th row
    // {
    //   id: 4,
    //   file_name: 'Presentation.pptx',
    //   notes: 'Client pitch deck',
    //   type: 'PowerPoint',
    //   file_path: 'https://example.com/files/presentation.pptx',
    // },
  ]

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
    <div className='mt-4 space-y-4'>
      {/* <h2 className='text-lg font-semibold text-gray-800'>Document</h2> */}

      {data?.project?.projectAttechment?.length > 0 ? (
        <div className='overflow-x-auto'>
          <table className='w-full table-auto border border-[#00b1de] text-sm'>
            <thead className='bg-[#00b1de] !text-black'>
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
              {data?.project?.projectAttechment?.map((doc, index) => (
                <tr key={doc?.id || index} className='bg-white text-black'>
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

export default UploadDocumentDummy
