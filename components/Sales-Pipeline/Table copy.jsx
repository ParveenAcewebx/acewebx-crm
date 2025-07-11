'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import api from '@/lib/api'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { differenceInDays, format, isBefore } from 'date-fns'
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
  ExternalLink,
  Eye,
  EyeOff,
  Snowflake
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import FormDatePicker from '../share/form/datePicker'
import FormTextArea from '../share/form/TextArea'

export const generateRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`
}

function DroppableSectionHeader({
  type,
  val,
  expandedSections,
  toggleSection,
  sectionColumnVisibility,
  setSectionColumnVisibility,
  setHideId,
  setHideValue,
  sectionColors
}) {
  const { setNodeRef } = useDroppable({ id: type })
  const hideShow = sectionColumnVisibility[type]
  const toggleColumn = type => {
    const newValue = !sectionColumnVisibility[type]
    setHideId(type)
    setHideValue(newValue)
    setSectionColumnVisibility(prev => ({
      ...prev,
      [type]: newValue
    }))
  }

  return (
    <TableRow ref={setNodeRef}>
      <TableCell
        colSpan={13}
        className={
          !hideShow
            ? 'cursor-pointer bg-gray-100 px-4 py-3 text-lg font-semibold opacity-65'
            : 'cursor-pointer bg-gray-100 px-4 py-3 text-lg font-semibold'
        }
        style={{
          backgroundColor: sectionColors,
          color: 'white',
          borderRadius: '10px'
        }}
      >
        <div className='grid grid-cols-[96%,4%]'>
          <div className='' onClick={() => toggleSection(type)}>
            <span>{val}</span>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              {hideShow ? (
                <Eye
                  className='ml-3 cursor-pointer'
                  onClick={() => toggleColumn(type)}
                />
              ) : (
                <EyeOff
                  className='ml-3 cursor-pointer'
                  onClick={() => toggleColumn(type)}
                />
              )}
            </div>
            <div onClick={() => toggleSection(type)}>
              {expandedSections[type] ? (
                <ChevronDown className='mr-2' />
              ) : (
                <ChevronRight className='mr-2' />
              )}
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}

function DraggableTableRow({
  opp,
  typeSection,
  setLeadIdRelatedType,
  setLeadId,
  data,
  setOpenDialog,
  setOpenDialogTypeSection,
  hideShow,
  pipelineDelayIndicator,
  // form,
  setTypeId,
  hideLeadPipeline,
  setLeadPipeline,
  setHideLeadId,
  setStatusId,
  setHideLeadValue
}) {
  const leadId = opp.id
  const salesPipelineId = opp?.pipelineDelayIndicator?.pipelineId

  const [openDelayModal, setOpenDelayModal] = useState(false)
  const form = useForm({
    defaultValues: {
      delayDate: new Date(),
      delayReason: ''
    }
  })
  const router = useRouter()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: String(opp.id),
      data: opp
    })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const getColor = (type, map) => map[type] || map.default

  const tagColors = {
    Assigned: ['#24a01f', '#c5ffc3'],
    'On Hold': ['#CA8A04', '#efdebb'],
    Hot: ['#f02828', '#ffb8b8'],
    default: ['#458fee', '#dbe7f7']
  }

  const handleMoveToNext = (typeId, leadId, opp) => {
    console.log('leadId', leadId)
    const userId = opp?.assignId?.id
    form.setValue('assigned_user', String(userId))
    form.setValue('nextStepDate', opp?.nextStepDate)
    setTypeId(typeId)
    const currentIndex = data?.findIndex(item => item.id === typeId)
    const nextTypeSection =
      currentIndex !== -1 ? data[currentIndex + 1] : data[currentIndex - 1]
    setLeadIdRelatedType(nextTypeSection?.id || data[currentIndex - 1]?.id)
    setLeadId(leadId)
    setOpenDialog(true)
  }

  const handleOptionsMoveToNext = leadId => {
    setTypeId(typeSection?.id)
    setLeadId(leadId)
    setOpenDialogTypeSection(true)
  }
  const target = new Date(opp.nextStepDate)
  console.log('typeSectiontypeSection', typeSection)
  const today = new Date()
  const targetFormatted = format(target, 'MM-dd-yyyy')
  const todayFormatted = format(today, 'MM-dd-yyyy')
  const isLess = targetFormatted < todayFormatted
  const diff = differenceInDays(todayFormatted, targetFormatted)
  const pipelineStatus = form.watch('pipelineStatus')

  // Flattened and filtered data for the current pipeline
  const getPipelineData =
    pipelineDelayIndicator?.flatMap(group =>
      group?.filter(item => item?.pipelineId == pipelineStatus)
    ) || []

  const getNearestMatch = () => {
    if (!getPipelineData || getPipelineData.length === 0) return null

    // Check for exact match
    const exactMatch = getPipelineData.find(item => item.delayDays === diff)
    if (exactMatch) return exactMatch

    // No exact match, find closest by absolute difference
    return getPipelineData.reduce((nearest, current) => {
      const nearestDiff = Math.abs(nearest.delayDays - diff)
      const currentDiff = Math.abs(current.delayDays - diff)
      return currentDiff < nearestDiff ? current : nearest
    })
  }

  const Nearest = getNearestMatch()

  const handleLeadHideShow = leadId => {
    setStatusId(typeSection?.id)
    const currentValue = hideLeadPipeline[leadId] || false
    const newValue = !currentValue
    setHideLeadValue(newValue)
    setHideLeadId(leadId)
    setLeadPipeline(prev => ({
      ...prev,
      [leadId]: newValue
    }))
  }

  // Delay date modal form submit
  const onDelaySubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('delayDate', data.delayDate || '')
      formData.append('delayReason', data.delayReason || '')

      const response = await api.get(
        `/api?sales_pipeline_id=${salesPipelineId}&lead_id=${leadId}`,
        data
      )
      console.log('response', response)
      setOpenDelayModal(false)
    } catch (error) {
      console.log('error', error)
    }
  }
  console.log('opppssssssss', opp)
  return (
    <TableRow
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`${!hideShow ? 'pointer-events-none select-none opacity-65' : ''} ${
        !opp.lastWeekActivity ? 'bg-[#E9F2FA]' : ''
      }${
        !hideLeadPipeline[opp.id]
          ? 'pointer-events-none select-none opacity-60'
          : ''
      } transition-opacity duration-300 hover:bg-gray-50`}
    >
      <TableCell className='border px-3 py-2'>
        <span className='flex items-center'>
          {opp.id}
          {!opp.lastWeekActivity && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className='ml-1 text-[#5B85A8]'
                  title='No activity in 7+ days'
                >
                  <Snowflake size={20} />
                </span>
              </TooltipTrigger>
              <TooltipContent>No recent activity</TooltipContent>
            </Tooltip>
          )}
        </span>
      </TableCell>
      <TableCell className='border px-3 py-2'>{opp.projectName}</TableCell>
      <TableCell className='border px-3 py-2'> {opp?.company}</TableCell>
      <TableCell className='border px-3 py-2'>{opp?.contactName}</TableCell>
      <TableCell className='border px-3 py-2'>{opp?.engineerName}</TableCell>
      <TableCell className='border px-3 py-2'>
        {format(new Date(opp.dateRecieved), 'MM-dd-yyyy')}
      </TableCell>
      <TableCell className='border px-3 py-2'>
        {' '}
        {format(new Date(opp.dueDate), 'MM-dd-yyyy')}
      </TableCell>
      <TableCell className='border px-3 py-2 font-semibold'>
        <TableCell className='px-3 py-2 font-semibold'>
          {
            <>
              <span className='mt-2'>
                {format(new Date(opp.nextStepDate), 'MM-dd-yyyy')}
              </span>
              <br />
              {isLess && (
                <>
                  {opp.isDelayed === 'true' ? (
                    <span style={{ color: 'green' }}>Delayed</span>
                  ) : (
                    <div
                      style={{
                        height: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        style={{
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                          border: `5px solid ${Nearest?.color || 'orange'}`,
                          backgroundColor: 'transparent'
                        }}
                      ></div>
                    </div>
                  )}
                </>
              )}
            </>
          }
        </TableCell>
      </TableCell>
      {/* <TableCell>{typeSection.expectedDays || '-'}</TableCell> */}
      <TableCell
        className={`border px-3 py-2 ${
          isBefore(new Date(opp.nextStepDate), new Date())
            ? 'bg-red-100 text-red-600'
            : ''
        }`}
      >
        <div className='flex items-center gap-2'>
          <span className='mt-2'>
            {format(new Date(opp.nextStepDate), 'MM-dd-yyyy')}
          </span>

          {isBefore(new Date(opp.nextStepDate), new Date()) && (
            <Dialog open={openDelayModal} onOpenChange={setOpenDelayModal}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <AlertCircle className='h-4 w-4 cursor-pointer text-red-600' />
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side='top'>
                    MARK THE PROJECT AS DELAYED
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delay Information</DialogTitle>
                </DialogHeader>

                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onDelaySubmit)}
                    className='space-y-4'
                  >
                    <FormDatePicker name='delayDate' label='Delay Date' />
                    <FormTextArea
                      name='delayReason'
                      label='Delay Reason'
                      placeholder='Enter Delay Reason'
                    />
                    <DialogFooter>
                      <Button type='submit'>Submit</Button>
                    </DialogFooter>
                  </form>
                </FormProvider>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </TableCell>
      <TableCell className='border px-3 py-2'>{opp.assign}</TableCell>
      <TableCell className='border px-3 py-2'>
        {opp.tags?.map(tag => {
          const [color, bg] = getColor(tag, tagColors)
          return (
            <span
              key={tag}
              className='mr-2 inline-block rounded-full px-2 py-1 text-xs font-medium'
              style={{ color, backgroundColor: bg }}
            >
              {tag}
            </span>
          )
        })}
      </TableCell>{' '}
      <TableCell className='border px-3 py-2'>{opp.priority}</TableCell>
      <TableCell className='w-28 border px-3 py-2 text-center'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='pointer-events-auto'>
            <Tooltip>
              {/* <TooltipTrigger asChild>
                <div
                  onClick={() => handleLeadHideShow(opp?.id)}
                  className='cursor-pointer text-gray-600'
                >
                  {hideLeadPipeline[opp?.id] ? (
                    <Eye className='mt-2 h-4 w-4' />
                  ) : (
                    <EyeOff className='mt-2 h-4 w-4' />
                  )}
                </div>
              </TooltipTrigger> */}
              <TooltipContent className='pipeline-tooltip'>
                {hideLeadPipeline[opp?.id] ? 'Hide' : 'Show'}
              </TooltipContent>
            </Tooltip>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() =>
                  router.push(`/dashboard/leads/preview?id=${opp.id}`)
                }
                className='cursor-pointer text-gray-600'
              >
                <ExternalLink className='mt-2 h-4 w-4' />
              </div>
            </TooltipTrigger>
            <TooltipContent className='pipeline-tooltip'>View</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <EllipsisVertical className='h-5 w-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem
                    onClick={() =>
                      handleMoveToNext(typeSection.id, opp.id, opp)
                    }
                    className='cursor-pointer text-green-600'
                  >
                    <ArrowRight />
                    Move to Next
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleOptionsMoveToNext(opp.id)}
                    className='cursor-pointer text-blue-600'
                  >
                    <ArrowRight />
                    Move By Option
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className='pipeline-tooltip'>option</TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  )
}

export function SalePipelineDataTable({
  apiData = [],
  loading,
  setLeadIdRelatedType,
  setLeadId,
  setOpenDialog,
  setOpenDialogTypeSection,
  pipelineDelayIndicator,
  form,
  setTypeId,
  setHideId,
  setHideValue,
  setHideLeadId,
  setHideLeadValue,
  setStatusId
}) {
  const [data, setData] = useState([])
  const [expandedSections, setExpandedSections] = useState({})
  const [dueDateSortOrder, setDueDateSortOrder] = useState('asc')
  const [receivedSortOrder, setReceivedSortOrder] = useState('asc')
  const [sectionColumnVisibility, setSectionColumnVisibility] = useState({})
  const [hideLeadPipeline, setLeadPipeline] = useState({})
  const [sectionColors, setSectionColors] = useState({})

  useEffect(() => {
    setData(apiData)

    // Default open all sections
    const defaultExpanded = {}
    const defaultVisibility = {}
    const defaultColors = {}
    apiData?.forEach(section => {
      const value = section?.hide_status == 1 ? true : false
      defaultExpanded[section.id] = true
      defaultColors[section.id] = generateRandomHexColor()
      defaultVisibility[section.id] = value
    })
    const defaultHideLead = {}

    apiData?.map(item => ({
      ...item,
      opportunities: item?.opportunities?.forEach(subItem => {
        const value = subItem?.leadPipelineStatus == 1 ? true : false
        defaultHideLead[subItem?.id] = value
      })
    }))
    setLeadPipeline(defaultHideLead)
    setExpandedSections(defaultExpanded)
    setSectionColumnVisibility(defaultVisibility)
    setSectionColors(defaultColors)
  }, [apiData])

  const toggleSection = type => {
    setExpandedSections(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }
  const columns = [
    { title: 'Id' },
    { title: 'Project Name' },
    { title: 'Company' },
    { title: 'Contact' },
    { title: 'Engineer' },
    { title: 'Received' },
    { title: 'Due Date' },
    { title: 'Next Step' },
    { title: 'Expected Days' },
    { title: 'Assign (B.I.C)' },
    { title: 'Tags' },
    { title: 'Priority' },

    {
      title: <div className='flex items-center gap-2'>Action </div>
    }
  ]

  const sortByDueDate = () => {
    const sortedData = data.map(lead => ({
      ...lead,
      opportunities: Array.isArray(lead.opportunities)
        ? [...lead.opportunities].sort((a, b) => {
            const dateA = a.dueDate ? new Date(a.dueDate) : null
            const dateB = b.dueDate ? new Date(b.dueDate) : null

            if (dateA && dateB) {
              return dueDateSortOrder === 'asc' ? dateA - dateB : dateB - dateA
            } else if (dateA) {
              return -1
            } else if (dateB) {
              return 1
            } else {
              return 0
            }
          })
        : []
    }))

    setDueDateSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setData(sortedData)
  }

  const sortByReceived = () => {
    const sortedData = data.map(lead => ({
      ...lead,
      opportunities: Array.isArray(lead.opportunities)
        ? [...lead.opportunities].sort((a, b) => {
            const dateA = a.dateRecieved ? new Date(a.dateRecieved) : null
            const dateB = b.dateRecieved ? new Date(b.dateRecieved) : null

            if (dateA && dateB) {
              return receivedSortOrder === 'asc' ? dateA - dateB : dateB - dateA
            } else if (dateA) {
              return -1
            } else if (dateB) {
              return 1
            } else {
              return 0
            }
          })
        : []
    }))

    setReceivedSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setData(sortedData)
  }

  return (
    <div className='overflow-hidden rounded-md bg-white shadow-md'>
      <Table>
        <TableHeader style={{ background: '#c3c3c3' }}>
          <TableRow>
            {columns?.map((col, index) => (
              <TableHead
                key={index}
                className='px-4 py-3 text-sm text-gray-700'
              >
                <div className='flex items-center gap-1'>
                  {col?.title}
                  {col?.title === 'Received' &&
                    (receivedSortOrder === 'asc' ? (
                      <ArrowDown
                        className='cursor-pointer'
                        onClick={sortByReceived}
                      />
                    ) : (
                      <ArrowUp
                        className='cursor-pointer'
                        onClick={sortByReceived}
                      />
                    ))}

                  {col?.title === 'Due Date' &&
                    (dueDateSortOrder === 'asc' ? (
                      <ArrowDown
                        className='cursor-pointer'
                        onClick={sortByDueDate}
                      />
                    ) : (
                      <ArrowUp
                        className='cursor-pointer'
                        onClick={sortByDueDate}
                      />
                    ))}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <br></br>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className='py-8 text-center'>
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='py-8 text-center text-gray-500'
              >
                No results found
              </TableCell>
            </TableRow>
          ) : (
            <SortableContext
              items={data}
              strategy={verticalListSortingStrategy}
            >
              {data.map(section => {
                console.log('section0000', section)
                return (
                  <React.Fragment key={section.type}>
                    <DroppableSectionHeader
                      type={section.id}
                      val={section.type}
                      setHideId={setHideId}
                      setHideValue={setHideValue}
                      expandedSections={expandedSections}
                      toggleSection={toggleSection}
                      sectionColumnVisibility={sectionColumnVisibility}
                      setSectionColumnVisibility={setSectionColumnVisibility}
                      hideStatus={section.hide_status}
                      sectionColors={sectionColors[section.id]}
                    />

                    {expandedSections[section.id] &&
                      !section.opportunities.length && (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className='py-8 text-center text-red-500'
                          >
                            No results found
                          </TableCell>
                        </TableRow>
                      )}
                    {expandedSections[section.id] &&
                      section.opportunities?.map(opp => (
                        <DraggableTableRow
                          key={opp.id}
                          hideLeadPipeline={hideLeadPipeline}
                          setLeadPipeline={setLeadPipeline}
                          setHideLeadId={setHideLeadId}
                          setHideLeadValue={setHideLeadValue}
                          setStatusId={setStatusId}
                          opp={opp}
                          hideShow={sectionColumnVisibility[section.id]}
                          typeSection={section}
                          setLeadIdRelatedType={setLeadIdRelatedType}
                          setLeadId={setLeadId}
                          data={data}
                          setOpenDialog={setOpenDialog}
                          setOpenDialogTypeSection={setOpenDialogTypeSection}
                          pipelineDelayIndicator={pipelineDelayIndicator}
                          form={form}
                          setTypeId={setTypeId}
                        />
                      ))}
                    <br></br>
                  </React.Fragment>
                )
              })}
            </SortableContext>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
