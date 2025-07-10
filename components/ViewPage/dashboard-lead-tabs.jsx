'use client'

import api from '@/lib/api'
import { Pencil } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LeadsServices from '../../services/Leads/lead'
import LeadTimeline from '../Dashboardnotes/LeadTimeline'
import TaskList from '../Dashboardnotes/TaskTab/List'
import EditLeads from '../LeadsModule/EditLead'
import DcsModal from '../modal/dscForm'
import { errorMessage } from '../ToasterMessage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { formatDate } from '../utils/dateFormat'
import BudgetTable from './Budget'
import General from './General'
import NotesActivies from './NotesActivies'
import Pricing from './Pricing'

export function DashboardLeadTabs({ editId, editData, fetchLeadById }) {
  const [activeTab, setActiveTab] = useState('Dashboard Overview')
  const [notesData, setNotesData] = useState([])
  const router = useRouter()
  const [activitiesData, setActivitiesData] = useState()
  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal
  const [selectedDcsValue, setSelectedDcsValue] = useState(null) // Store DCS value for modal
  const [openDialog, setOpenDialog] = useState(false)
  const [pipelineData, setPipelineData] = useState([]) // State to store Pipeline activities
  const searchParams = useSearchParams()
  const DCSOpenModal = editData => {
    setSelectedDcsValue(editData)
    setDcsModalOpen(true)
  }
  const getNotesApi = async () => {
    try {
      const res = await LeadsServices.GetNotes(editId)
      if (res?.status === 200) {
        setNotesData(res?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  const getActivities = async () => {
    try {
      const res = await LeadsServices.interactions()
      if (res?.status === 200) {
        setActivitiesData(res?.data?.data)
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
  useEffect(() => {
    getActivities()
  }, [])
  const handleEdit = () => {
    setOpenDialog(true)
  }
  const handleModalClose = () => {
    setOpenDialog(false)
  }
  const handleTabChange = value => {
    console.log('leadDashboardTab', value)

    setActiveTab(value)
    localStorage.setItem('leadDashboardTab', value)
  }
  const rawDcsString = editData?.dcs || '0%'
  const cleanedDcs = parseFloat(rawDcsString.replace('%', '')) || 0

  const handleQuoteOpenModal = () => {
    setOpenQuotesModal(true)
  }
  const handleQuoteModalClose = () => {
    setOpenQuotesModal(false)
  }

  // Function to fetch the pipeline activities
  useEffect(() => {
    const fetchPipelineActivities = async () => {
      try {
        const response = await api.get(`get-lead-activities-list/${editId}`)
        setPipelineData(response?.data?.data?.data)
      } catch (error) {}
    }
    fetchPipelineActivities()
  }, [])
  useEffect(() => {
    const ticketId = searchParams.get('ticket')
    if (ticketId) {
      setActiveTab('task')
    }
  }, [searchParams])
  return (
    <>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className='mb-2 flex justify-between border-b'>
          {/* Tab lists */}
          <TabsList className='dashboard-tabs grid grid-cols-5 gap-8 bg-white p-0'>
            <TabsTrigger
              value='Dashboard Overview'
              className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
            >
              Dashboard Overview
            </TabsTrigger>
            <TabsTrigger
              value='task'
              className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
            >
              Tickets
            </TabsTrigger>
            <TabsTrigger
              value='budget'
              className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
            >
              Quotes
            </TabsTrigger>
          </TabsList>
          <div className='flex justify-center gap-4 text-center'>
            <div className='relative top-[-0.5rem] flex h-8 items-center justify-between rounded border border-gray-300 bg-white px-3 text-sm text-gray-800'>
              <button
                onClick={() => DCSOpenModal(editData)}
                className='flex items-center space-x-2'
                aria-label='Edit Lead'
              >
                <div className='relative h-4 w-24 overflow-hidden rounded-full bg-green-100'>
                  <div
                    className='h-full rounded-full bg-green-500'
                    style={{ width: `${cleanedDcs}%` }}
                  />
                  <span className='absolute inset-0 flex items-center justify-center text-xs font-medium text-green-800'>
                    {cleanedDcs}%
                  </span>
                </div>
                <Pencil className='h-3 w-3 text-gray-800' />
              </button>
            </div>
            <div className='relative top-[-0.5rem] flex h-8 items-center justify-between rounded border border-gray-300 bg-white px-3 text-sm text-gray-800'>
              <span className='ml-4 text-red-600'>
                Lead Date: 19/02/2025 06:08 PM
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Overview Tab */}
        <TabsContent className='mt-0' value='Dashboard Overview'>
          {/* Dashboard bar */}
          <Card className='shadow-none'>
            <div className='theme-bg-light-rgba border-color-grey flex h-24 w-full items-center justify-around space-x-4 border-b text-base'>
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Lead status
                </CardDescription>
                <CardTitle className='text-base'>
                  {editData?.leadStatus?.title}
                </CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Last Contact Type
                </CardDescription>
                <CardTitle className='text-base'>
                  You Sent SMS to Customer
                </CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Last Contact Date
                </CardDescription>
                <CardTitle className='text-base'>16/02/2025</CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Next Step
                </CardDescription>
                <CardTitle className='text-base'>
                  {editData.nextAction || 'NA'}
                </CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Next Step Date
                </CardDescription>
                <CardTitle className='text-base'>
                  {' '}
                  {formatDate(editData.nextStepDate)}
                </CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Region
                </CardDescription>
                <CardTitle className='text-base'>
                  {editData?.project?.state}
                </CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Sales Person
                </CardDescription>
                <CardTitle className='text-base'>
                  {editData?.salePerson?.name}
                </CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div
                className='m-0 cursor-pointer text-center'
                onClick={() => router.push('/dashboard/view-pipeline')}
              >
                <CardDescription className='text-light-color text-sm font-medium'>
                  Pipeline
                </CardDescription>
                <CardTitle className='text-base'>
                  {editData?.pipelineType?.name}
                </CardTitle>
              </div>{' '}
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Pipeline Status
                </CardDescription>
                <CardTitle className='text-base'>
                  {editData?.pipelineStatus?.name}
                </CardTitle>
              </div>
            </div>
          </Card>
          {/* Accordion */}
          <Accordion
            type='single'
            collapsible
            className='w-full'
            defaultValue='general'
          >
            {/* Accordion General */}
            <AccordionItem value='general'>
              <AccordionTrigger className='Accordion-Trigger www mt-3 rounded bg-slate-300'>
                <span className='ml-3 text-lg text-black'>General</span>{' '}
              </AccordionTrigger>
              <AccordionContent className='flex flex-col gap-4 text-balance'>
                <General
                  handleEdit={handleEdit}
                  editData={editData}
                  editId={editId}
                  fetchLeadById={fetchLeadById}
                />
              </AccordionContent>
            </AccordionItem>
            {/* Accordion Pricing */}
            <AccordionItem value='pricing'>
              <AccordionTrigger className='Accordion-Trigger mt-3 rounded bg-slate-300'>
                <span className='ml-3 text-lg text-black'>Pricing</span>{' '}
              </AccordionTrigger>
              <AccordionContent className='flex flex-col gap-4 text-balance'>
                <Pricing editId={editId} editData={editData} />
              </AccordionContent>
            </AccordionItem>
            {/* Accordion Notes */}
            <AccordionItem value='notes'>
              <AccordionTrigger className='Accordion-Trigger mt-3 rounded bg-slate-300'>
                <span className='ml-3 text-lg text-black'>
                  Notes & Activities
                </span>{' '}
              </AccordionTrigger>
              <AccordionContent className='flex flex-col gap-4 text-balance'>
                <NotesActivies
                  editId={editId}
                  activitiesData={activitiesData}
                  getActivities={getActivities}
                  notesData={notesData}
                  getNotesApi={getNotesApi}
                  editData={editData}
                />
                <Card className='border-color-grey w-full overflow-hidden rounded border'>
                  <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
                    <CardTitle className='flex justify-between'>
                      <div className='!text-lg'>Pipeline Activities</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='mt-5'>
                    <LeadTimeline editData={editData} />
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
            {/* Accordion files */}
            {/* <AccordionItem value='Attachments'>
              <AccordionTrigger className='Accordion-Trigger www mt-3 rounded bg-slate-300'>
                <span className='ml-3 text-lg text-black'>
                  Attachments
                </span>{' '}
              </AccordionTrigger>
              <AccordionContent className='flex flex-col gap-4 text-balance'>
            
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </TabsContent>

        {/* Task Tab */}
        <TabsContent value='task'>
          <Card>
            {/* <CardDescription className='text-dark-color mt-7 pb-2 text-lg font-semibold'>
              Task
            </CardDescription> */}
            <TaskList editId={editId} editData={editData} />
          </Card>
          <Separator />
          <Card></Card>
        </TabsContent>

        {/* Qoutes tab */}
        <TabsContent value='budget'>
          <BudgetTable editId={editId} />
        </TabsContent>
      </Tabs>

      {/* Dialog/Modals */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'>
          <DialogHeader></DialogHeader>
          <EditLeads
            handleModalClose={handleModalClose}
            editLeadId={editId}
            setOpenDialog={setOpenDialog}
            fetchLeadById={fetchLeadById}
          />
        </DialogContent>
      </Dialog>
      <DcsModal
        getListLeads={fetchLeadById}
        isOpen={dcsModalOpen}
        onClose={() => setDcsModalOpen(false)}
        dcsValue={selectedDcsValue}
      />
    </>
  )
}
