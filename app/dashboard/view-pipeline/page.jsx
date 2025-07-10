'use client'
import LayoutHeader from '@/components/layoutHeader'
import BallInCourtPopup from '@/components/Sales-Pipeline/BallInCourtPopup'
import SectionTypeSelectPopup from '@/components/Sales-Pipeline/SectionTypeSelectPopup'
import { SalePipelineDataTable } from '@/components/Sales-Pipeline/Table'
import FormSelectField from '@/components/share/form/FormSelect'
import SelectFilter from '@/components/share/form/SelectFilter'
import { errorMessage } from '@/components/ToasterMessage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import UserContext from '@/contexts/UserContext'
import api from '@/lib/api'
import BudgetBooksServices from '@/services/BudgetBook/budgetBook'
import LeadsServices from '@/services/Leads/lead'
import { SalesPipelineServices } from '@/services/Pipeline/pipeline'
import UserServices from '@/services/Settings/UserSetting'
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const SalesPipeline = () => {
  useDocumentTitle('View Pipeline')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [pipeLineStatus, setPipeLineStatus] = useState([])
  const { selectedStatus, setSelectedStatus } = useContext(UserContext)
  const [accordionValue, setAccordionValue] = useState(false)
  const [budgetBook, setBudgetBook] = useState([])
  const [companyData, setCompanyData] = useState([])
  const [user, setUser] = useState([])
  const [title, setTitle] = useState('')
  const [pipelines, setPipelines] = useState([])
  const methods = useForm({})
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogTypeSection, setOpenDialogTypeSection] = useState(false)
  const [leadIdRelatedType, setLeadIdRelatedType] = useState()
  const [leadId, setLeadId] = useState()
  const [pipelineDelayIndicator, setPipelineDelayIndicator] = useState([])
  const [toStatusId, setToStatusId] = useState('')
  const [typeId, setTypeId] = useState('')
  const [hideId, setHideId] = useState('')
  const [hideValue, setHideValue] = useState('')
  const { showHiddenContent, setShowHiddenContent } = useContext(UserContext)
  const [ticketWarning, setTicketWarning] = useState(false)
  const [ticketId, setTicketId] = useState(null)

  const [hideLeadId, setHideLeadId] = useState('')
  const [statusId, setStatusId] = useState('')
  const [hideLeadValue, setHideLeadValue] = useState('')
  // Submit handler to hide show the lead
  const sendLeadHideValue = async () => {
    try {
      const value = hideLeadValue == false ? 0 : 1
      const data = { lead_pipeline_status: String(value) }

      const response = await api.put(`lead-status-update/${hideLeadId}`, data)
    } catch (error) {}
  }

  useEffect(() => {
    sendLeadHideValue()
  }, [hideLeadId, hideLeadValue])
  //  on Submit Handle used to hide show pipeline status
  const sendHideValue = async () => {
    try {
      const value = hideValue == false ? 0 : 1
      const data = { hide_status: String(value) }
      const response = await api.put(`pipelines-status-update/${hideId}`, data)
    } catch (error) {
      console.error('Failed to update pipeline status:', error)
    }
  }

  useEffect(() => {
    if (hideId !== '' && hideValue !== '') {
      sendHideValue()
    }
  }, [hideId, hideValue])
  const handleHideButton = () => {
    if (showHiddenContent == false) {
      setShowHiddenContent(true)
    } else if (showHiddenContent == true) {
      setShowHiddenContent(false)
    }
  }
  // Getting all PipeLines :---
  const getListSalesPipeline = async () => {
    try {
      setLoading(true)
      const res = await SalesPipelineServices.getSalesPipeline()
      if (res?.status === 200) {
        const modifiedData = res?.data?.data?.leads.map(group => {
          let toggle = true // pehle true se shuru
          const newOpportunities = group.opportunities.map(opportunity => {
            const updated = { ...opportunity, ticket: toggle }
            toggle = !toggle // alternate true/false
            return updated
          })

          return { ...group, opportunities: newOpportunities }
        })

        console.log('res?.data?.data?.leads', modifiedData)

        setList(modifiedData)
        setPipelines(res?.data?.data?.pipelines)
        const PipeLineOptions = res?.data?.data?.pipelines.map(item => ({
          value: item.id,
          label: item.name
        }))

        const PipeLineDelayIndicator = res?.data?.data?.pipelines.map(
          item => item.pipeline_delay_indicator
        )
        setPipelineDelayIndicator(PipeLineDelayIndicator)
        setPipeLineStatus(PipeLineOptions)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListSalesPipeline()
  }, [])

  const assignedUserId = methods.watch('assigned_user')
  // Drag & Drop------------------------------------
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4
      }
    })
  )

  //drag end
  const handleDragEnd = event => {
    const { active, over } = event
    const leadId = active?.id

    // find original lead group
    const leadGroup = getList?.find(section =>
      section.opportunities.some(item => item?.id == leadId)
    )
    if (!leadGroup) return
    const updatedDraggedOpportunity = leadGroup.opportunities.map(
      (item, index) => ({
        ...item,
        ticket: index % 2 === 0 // index 0, 2, 4 => true; index 1, 3, 5 => false
      })
    )
    console.log('draggedOpportunity2', updatedDraggedOpportunity)

    //  find actual dragged opportunity
    const draggedOpportunity = updatedDraggedOpportunity.find(
      item => item.id == leadId
    )

    console.log('draggedOpportunity', draggedOpportunity)

    // check ticket
    if (draggedOpportunity?.ticket === true) {
      setTicketWarning(true)
      setTicketId(`/dashboard/leads/preview?id=${leadId}&ticket=1`)
      return
    }

    // normal flow: get target group
    const newIGroupId = getList.find(item => item?.id == over?.id)
    if (!newIGroupId) return

    // ignore if same group
    if (newIGroupId?.id == leadGroup?.id) return

    setOpenDialog(true)
    methods.setValue(
      'assigned_user',
      String(active?.data?.current?.assignId?.id)
    )
    methods.setValue('nextStepDate', active?.data?.current?.nextStepDate)
    setLeadId(leadId)
    setLeadIdRelatedType(newIGroupId.id)
  }

  useEffect(() => {
    if (pipeLineStatus.length > 0) {
      const isValidStatus = pipeLineStatus.some(
        status => String(status.value) === String(selectedStatus)
      )

      const statusToSet = isValidStatus
        ? selectedStatus
        : pipeLineStatus[0]?.value

      methods.setValue('pipelineStatus', statusToSet)
      setSelectedStatus(statusToSet)
    }
  }, [pipeLineStatus])

  const pipelineStatus = methods.watch('pipelineStatus')
  useEffect(() => {
    const pipelineStatus = methods.watch('pipelineStatus')
    if (pipelineStatus) {
      setSelectedStatus(pipelineStatus)
    }
  }, [methods.watch('pipelineStatus')])

  const finalDragEnd = async data => {
    const nextStepDate = data.nextStepDate
    // api work :-
    if (data?.assigned_user) {
      const data = {
        targetStatusId: leadIdRelatedType,
        toStatusId: toStatusId,
        leads: [{ id: leadId }],
        assigned_user: Number(assignedUserId),
        nextStepDate: nextStepDate,
        pipelineId: pipelineStatus
      }
      try {
        await SalesPipelineServices.updateSalesPipelineRow(data)
        setOpenDialog(false)
        setOpenDialogTypeSection(false)
        handlePipelineStatus(pipelineStatus)
      } catch (error) {
        console.log('error', error)
      }
    }

    if (!data?.assigned_user) {
      errorMessage({
        description: 'Please select a user.'
      })
    }
  }

  const handleOnDragMove = event => {}

  //Sort:)-----------------------------------------
  // useEffect(() => {
  //   methods.setValue('pipelineStatus', pipeLineStatus[0]?.value)
  // }, [methods, pipeLineStatus])

  const handlePipelineStatus = async id => {
    try {
      const newLeadPipeline =
        await SalesPipelineServices.getSalesPipelineByStatus(id)
      if (newLeadPipeline?.data?.data?.leads.length) {
        if (showHiddenContent == false) {
          const filteredData = newLeadPipeline?.data?.data?.leads?.filter(
            item => item?.hide_status == 1
          )
          // const filteredData = newLeadPipeline?.data?.data?.leads
          //   ?.filter(item => item?.hide_status == 1)
          //   ?.map(item => ({
          //     ...item,
          //     opportunities: item.opportunities?.filter(
          //       opp => opp?.leadPipelineStatus === '1'
          //     )
          // }))

          setList(filteredData || [])
        } else if (showHiddenContent == true) {
          const filteredData = newLeadPipeline?.data?.data?.leads?.filter(
            item => item
          )
          setList(filteredData || [])
        }
      } else {
        setList([])
      }
    } catch (error) {
      console.error('Failed ', error)
    }
  }

  // Filter :)-------------------------------------
  const searchAssign = methods.watch('searchAssign')
  const searchCompany = methods.watch('searchCompany')
  const searchProject = methods.watch('searchProject')

  useEffect(() => {
    if (pipelineStatus) {
      handlePipelineStatus(pipelineStatus)
    }

    if (
      (pipelineStatus && searchAssign) ||
      searchCompany ||
      searchProject !== undefined
    ) {
      methods.setValue('searchProject', '')
      methods.setValue('searchCompany', '')
      methods.setValue('searchAssign', '')
    }
  }, [
    methods,
    pipelineStatus,
    hideId,
    hideValue,
    showHiddenContent,
    hideLeadId,
    hideLeadValue
  ])

  const handlePipeLineFilter = async () => {
    const assign = searchAssign == undefined ? '' : searchAssign
    const company = searchCompany == undefined ? '' : searchCompany
    const project = searchProject == undefined ? '' : searchProject
    try {
      const newData = await SalesPipelineServices.getSalesPipelineByFilter(
        assign,
        company,
        project,
        pipelineStatus
      )
      setList(newData?.data?.data?.leads)
    } catch (error) {
      console.log('error', error)
    }
  }
  const getBudgetBooks = async () => {
    try {
      const response = await BudgetBooksServices.budgetBooks()
      if (response.status === 200) {
        setBudgetBook(response?.data?.data)
      }
    } catch (error) {
      console.log('err', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }
  const getCompanies = async () => {
    try {
      const response = await LeadsServices.companies()
      if (response.status === 200) {
        setCompanyData(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }
  const fetchUser = async () => {
    try {
      const response = await UserServices.GetAllUser(1, 50)
      if (response.status === 200) {
        setUser(response.data.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    fetchUser()
    getBudgetBooks()
    getCompanies()
  }, [])

  useEffect(() => {
    const newTitle = pipelines?.find(item => item.id == pipelineStatus)
    if (newTitle) {
      setTitle(newTitle.name)
    }
  }, [pipelineStatus, pipelines])

  const handleClearSearch = () => {
    methods.setValue('searchProject', '')
    methods.setValue('searchCompany', '')
    methods.setValue('searchAssign', '')
    if (pipelineStatus) {
      handlePipelineStatus(pipelineStatus)
    }
  }
  methods.setValue('section_Type', String(typeId))
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <div>
          <LayoutHeader pageTitle={title} />
        </div>

        {/* sort */}
        <div className='flex gap-4'>
          <FormProvider {...methods}>
            <FormSelectField
              form={methods}
              className={'mt-0 h-10 min-w-48'}
              name='pipelineStatus'
              placeholder='Select Status'
              options={pipeLineStatus}
              label=' '
              disabled={false}
            />
          </FormProvider>
        </div>
      </div>
      {/* Filters */}
      <Accordion
        type='single'
        collapsible
        className='theme-bg-light-rgba mb-4 rounded px-4'
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger className='py-2 text-xl'>Filter</AccordionTrigger>
          <AccordionContent className='pt-4'>
            <div className='flex grid grid-cols-4 gap-4'>
              <FormProvider {...methods}>
                <SelectFilter
                  form={methods}
                  name='searchAssign'
                  placeholder='Select Assign'
                  label='Assign'
                  options={
                    user?.length > 0
                      ? user?.map(data => ({
                          label: data.name,
                          value: String(data.id)
                        }))
                      : []
                  }
                />
                <SelectFilter
                  form={methods}
                  name='searchCompany'
                  placeholder='Select Company'
                  label='Company'
                  options={
                    companyData?.length > 0
                      ? companyData?.map(data => ({
                          label: data.name,
                          value: String(data.id)
                        }))
                      : []
                  }
                />

                <SelectFilter
                  form={methods}
                  label='Project'
                  name='searchProject'
                  placeholder='Select Project'
                  options={
                    budgetBook?.length > 0
                      ? budgetBook?.map(data => ({
                          label: data.name,
                          value: String(data.id)
                        }))
                      : []
                  }
                />
                <div className='mt-5 flex justify-end gap-4'>
                  <Button
                    type='Submit'
                    className='site-button-small bg-white'
                    onClick={() => handlePipeLineFilter()}
                  >
                    Search
                  </Button>
                  <Button
                    type='button'
                    className='site-button-small text-white'
                    onClick={handleClearSearch}
                  >
                    Clear
                  </Button>
                </div>
              </FormProvider>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* D&D  */}
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        onDragMove={handleOnDragMove}
      >
        <SalePipelineDataTable
          showHiddenContent={showHiddenContent}
          handleHideButton={handleHideButton}
          setLeadIdRelatedType={setLeadIdRelatedType}
          setHideId={setHideId}
          setLeadId={setLeadId}
          apiData={getList}
          loading={loading}
          handlePipelineStatus={handlePipelineStatus}
          setHideLeadId={setHideLeadId}
          setStatusId={setStatusId}
          setHideValue={setHideValue}
          setHideLeadValue={setHideLeadValue}
          setOpenDialog={setOpenDialog}
          setOpenDialogTypeSection={setOpenDialogTypeSection}
          pipelineDelayIndicator={pipelineDelayIndicator}
          form={methods}
          setTypeId={setTypeId}
        />
      </DndContext>
      {/* PopUp for assign user */}
      <BallInCourtPopup
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        form={methods}
        finalDragEnd={finalDragEnd}
        leadId={leadId}
      />
      {/* PopUp for typesection selecting  */}
      <SectionTypeSelectPopup
        openDialog={openDialogTypeSection}
        setOpenDialogTypeSection={setOpenDialogTypeSection}
        setOpenDialog={setOpenDialog}
        setLeadIdRelatedType={setLeadIdRelatedType}
        form={methods}
        data={getList}
        leadId={leadId}
        typeId={typeId}
      />
      {ticketWarning && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='w-full max-w-md rounded bg-white p-8 shadow-lg'>
            <div>
              <p className='mb-4 text-center text-lg'>
                You already have an open ticket. Please complete it first.
              </p>
            </div>
            <div className='flex justify-between'>
              <Button onClick={() => router.push(ticketId)}>View Ticket</Button>

              <Button onClick={() => setTicketWarning(false)}>Ok</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SalesPipeline
