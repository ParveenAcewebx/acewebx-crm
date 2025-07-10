import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LeadSettingModal from '../modal/LeadsettingModal'
import { Button } from '../ui/button'
import AddQuote from './AddQuote'
import { budgetColumn } from './budgetColumn'
import { LeadPreviewQuotesTable } from './LeadPreviewQuotesTable'
import { SalesOrderColumn } from './salesOrderColumn'

const BudgetTable = ({ editId }) => {
  const methods = useForm()
  const [expandedRowId, setExpandedRowId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [getBudgetList, setBudgetList] = useState([])
  const [getSalesList, setSalesList] = useState([])

  const [budgetPage, setBudgetPage] = useState(1)
  const [budgetLength, setBudgetLength] = useState(10)

  const [salesPage, setSalesPage] = useState(1)
  const [salesLength, setSalesLength] = useState(10)
  const [OpenQuotesModal, setOpenQuotesModal] = useState(false)
  const [totalSalesRecord, setTotalSalesRecord] = useState()
  const [totalBudgetRecord, setTotalBudgetRecord] = useState()

  const router = useRouter()

  console.log('getBudgetList', getBudgetList)
  console.log('getSalesList', getSalesList)

  // Fetch API data for Budget Book and Sales Order
  const fetchList = async (type, page, length) => {
    try {
      const response = await api.get(
        `/get-budget-or-material-list/${editId}?page=${page}&length=${length}&type=${type}`
      )
      console.log('response090909', response)

      if (type === 'budget') {
        setBudgetList(response?.data?.data?.getBudgetProjectList?.data || [])
        setTotalBudgetRecord(
          response?.data?.data?.getBudgetProjectList?.total || 0
        )
      }

      if (type === 'sales') {
        setSalesList(response?.data?.data?.getMaterialQuoteList?.data || [])
        setTotalSalesRecord(
          response?.data?.data?.getMaterialQuoteList?.total || 0
        )
      }
    } catch (error) {
      console.log(`Error fetching ${type} list`, error)
    }
  }

  useEffect(() => {
    fetchList('budget', budgetPage, budgetLength)
  }, [budgetPage, budgetLength])

  useEffect(() => {
    fetchList('sales', salesPage, salesLength)
  }, [salesPage, salesLength])

  const handleSetPage = (newPage, type) => {
    if (type === 'budget') {
      setBudgetPage(newPage)
    }
    if (type === 'sales') {
      setSalesPage(newPage)
    }
  }

  const handleSetLength = (newLength, type) => {
    if (type === 'budget') {
      setBudgetLength(newLength)
      setBudgetPage(1)
    }
    if (type === 'sales') {
      setSalesLength(newLength)
      setSalesPage(1)
    }
  }

  // budget book handler
  const handleEditBudgetBook = row => {
    router.push(`/dashboard/budget-book/edit?id=${row?.original?.id}`)
  }
  const handlePreviewBudgetBook = id => {
    router.push(`/dashboard/budget-book/cover-preview?id=${id}`)
  }

  // sales order handler
  const handleEditSalesOrder = row => {
    router.push(`/dashboard/sales-order/list/edit?id=${row?.original?.id}`)
  }
  const handlePreviewSalesOrder = id => {
    router.push(`/dashboard/budget-book/cover-preview?id=${id}`)
  }

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'budgetLength') {
        const val = value.budgetLength
        setBudgetLength(val === 'all' ? totalBudgetRecord || 9999 : Number(val))
        setBudgetPage(1)
      }

      if (name === 'salesLength') {
        const val = value.salesLength
        setSalesLength(val === 'all' ? totalSalesRecord || 9999 : Number(val))
        setSalesPage(1)
      }
    })

    return () => subscription.unsubscribe()
  }, [methods, totalBudgetRecord, totalSalesRecord])

  const handleToggleAccordion = id => {
    setExpandedRowId(prev => (prev === id ? '' : id))
  }

  const handleQuoteOpenModal = () => {
    setOpenQuotesModal(true)
  }
  const handleQuoteModalClose = () => {
    setOpenQuotesModal(false)
  }

  return (
    <>
      <div className='mt-5 text-end'>
        <Button
          type='button'
          className='site-button'
          onClick={handleQuoteOpenModal}
        >
          Add Quote
        </Button>
      </div>
      <div className=''>
        <div className='flex justify-between'>
          <h5 className='text-xl font-semibold'>Budget Book </h5>
        </div>
        <LeadPreviewQuotesTable
          data={getBudgetList}
          loading={loading}
          columns={budgetColumn(
            handleEditBudgetBook,
            expandedRowId,
            handleToggleAccordion
          )}
          totalRecord={totalBudgetRecord}
          page={budgetPage}
          setPage={p => handleSetPage(p, 'budget')}
          length={budgetLength}
          setLength={l => handleSetLength(l, 'budget')}
          type='budget'
          expandedRowId={expandedRowId}
          handleToggleAccordion={handleToggleAccordion}
          // handleEditAction={handleEditBudgetBook}
          handlePreviewAction={handlePreviewBudgetBook}
        />
        <h5 className='mt-5 text-xl font-semibold'>Sales Order </h5>

        <LeadPreviewQuotesTable
          data={getSalesList}
          loading={loading}
          columns={SalesOrderColumn(
            handleEditSalesOrder,
            expandedRowId,
            handleToggleAccordion
          )}
          totalRecord={totalSalesRecord}
          page={salesPage}
          setPage={p => handleSetPage(p, 'sales')}
          length={salesLength}
          setLength={l => handleSetLength(l, 'sales')}
          type='sales'
          expandedRowId={expandedRowId}
          handleToggleAccordion={handleToggleAccordion}
          // handleEditAction={handleEditSalesOrder}
          handlePreviewAction={handlePreviewSalesOrder}
        />
      </div>

      <LeadSettingModal
        submitOpenModal={OpenQuotesModal}
        submitHandleModalClose={() => {
          setOpenQuotesModal(false)
        }}
        description={
          <AddQuote
            handleModalClose={handleQuoteModalClose}
            editId={editId}
            // getAllList={getAllList}
          />
        }
        message={'Add Quote'}
      />
    </>
  )
}

export default BudgetTable
