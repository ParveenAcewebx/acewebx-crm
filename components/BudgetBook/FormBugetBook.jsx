'use client'

import { Button } from '@/components/ui/button'
import UserContext from '@/contexts/UserContext'
import api from '@/lib/api'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import LayoutHeader from '../layoutHeader'
import SelectFilterCover from '../share/form/SelectFilterCover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { BudgetTab } from './tabs/budget'
import BudgetCoverTab from './tabs/cover'
import BudgetGeneralTab from './tabs/general'
import BudgetOptionTab from './tabs/option'
import BudgetScopeTab from './tabs/scope'
import BudgetSiteTab from './tabs/site'
import BudgetSov from './tabs/siteSov'
import UploadDocument from './tabs/uploadDocument'

const FormBugetBook = ({
  form,
  pageTitle,
  leadId,
  setImageUpload,
  editData,
  tableData,
  setTableData,
  setFiles,
  files,
  setFileNotes,
  fileNotes,
  setFileTypes,
  fileTypes
}) => {
  const { watch, setValue } = form
  const [siteId, setSiteId] = useState([])
  const [siteName, setSiteName] = useState([])
  const [scope, setScope] = useState([])
  const [budgetFields, setBudgetFields] = useState([])
  const { control, getValues } = useFormContext()
  const isPricing = useWatch({ control, name: 'is_pricing' })
  const searchParams = useSearchParams()
  const budgetId = searchParams.get('id')
  const [getList, setList] = useState([])
  const [activeTab, setActiveTab] = useState('general')
  const [selectedData, setSelectedData] = useState([])
  const selectedScopes = watch('projectScopes') || []
  const { hideShowMap, setHideShowMap } = useContext(UserContext)
  const [filterRevision, setFilterRevision] = useState([])
  const [revisionID, setRevisionId] = useState()
  const handleHideShow = item => {
    setRevisionId(item?.value)
    if (!item?.value) return
    setHideShowMap(prev => ({
      ...prev,
      [item.value]: !prev[item.value]
    }))
  }
  // set transform scope data in budget
  const transformScopeItem = item => ({
    budget_category_id: item?.budgetCategory?.id,
    catName: item?.budgetCategory?.catName,
    scopes: (item?.scopes || []).map(scope => ({
      scope_id: scope.scope_id,
      title: scope.title,
      short_title: scope.short_title,
      categories: (scope.categories || []).map(category => ({
        scope_category_id: category.scope_category_id || category.id,
        title: category.title,
        groups: (category.groups || []).map(group => ({
          scope_group_id: group.scope_group_id || group.id,
          title: group.title,
          sagments: (group.sagments || []).map(sagment => ({
            scope_sagment_id: sagment.scope_sagment_id || sagment.id,
            title: sagment.title,
            url: sagment.url,
            option: sagment.option,
            ...(sagment.data ? { data: sagment.data } : {})
          }))
        }))
      }))
    }))
  })

  useEffect(() => {
    if (selectedData && Object.keys(selectedData).length > 0) {
      const formattedData = {
        ...selectedData,
        ...selectedData.log.data,
        budget_book_id: selectedData['project_id '].toString() || '',
        customer_id: String(selectedData?.log?.data?.customer_id) || '',
        contact_id: selectedData?.log?.data?.contact_id?.toString() || '',
        job_no: selectedData?.log?.data?.job_no?.toString() || '',
        date_record: new Date(selectedData?.log?.data?.quote_date),
        zip_id: selectedData?.log?.data?.zip?.id?.toString() || '',
        engineer_id: selectedData?.log?.data?.engineer_id?.toString() || '',
        address: selectedData?.log?.data?.address || '',
        city: selectedData?.log?.data?.city || '',
        quote_date: selectedData?.log?.data?.quote_date || ''
      }
      form.reset(formattedData)
    }
  }, [selectedData])

  const fetchCoverData = async () => {
    try {
      const revisionStatus = hideShowMap?.[revisionID] ? 1 : 0
      const response = await api?.get(
        `/projects/budget-history/${budgetId}?revision_status=${revisionStatus}&revision_id=${revisionID}`
      )
      if (response.status === 200) {
        setList(response?.data?.data?.budgetHistory)
        const filteredData = response?.data?.data?.budgetHistory.filter(
          item => item?.revision_status
        )
        setFilterRevision(filteredData)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchCoverData()
  }, [hideShowMap, revisionID])

  const handleCoverChange = value => {
    const selectedData = getList.find(item => item.id == value)
    setSelectedData(selectedData)
    setActiveTab('general')
  }

  // fetch budget category data for budget tab
  const getBudgetCategory = async () => {
    const response = await api.get('/budget-category')
    if (response.status === 200) {
      const allData = response?.data
      setBudgetFields(allData)
      setScope(allData)

      // Auto-select all categories
      const transformedScopes = allData.reduce(
        (acc, item) => {
          const isAlreadyAdded = selectedScopes.some(
            s =>
              Number(s.budget_category_id) === Number(item?.budgetCategory?.id)
          )
          if (!isAlreadyAdded) {
            const transformed = transformScopeItem(item)
            acc.push(transformed)
          }
          return acc
        },
        [...selectedScopes]
      ) // keep existing too

      setValue('projectScopes', transformedScopes, { shouldValidate: true })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getBudgetCategory()
    }, 3000)
  }, [])

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle={pageTitle} />
        <div className='flex gap-2'>
          {activeTab === 'cover' && (
            <div className='mb-4'>
              <SelectFilterCover
                leadId={leadId}
                name='selectCover'
                form={form}
                className='!mt-0 h-10'
                placeholder='Select Revision'
                options={
                  getList?.length > 0
                    ? getList.map(data => ({
                        label: `${data.projectName} (#${data.id})`,
                        value: data.id
                      }))
                    : []
                }
                onChange={value => handleCoverChange(value)}
                handleHideShow={handleHideShow}
                hideShow={hideShowMap}
              />
            </div>
          )}
          <Link href='/dashboard/budget-book'>
            <Button type='button' className='site-button bg-white'>
              Back
            </Button>
          </Link>
          {/* <Button
            type='button'
            onClick={budgetSavehandler}
            className='site-button'
          >
            Save
          </Button> */}
          <Button type='submit' className='site-button'>
            Save & Close
          </Button>
        </div>{' '}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
          <TabsTrigger
            value='general'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value='site'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Site
          </TabsTrigger>
          <TabsTrigger
            value='budget'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Budget
          </TabsTrigger>
          {budgetId && (
            <TabsTrigger
              value='cover'
              className='rounded-none px-4 py-2 !shadow-none'
            >
              Cover
            </TabsTrigger>
          )}

          <TabsTrigger
            value='option'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Option
          </TabsTrigger>
          <TabsTrigger
            value='scope'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Scope
          </TabsTrigger>
          <TabsTrigger
            value='sov'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            SOV
          </TabsTrigger>
          <TabsTrigger
            value='uploadDocument'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Attachments
          </TabsTrigger>
        </TabsList>

        <TabsContent value='general'>
          <BudgetGeneralTab form={form} budgetId={budgetId} leadIds={leadId} />
        </TabsContent>

        <TabsContent value='site'>
          <BudgetSiteTab
            setSiteName={setSiteName}
            setSiteId={setSiteId}
            form={form}
          />
        </TabsContent>
        <TabsContent value='budget'>
          <BudgetTab
            scope={scope}
            budgetFields={budgetFields}
            siteId={siteId}
            siteName={siteName}
            form={form}
          />
        </TabsContent>
        <TabsContent value='cover'>
          <BudgetCoverTab
            form={form}
            hideShowMap={hideShowMap}
            revisionID={revisionID}
            handleHideShow={handleHideShow}
          />
        </TabsContent>
        <TabsContent value='option'>
          <BudgetOptionTab form={form} />
        </TabsContent>
        <TabsContent value='scope'>
          <BudgetScopeTab
            form={form}
            siterepeaterId={siteId}
            siteName={siteName}
          />
        </TabsContent>
        <TabsContent value='sov'>
          <BudgetSov form={form} />
        </TabsContent>
        <TabsContent value='uploadDocument'>
          <UploadDocument
            setImageUpload={setImageUpload}
            editData={editData}
            tableData={tableData}
            setTableData={setTableData}
            form={form}
            setFiles={setFiles}
            files={files}
            setFileNotes={setFileNotes}
            fileNotes={fileNotes}
            setFileTypes={setFileTypes}
            fileTypes={fileTypes}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default FormBugetBook
