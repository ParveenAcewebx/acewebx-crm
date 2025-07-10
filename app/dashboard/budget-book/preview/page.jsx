/* eslint-disable @next/next/no-img-element */
'use client'
import BreakDown from '@/components/BudgetBook/BudgetBookChildTab/pdf/Breakdown'
import CoverPdf from '@/components/BudgetBook/BudgetBookChildTab/pdf/CoverPdf'
import NotesList from '@/components/Dashboardnotes/NotesList'
import Notes from '@/components/Dashboardnotes/Notex'
import { errorMessage } from '@/components/ToasterMessage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import api from '@/lib/api'
import BudgetBookService from '@/services/BudgetBook/budget-book-api'
import LeadsServices from '@/services/Leads/lead'
import { MessageCircleMore } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import UploadedDocument from './UploadDocument'

const QuotePreview = () => {
  const searchParams = useSearchParams()
  const encryptedId = searchParams.get('id')
  const [newData, setNewData] = useState({})
  const router = useRouter()
  const [newprojectContracts, setProjectContracts] = useState([])
  const [newprojectSubmittals, setProjectSubmittals] = useState([])
  const [newprojectKeyAreas, setProjectKeyAreas] = useState([])
  const [newprojectScopes, setProjectScopes] = useState([])
  const [notesData, setNotesData] = useState([])
  const [scopeData, setscopeData] = useState([])
  const [editData, setEditData] = useState([])
  const [selectdRevision, setSelectedRevision] = useState('')
  const [activeSection, setActiveSection] = useState('all') // Track active section
  const [isInclude, setisInclude] = useState('')
  const [isExclude, setIsExclude] = useState('')

  // Refs for scrolling to sections
  const quoteRef = useRef(null)
  const coverRef = useRef(null)
  const breakdownRef = useRef(null)
  const fileRef = useRef(null)

  const getInvoice = async () => {
    try {
      const response = selectdRevision
        ? await api.get(`/projects/budget-history/details/${selectdRevision}`)
        : await BudgetBookService.getBudgetById(encryptedId)
      const quoteData = selectdRevision
        ? response?.data?.data?.log?.data
        : response?.data?.data?.data
      console.log(
        'quoteDataquoteDataquoteDataquoteData',
        response?.data?.data?.log?.data
      )
      if (!quoteData) {
        console.error('No data received in quoteData')
        return
      }
      setEditData(quoteData?.projectScopes)
      const allCategories = quoteData?.projectScopes
        ?.flatMap(scope => scope?.categories || [])
        ?.filter(category => category)

      const invoiceData = {
        address: quoteData?.address || '',
        taxes: quoteData?.taxRate || '',
        total: quoteData?.price || '',
        quoteDate: quoteData?.quote_date || '',
        job: quoteData?.job_no || '',
        projectName: quoteData?.budgetBook?.name || '',
        engineer: quoteData?.engineer?.name || '',
        customer: quoteData?.customer?.name || '',
        planDate: quoteData?.plan_date || '',
        revisionInfo: '',
        scope: quoteData?.projectScopes,
        scopeIsInclude: quoteData?.projectScopeIncludes,
        planNotes: quoteData?.plan_note || '',
        grossSqft: quoteData?.bldg_gsqft || '',
        bldg: quoteData?.bldg_count,
        leadId: quoteData?.lead?.id,
        type: '',
        shipment_limit: quoteData?.shipment_limit || '',
        contact: quoteData?.contact?.name,
        fillInShips: quoteData?.fill_in_limit || '',
        sealsLimit: quoteData?.seal_limit || '',
        keyAreas: '',
        tax: quoteData?.taxRate || '$0',
        county: quoteData?.county || '$0',
        totalWtax: quoteData?.total_with_tax || '$0',
        uploadDocument: quoteData?.uploadDocument || []
      }

      const projectContracts = quoteData.projectContracts
        .filter(item => item.is_include === 1)
        .map(item => item.contract?.name)
      setProjectContracts(projectContracts)

      const projectSubmittals = quoteData.projectSubmittals
        .filter(item => item.is_include === 1)
        .map(item => item.submittal?.name)
      setProjectSubmittals(projectSubmittals)

      const projectKeyArea = quoteData.projectKeyAreas
        .filter(item => item.is_include === 1)
        .map(item => item.keyArea?.name)
      setProjectKeyAreas(projectKeyArea)

      const projectScopes = quoteData.projectScopes
        .filter(item => item.is_include === 1)
        .map(item => item.key_area?.name)
      setProjectScopes(projectScopes)
      setNewData(invoiceData)

      const includedTitles = invoiceData?.scopeIsInclude
        .filter(
          item => item.is_include === 1 && item.budget_category_title !== null
        )
        .map(item => item.budget_category_title)

      console.log('includedTitles90909', includedTitles)

      setisInclude(includedTitles.join(', '))

      const excludedTitles = invoiceData?.scopeIsInclude
        .filter(
          item => item.is_exclude === 1 && item.budget_category_title !== null
        )
        .map(item => item.budget_category_title)

      console.log('includedTitles90909', includedTitles)

      setIsExclude(excludedTitles.join(', '))
    } catch (error) {
      console.error('Error fetching invoice:', error)
    }
  }
  console.log('newData', newData)

  useEffect(() => {
    getInvoice()
  }, [selectdRevision])

  const handleRedirect = () => {
    router?.push(`/quotes-preview/preview?id=${encryptedId}`)
  }
  const [list, setList] = useState([])
  useEffect(() => {
    const revisionHistory = async () => {
      try {
        const response = await api?.get(
          `/projects/budget-history/${encryptedId}`
        )

        if (response?.status === 200) {
          const data = response?.data?.data?.budgetHistory || []
          const filteredData = data.filter(item => item?.revision_status == 1)
          console.log('datadatadatadata', filteredData)
          setList(filteredData)
        }
      } catch (err) {
        console.error('Error fetching budget history:', err)
      }
    }
    revisionHistory()
  }, [])
  const pdfRef = useRef()
  console.log('listeeeeeeeeeeeeeeeeeeeeeeeee', list)

  const handleDownloadPDF = () => {
    if (!pdfRef.current) return

    import('html2pdf.js').then(module => {
      const html2pdf = module.default
      html2pdf()
        .set({
          margin: 0.5,
          filename: 'project-quote.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 1, useCORS: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        })
        .from(pdfRef.current)
        .save()
    })
  }

  const handleSelectRevision = data => {
    setSelectedRevision(data?.id)
  }

  ///quote message handler
  const [quoteToggle, setQuoteToggle] = useState(false)
  const quoteMessageHandler = () => {
    setQuoteToggle(!quoteToggle)
    getNotesApi()
  }
  const getNotesApi = async () => {
    try {
      const res = await LeadsServices.GetNotes(newData?.leadId)
      if (res?.status === 200) {
        setNotesData(res?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  useEffect(() => {
    getNotesApi()
  }, [])

  // Function to scroll to specific section with offset
  const scrollToSection = section => {
    if (section === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const ref = {
        cover: coverRef,
        breakdown: breakdownRef,
        file: fileRef
      }[section]
      if (ref?.current) {
        const offset = 80 // Offset to account for sticky header/bubbles (approx 60px height + padding)
        const elementPosition =
          ref.current.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
      }
    }
    setActiveSection(section) // Update active section
  }
  return (
    <>
      <style jsx>{`
        @media print {
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>

      <div className='print-hidden mt-10 flex justify-end gap-4'>
        <Button
          onClick={handleDownloadPDF}
          type='button'
          className='site-button bg-white'
        >
          Download PDF
        </Button>
      </div>

      <div className='grid grid-cols-[20%,60%,20%] gap-4'>
        <div>
          <Accordion
            type='single'
            collapsible
            className='w-full rounded-lg'
            defaultValue='item-1'
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger
                className='Accordion-Trigger Bg rounded text-lg text-white'
                style={{ backgroundColor: '#00b1de' }}
              >
                <span className='ml-2'> Select Revision</span>
              </AccordionTrigger>
              <AccordionContent className='flex flex-col gap-4 text-balance'>
                <button
                  className={'ml-2 mt-2 text-start'}
                  onClick={() => handleSelectRevision()}
                >
                  Select
                </button>
                {list?.length > 0 ? (
                  list?.map(data => {
                    return (
                      <>
                        <button
                          className={
                            selectdRevision == data?.id
                              ? 'ml-2 mt-2 text-start text-slate-400'
                              : 'ml-2 mt-2 text-start'
                          }
                          onClick={() => handleSelectRevision(data)}
                        >{`${data.projectName} (#${data.id})`}</button>
                      </>
                    )
                  })
                ) : (
                  <>
                    <span className='mt-2 text-center'>No Revision Found</span>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          {/* Bubbles Section */}
          <div className='sticky top-0 z-10 mb-12 flex gap-4 bg-white py-2 ps-4'>
            {['all', 'cover', 'breakdown', 'file'].map(doc => (
              <button
                key={doc}
                onClick={() => scrollToSection(doc)}
                className={`w-full px-3 py-2 text-lg font-medium text-white transition-colors ${
                  activeSection === doc
                    ? 'bg-[#00b1de] font-bold'
                    : 'site-button bg-white !p-0 hover:bg-[#00b1de]'
                }`}
              >
                {doc.charAt(0).toUpperCase() + doc.slice(1)}
              </button>
            ))}
          </div>

          {/* Document Content */}
          <div ref={pdfRef}>
            {/* Quote Section */}
            <div ref={quoteRef}>
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
                    <td align='left' colSpan={2}>
                      <img
                        src='https://blue-sky-rose.vercel.app/images/logo-b50fe6ce.jpeg'
                        alt='Blue Sky - The Down Systems'
                        style={{ width: '250px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        paddingTop: '20px',
                        paddingBottom: '10px',
                        textDecoration: 'underline'
                      }}
                    >
                      PROJECT QUOTE
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: '60px' }}>
                      <table
                        cellPadding='0'
                        cellSpacing='0'
                        style={{ tableLayout: 'fixed', width: '100%' }}
                      >
                        <tr>
                          <td style={{ paddingBottom: '8px' }}>
                            <strong>Project:</strong>
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              paddingBottom: '8px'
                            }}
                          >
                            {newData?.projectName}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: '8px' }}>
                            <strong>Address:</strong>
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              paddingBottom: '8px'
                            }}
                          >
                            {newData?.address}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: '8px' }}>
                            <strong>Customer:</strong>
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              paddingBottom: '8px'
                            }}
                          >
                            {newData?.customer}
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style={{ paddingLeft: '80px' }}>
                      <table
                        cellPadding='0'
                        cellSpacing='0'
                        style={{ tableLayout: 'fixed', width: '100%' }}
                      >
                        <tr>
                          <td style={{ paddingBottom: '8px' }}>
                            <strong>Quote Date:</strong>
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              paddingBottom: '8px'
                            }}
                          >
                            {newData?.quoteDate}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: '8px' }}>
                            <strong>Engineer:</strong>
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              paddingBottom: '8px'
                            }}
                          >
                            {newData?.engineer}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: '8px' }}>
                            <strong>Job #</strong>
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              paddingBottom: '8px'
                            }}
                          >
                            {' '}
                            {newData?.job}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: '50px' }} colSpan={2}>
                      <table style={{ width: '100%', marginBottom: '10px' }}>
                        <tr>
                          <td>
                            <strong>PLAN DATE</strong>
                          </td>
                          <td>{newData?.planDate?.split(' ')[0]}</td>
                          <td>
                            <strong>REVISION INFO:</strong>
                          </td>
                          <td>ISSUE FOR PERMIT</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #000'
                      }}
                    >
                      <table style={{ width: '100%' }}>
                        <tr style={{ verticalAlign: 'top' }}>
                          <td
                            style={{
                              padding: '0 10px 0 0',
                              fontWeight: 'bold',
                              width: '20%'
                            }}
                          >
                            SCOPE
                          </td>
                          <td>
                            <p>
                              <span
                                style={{ color: 'green', fontWeight: 'bold' }}
                              >
                                INC
                              </span>{' '}
                              <span className='text-xs'>{isInclude}</span>
                            </p>
                            <p>
                              <span style={{ color: 'red' }}>
                                <strong>EXC</strong>
                              </span>{' '}
                              <span className='text-xs'>{isExclude}</span>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #000',
                        backgroundColor: '#dceaf7',
                        borderTop: 'none'
                      }}
                    >
                      <tr style={{ verticalAlign: 'top' }}>
                        <td
                          style={{
                            padding: '0 10px 0 0',
                            fontWeight: 'bold',
                            minWidth: '50px'
                          }}
                        >
                          PLAN NOTES
                        </td>
                        <td className='text-left'>
                          <p style={{ minHeight: '100px' }}>
                            {newData?.planNotes}
                          </p>
                        </td>
                      </tr>
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
                          borderCollapse: 'collapse',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '14px'
                        }}
                      >
                        <tr style={{ textAlign: 'left' }}>
                          <td
                            style={{
                              borderLeft: '1px solid #000',
                              borderRight: '1px solid #000',
                              borderBottom: '1px solid #000',
                              padding: '20px 8px'
                            }}
                          >
                            <strong>GROSS SQFT:</strong> {newData?.grossSqft}
                          </td>
                          <td
                            style={{
                              borderLeft: '1px solid #000',
                              borderRight: '1px solid #000',
                              borderBottom: '1px solid #000',
                              padding: '20px 8px'
                            }}
                          >
                            <strong>BLDG:</strong> {newData?.bldg}
                          </td>
                          <td
                            style={{
                              borderLeft: '1px solid #000',
                              borderRight: '1px solid #000',
                              borderBottom: '1px solid #000',
                              padding: '20px 8px'
                            }}
                          >
                            <strong>TYPES:</strong> {newData?.types}
                          </td>
                        </tr>
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
                          borderCollapse: 'collapse',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '14px'
                        }}
                      >
                        <tr style={{ textAlign: 'center' }}>
                          <td
                            style={{
                              borderLeft: '1px solid #000',
                              borderRight: '1px solid #000',
                              borderBottom: '1px solid #000',
                              padding: '8px'
                            }}
                          >
                            <strong>MAX SHIPMENTS:</strong>{' '}
                            {newData?.shipment_limit}
                          </td>
                          <td
                            style={{
                              borderLeft: '1px solid #000',
                              borderRight: '1px solid #000',
                              borderBottom: '1px solid #000',
                              padding: '8px'
                            }}
                          >
                            <strong>FILL IN SHIPS:</strong>{' '}
                            {newData?.fillInShips}
                          </td>
                          <td
                            style={{
                              borderLeft: '1px solid #000',
                              borderRight: '1px solid #000',
                              borderBottom: '1px solid #000',
                              padding: '8px'
                            }}
                          >
                            <strong>SEALS LIMIT:</strong> {newData?.sealsLimit}
                          </td>
                          <td
                            style={{
                              borderLeft: '1px solid #000',
                              borderRight: '1px solid #000',
                              borderBottom: '1px solid #000',
                              padding: '8px'
                            }}
                          >
                            <em>
                              *ANY SHIPMENTS ABOVE OR SEALS ABOVE ARE CHARGED AT
                              FULL PRICE
                            </em>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr style={{ paddingTop: '20px' }}>
                    <td style={{ paddingTop: '20px', paddingBottom: '0px' }}>
                      <strong
                        style={{
                          textDecoration: 'underline',
                          paddingBottom: '0px',
                          display: 'inline-block'
                        }}
                      >
                        COMPONENTS
                      </strong>
                    </td>
                    <td
                      style={{
                        textAlign: 'right',
                        fontWeight: 'bold',
                        paddingBottom: '20px',
                        paddingTop: '20px'
                      }}
                    >
                      $ {newData?.total}
                    </td>
                  </tr>
                  {newprojectContracts?.map((item, index) => (
                    <tr key={index}>
                      <td
                        colSpan={2}
                        style={{ paddingBottom: '0px', paddingLeft: '30px' }}
                      >
                        {item}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan={2}
                      style={{ paddingTop: '20px', paddingBottom: '0px' }}
                    >
                      <strong
                        style={{
                          textDecoration: 'underline',
                          paddingBottom: '0px',
                          display: 'inline-block'
                        }}
                      >
                        DRAWINGS / SUBMITTALS:
                      </strong>
                      {newprojectSubmittals?.map((item, index) => (
                        <tr key={index}>
                          <td
                            colSpan={2}
                            style={{
                              paddingBottom: '0px',
                              paddingLeft: '30px'
                            }}
                          >
                            {item}
                          </td>
                        </tr>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ paddingTop: '20px' }}>
                      <strong
                        style={{
                          textDecoration: 'underline',
                          fontWeight: 'bold',
                          paddingBottom: '20px',
                          paddingTop: '20px'
                        }}
                      >
                        KEY AREAS
                      </strong>
                      {newprojectKeyAreas?.map((item, index) => (
                        <tr key={index}>
                          <td
                            colSpan={2}
                            style={{
                              paddingBottom: '0px',
                              paddingLeft: '30px'
                            }}
                          >
                            {item}
                          </td>
                        </tr>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ paddingTop: '20px' }}>
                      <table
                        width='100%'
                        style={{ borderCollapse: 'collapse', fontSize: '14px' }}
                      >
                        <tr>
                          <td>
                            <strong>TAX</strong>
                          </td>
                          <td align='right'>
                            {newData?.tax?.replace('$', '')}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Program</strong>
                          </td>
                          <td align='right'>
                            {newData?.program?.replace('$', '')}
                          </td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                          <td>
                            <strong>TOTAL W/ TAX</strong>
                          </td>
                          <td align='right'>
                            {(
                              Number(newData?.total) + Number(newData?.taxes)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        fontSize: '14px',
                        paddingTop: '30px',
                        color: '#666'
                      }}
                    >
                      <h6
                        style={{
                          color: '#333',
                          marginBottom: '10px',
                          fontSize: '14px',
                          padding: '10px'
                        }}
                      >
                        TERMS & CONDITIONS:
                      </h6>
                      <Separator className='mb-4 bg-black' />
                      <p>
                        Please allow at least 2 weeks for design. Price and
                        availability subject to change upon release. Freight
                        charges may apply for non-typical shipments or changes
                        to scope. Approval must be received before order
                        release. Orders will not be accepted unless signed by
                        builder/GC. Builder must notify Blue Sky at time of
                        approval if the quote is being used as an alternate.
                        Orders must include the latest approved drawing(s). Blue
                        Sky is not liable for errors caused by builder changes
                        not reflected in approved submittals.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cover Section */}
            <div ref={coverRef} className='mt-12'>
              <h2 className='text-xl font-semibold'>Cover</h2>
              <CoverPdf newQuoteData={newData} />
            </div>

            {/* Breakdown Section */}
            <div ref={breakdownRef} className='mt-12'>
              <h2 className='mb-4 text-xl font-semibold'>Break Down</h2>
              <BreakDown editData={editData} />
            </div>

            {/* File Section */}
            <div ref={fileRef} className='mt-12'>
              <h2 className='mb-4 text-xl font-semibold'>Attatchments</h2>
              <UploadedDocument newData={newData} />
            </div>
          </div>
        </div>

        <div>
          <div className='quoteChat'>
            {quoteToggle && (
              <div className='quote-message-outer'>
                <Card className='border-color-grey w-full overflow-hidden rounded border'>
                  <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
                    <CardTitle className='flex justify-between'>
                      <div className='!text-lg'>Message</div>
                    </CardTitle>
                  </CardHeader>
                  <div className='h-96 p-4'>
                    <Card className='h-64 w-full overflow-auto rounded-none shadow-none'>
                      <NotesList
                        notesData={notesData}
                        getNotesApi={getNotesApi}
                        customer={newData?.contact}
                      />
                    </Card>
                    <CardFooter className='bottom-0 left-0 w-full px-0 pb-3'>
                      <Notes
                        moduleId={newData?.leadId}
                        moduleName='contractObj'
                        getNotesApi={getNotesApi}
                      />
                    </CardFooter>
                  </div>
                </Card>
              </div>
            )}
            <MessageCircleMore
              onClick={quoteMessageHandler}
              className='mt-4 cursor-pointer'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default QuotePreview
