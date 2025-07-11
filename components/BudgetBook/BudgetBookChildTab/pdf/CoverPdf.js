'use client'
import { formatDate } from '@/components/utils/dateFormat'
import api from '@/lib/api'
import { useSession } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const CoverPdf = ({ newQuoteData }) => {
  const pathName = usePathname()
  const currentPath = pathName == '/quotes-preview/preview'
  console.log('currentPathcurrentPathcurrentPathcurrentPath', currentPath)

  console.log('newDATAAAAAAAAAA', newQuoteData)
  const searchParams = useSearchParams()
  const encryptedId = searchParams.get('id')
  const { data: session } = useSession()
  const [list, setList] = useState({ budgetHistory: [] })

  const fetchCoverData = async () => {
    try {
      const response =
        currentPath == true
          ? await api.get(`/projects-budget-history/${encryptedId}`)
          : await api.get(`/projects/budget-history/${encryptedId}`)
      if (response?.status === 200) {
        const data = response?.data?.data?.budgetHistory || []
        const filteredData = data.filter(item => item?.revision_status == 1)
        setList(filteredData)
      }
    } catch (err) {
      console.error('Error fetching budget history:', err)
    }
  }

  useEffect(() => {
    if (encryptedId) {
      fetchCoverData()
    }
  }, [encryptedId])

  const handlePrint = () => {
    window.print()
  }

  return (
    <table
      cellPadding='0'
      cellSpacing='0'
      border='0'
      style={{
        width: '100%',
        fontFamily: 'Arial, sans-serif',
        margin: '0 auto'
      }}
    >
      <tbody>
        <tr>
          <td colSpan={2} style={{ paddingBottom: '10px' }}>
            <table style={{ width: '100%' }}>
              <tbody />
            </table>
          </td>
        </tr>

        <tr style={{ backgroundColor: '#00b1de' }}>
          <td
            colSpan={2}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #000'
            }}
          >
            <table
              style={{
                width: '100%',
                fontFamily: 'Arial, sans-serif',
                fontSize: '13px',
                borderCollapse: 'collapse',
                lineHeight: '1.2'
              }}
            >
              <thead style={{ backgroundColor: '#00b1de' }}>
                <tr>
                  <th
                    style={{
                      width: '3%',
                      padding: '4px',
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}
                  >
                    REV
                  </th>
                  <th
                    style={{
                      width: '10%',
                      padding: '4px',
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}
                  >
                    QUOTE DATE
                  </th>
                  <th
                    style={{
                      width: '10%',
                      padding: '4px',
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}
                  >
                    PLAN DATE
                  </th>
                  <th
                    style={{
                      width: '10%',
                      padding: '4px',
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}
                  >
                    PLAN STATUS
                  </th>
                  <th
                    style={{
                      width: '20%',
                      padding: '4px',
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}
                  >
                    DESCRIPTION
                  </th>
                </tr>
              </thead>
            </table>
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <table
              width='100%'
              cellPadding='0'
              cellSpacing='0'
              border='0'
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '13px',
                borderCollapse: 'collapse',
                lineHeight: '1.2'
              }}
            >
              <tbody>
                {list?.length > 0 ? (
                  list?.map((row, idx) => (
                    <tr key={idx}>
                      <td
                        style={{
                          border: '1px solid #000',
                          padding: '4px',
                          verticalAlign: 'top',
                          width: '3%'
                        }}
                      >
                        {row?.id || '-'}
                      </td>
                      <td
                        style={{
                          border: '1px solid #000',
                          padding: '4px',
                          verticalAlign: 'top',
                          width: '10%'
                        }}
                      >
                        {formatDate(row?.quote_date)}
                      </td>
                      <td
                        style={{
                          border: '1px solid #000',
                          padding: '4px',
                          verticalAlign: 'top',
                          width: '10%'
                        }}
                      >
                        {formatDate(row?.plan_date)}
                      </td>

                      <td
                        style={{
                          border: '1px solid #000',
                          padding: '4px',
                          verticalAlign: 'top',
                          width: '10%'
                        }}
                      >
                        {row?.plan_status || '-'}
                      </td>
                      <td
                        style={{
                          border: '1px solid #000',
                          padding: '4px',
                          verticalAlign: 'top',
                          width: '20%'
                        }}
                      >
                        {row?.plan_note || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      style={{
                        border: '1px solid #000',
                        padding: '4px',
                        verticalAlign: 'top',
                        width: '3%'
                      }}
                    >
                      {newQuoteData?.id || '-'}
                    </td>
                    <td
                      style={{
                        border: '1px solid #000',
                        padding: '4px',
                        verticalAlign: 'top',
                        width: '10%'
                      }}
                    >
                      {formatDate(newQuoteData?.quoteDate) || '-'}
                    </td>
                    <td
                      style={{
                        border: '1px solid #000',
                        padding: '4px',
                        verticalAlign: 'top',
                        width: '10%'
                      }}
                    >
                      {formatDate(newQuoteData?.planDate) || '-'}
                    </td>
                    <td
                      style={{
                        border: '1px solid #000',
                        padding: '4px',
                        verticalAlign: 'top',
                        width: '10%'
                      }}
                    >
                      {newQuoteData?.plan_status || '-'}
                    </td>
                    <td
                      style={{
                        border: '1px solid #000',
                        padding: '4px',
                        verticalAlign: 'top',
                        width: '20%'
                      }}
                    >
                      {newQuoteData?.planNotes || '-'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CoverPdf
