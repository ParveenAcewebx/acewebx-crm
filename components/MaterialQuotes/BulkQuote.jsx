// BulkQuotes.js

'use client'
import { Button } from '@/components/ui/button'
import { MaterialService } from '@/services/Leads/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { QuoteBulkDataTable } from '../quoteBulkTable'
import FormCheckBox from '../share/form/CheckBox'
import FormInputField from '../share/form/FormInputField'
import { errorMessage } from '../ToasterMessage'

const BulkQuotes = ({
  handleCloseDialog,
  handleProjectSelect,
  onSubmitBulkQuotes
}) => {
  const [rowSelection, setRowSelection] = useState({})
  const [getList, setList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)
  const [totalRecord, setTotalRecord] = useState()
  const form = useForm({
    defaultValues: {
      search: '',
      permissions: [] // for checkbox group
    }
  })

  const searchValue = useWatch({
    control: form.control,
    name: 'search'
  })

  // Fetch materials
  const getBudgetBooks = async () => {
    try {
      setLoading(true)
      const response = await MaterialService.getMaterialList(length, page)
      console.log('responseresponse', response)
      if (response.status === 200) {
        setList(response?.data?.data)
        setFilteredList(response?.data?.data)
        setTotalRecord(response?.data?.meta?.total)
      }
    } catch (error) {
      console.log('errorerror', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBudgetBooks()
  }, [page, length])

  useEffect(() => {
    const filtered = getList.filter(item =>
      item.lable?.toLowerCase().includes(searchValue?.toLowerCase())
    )
    setFilteredList(filtered)
  }, [searchValue, getList])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'length') {
        const val = value.length
        setLength(val === 'all' ? totalRecord || 9999 : Number(val))
        setPage(1)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, totalRecord])

  const QtyCell = ({ row, form }) => {
    const fieldName = `row${row.id}.qty`

    useEffect(() => {
      const current = form.getValues(fieldName)
      if (current === undefined || current === null || current === '') {
        form.setValue(fieldName, row.getValue('qty'))
      }
    }, [form, row, fieldName])

    return <FormInputField name={fieldName} placeholder='qty' label='' />
  }

  // Table columns
  const Columns = [
    {
      id: 'select',
      cell: ({ row }) => (
        <input
          type='checkbox'
          checked={rowSelection[row.id] || false}
          onChange={() =>
            setRowSelection(prev => ({
              ...prev,
              [row.id]: !prev[row.id]
            }))
          }
        />
      )
    },
    {
      accessorKey: 'item',
      header: 'Name',
      cell: ({ row }) => <div>{row.getValue('item')}</div>
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <div>{row.getValue('description')}</div>
    },
    {
      accessorKey: 'qty',
      header: 'Qty',
      cell: ({ row }) => <QtyCell row={row} form={form} />
    }
  ]

  const handleSearchSubmit = data => {
    const selectedRows = Object.keys(rowSelection)
      .filter(key => rowSelection[key])
      .map(index => {
        const originalRow = filteredList[index]
        const updatedQty = form.getValues(`row${index}.qty`)

        return {
          ...originalRow,
          qty: updatedQty // replace original qty with updated form value
        }
      })
      .filter(Boolean)

    const selectedTargets = []
    if (data.permissions?.includes('isMaterialChecked')) {
      selectedTargets.push('materialQuotes')
    }
    if (data.permissions?.includes('isAdditionalChecked')) {
      selectedTargets.push('additionalQuotes')
    }

    if (selectedRows.length === 0 || selectedTargets.length === 0) {
      errorMessage({
        description: 'Select at least one row and one quote type.'
      })
      return
    }

    onSubmitBulkQuotes(selectedRows, selectedTargets)
    handleCloseDialog()
  }

  console.log('getList', getList)
  console.log('filteredList', filteredList)
  return (
    <FormProvider {...form}>
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit(handleSearchSubmit)()
        }}
        className='mb-4 flex items-center gap-5'
      >
        <FormInputField
          form={form}
          name='search'
          placeholder='Search Materials'
        />
        <Button type='submit' className='site-button'>
          Submit
        </Button>
      </form>

      <FormCheckBox
        name='permissions'
        className='mb-4 grid grid-cols-2 gap-4'
        form={form}
        items={[
          { label: 'Material Quote', value: 'isMaterialChecked' },
          { label: 'Additional Quote', value: 'isAdditionalChecked' }
        ]}
      />

      <QuoteBulkDataTable
        loading={loading}
        data={filteredList}
        columns={Columns}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />
    </FormProvider>
  )
}

export default BulkQuotes
