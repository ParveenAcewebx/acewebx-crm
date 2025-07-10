'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import UserContext from '@/contexts/UserContext'
import api from '@/lib/api'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { differenceInDays, format, isBefore } from 'date-fns'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  ClockAlert,
  EllipsisVertical,
  ExternalLink,
  Eye,
  EyeOff,
  Flame,
  FlameKindling,
  Snowflake
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useLocalStorage from 'use-local-storage'
import FormDatePicker from '../share/form/datePicker'
import FormTextArea from '../share/form/TextArea'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import { formatDatePipeline } from '../utils/dateFormat'

function DroppableSectionHeader({
  type,
  val,
  col,
  section,
  expandedSections,
  statusToggleHandler,
  sectionColumnVisibility,
  setSectionColumnVisibility,
  setHideId,
  setHideValue
}) {
  console.log('col', col + '1c')

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
            ? 'cursor-pointer bg-gray-400 px-4 py-3 text-lg font-semibold opacity-65'
            : 'cursor-pointer bg-gray-400 px-4 py-3 text-lg font-semibold'
        }
        style={{
          backgroundColor: col,
          color: 'white',
          borderRadius: '10px 10px 0 0'
        }}
      >
        <div className='grid grid-cols-[96%,4%]'>
          <div className='' onClick={() => statusToggleHandler(type)}>
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
            <div onClick={() => statusToggleHandler(type)}>
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
  col,
  setLeadIdRelatedType,
  setLeadId,
  data,
  apiData,
  setOpenDialog,
  setOpenDialogTypeSection,
  hideShow,
  handlePipelineStatus,
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
  const { selectedStatus } = useContext(UserContext)
  const [delayId, setDelayId] = useState('')
  const form = useForm({
    defaultValues: {
      due_date: new Date(),
      reason: ''
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
    transition,
    backgroundColor: col
  }

  const getColor = (type, map) => map[type] || map.default

  const tagColors = {
    Assigned: ['#24a01f', '#c5ffc3'],
    'On Hold': ['#CA8A04', '#efdebb'],
    Hot: ['#f02828', '#ffb8b8'],
    default: ['#458fee', '#dbe7f7']
  }

  const handleMoveToNext = (typeId, leadId, opp) => {
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
  const handleFireOpen = async leadId => {
    try {
      const data = {
        isHot: opp?.isHot == 0 ? 1 : 0,
        priority: opp?.isHot == 0 ? 'High' : 'Medium'
      }
      const response = await api.put(`/lead-update-hot/${leadId}`, data)
      handlePipelineStatus(selectedStatus)
    } catch (err) {
      console.error('Failed to mark as hot', err)
    }
  }

  const target = new Date(opp.nextStepDate)
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
      const formData = {
        due_date: formatDatePipeline(data?.due_date) || '',
        reason: data?.reason || ''
      }
      const response = await api.put(`/lead-update-reason/${delayId}`, formData)
      console.log('responseresponseresponse', response)
      setOpenDelayModal(false)
      handlePipelineStatus(selectedStatus)
    } catch (error) {
      console.log('error', error)
    }
  }

  const matchedDueDate = opp.leadPipelineStatus?.find(
    item => item.lead_id === opp.id && item.status_id === opp.pipelineStatus
  )

  return (
    <TableRow
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`${!hideShow ? 'pointer-events-none select-none opacity-65' : ''} ${
        !opp.lastWeekActivity ? 'bg-[#E9F2FA]' : ''
      }${' '} transition-opacity duration-300 hover:bg-gray-50`}
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
          matchedDueDate?.due_date &&
          isBefore(new Date(matchedDueDate?.due_date), new Date())
            ? 'bg-red-100 text-red-600'
            : ''
        }`}
      >
        <div className='flex items-center gap-2'>
          <span className='mt-2'>
            {matchedDueDate?.due_date
              ? format(new Date(matchedDueDate?.due_date), 'MM-dd-yyyy')
              : '--'}
          </span>

          {matchedDueDate?.due_date &&
            isBefore(new Date(matchedDueDate?.due_date), new Date()) && (
              <Dialog open={openDelayModal} onOpenChange={setOpenDelayModal}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <ClockAlert
                          onClick={() => setDelayId(matchedDueDate?.id)}
                          className='h-5 w-5 cursor-pointer text-red-600'
                        />
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side='top'>Add Delay Reason</TooltipContent>
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
                      <FormDatePicker
                        form={form}
                        name='due_date'
                        placeholder='Next Date'
                        label='Next Date'
                      />
                      <FormTextArea
                        form={form}
                        name='reason'
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
        {/* <Separator /> */}
        {/* {matchedDueDate?.reason && (
          <Tooltip>
            <TooltipTrigger className='cursor-pointer text-gray-800'>
              {matchedDueDate?.reason}
            </TooltipTrigger>
            <TooltipContent>{matchedDueDate?.reason}</TooltipContent>
          </Tooltip>
        )} */}
      </TableCell>
      <TableCell className='border px-3 py-2'>{opp.assign}</TableCell>
      <TableCell className='border px-3 py-2'>
        {opp.tags?.map(tag => {
          const [color, bg] = getColor(tag, tagColors)
          return (
            <span
              key={tag}
              className='mb-4 mr-2 inline-block rounded-full px-2 py-2 text-xs font-medium'
              style={{ color, backgroundColor: bg }}
            >
              {tag}
            </span>
          )
        })}
      </TableCell>{' '}
      <TableCell className='border px-3 py-2 text-center'>
        {opp?.isHot == 1 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className='ml-1 grid grid-cols-2 text-2xl text-red-600 drop-shadow-[0_0_5px_orange]'
                title='No activity in 7+ days'
              >
                <FlameKindling size={20} /> <FlameKindling size={20} />
              </span>
            </TooltipTrigger>
            <TooltipContent>Is Hot</TooltipContent>
          </Tooltip>
        )}
        <span className='text-center'>{opp.priority}</span>
      </TableCell>
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
                  window.open(`/dashboard/leads/preview?id=${opp.id}`, '_blank')
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
                  <DropdownMenuItem
                    onClick={() => handleFireOpen(opp.id)}
                    className='cursor-pointer text-red-600'
                  >
                    <Flame
                      className={
                        opp?.isHot == 0 ? 'text-red-600' : "'text-red-500'"
                      }
                    />
                    {opp?.isHot == 0 ? 'Mark Hot ' : 'UnMark Hot'}
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
  handlePipelineStatus,
  handleHideButton,
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
  setStatusId,
  showHiddenContent
}) {
  const [data, setData] = useState([])
  // const [expandedSections, setExpandedSections] = useState({})
  const [expandedSections, setExpandedSections] = useLocalStorage(
    'sale-pipeline-expanded',
    {}
  )
  const [forceHideAll, setForceHideAll] = useLocalStorage(
    'forcehideShow',
    expandedSections?.forceHideAll || false
  )
  const [dueDateSortOrder, setDueDateSortOrder] = useState('asc')
  const [receivedSortOrder, setReceivedSortOrder] = useState('asc')
  const [sectionColumnVisibility, setSectionColumnVisibility] = useState({})
  const [hideLeadPipeline, setLeadPipeline] = useState({})
  useEffect(() => {
    const updated = {}

    Object.keys(expandedSections).forEach(key => {
      updated[key] = !forceHideAll
    })
    setExpandedSections(updated)
  }, [forceHideAll])
  useEffect(() => {
    setData(apiData)

    const defaultVisibility = {}
    const defaultColors = {}

    // Merge with previously stored expandedSections
    const newExpandedSections = { ...expandedSections }

    apiData?.forEach(section => {
      const value = section?.hide_status == 1 ? true : false
      if (!(section.id in newExpandedSections)) {
        newExpandedSections[section.id] = true
      }

      defaultVisibility[section.id] = value
    })

    const defaultHideLead = {}

    apiData?.forEach(item => {
      item?.opportunities?.forEach(subItem => {
        const value = subItem?.leadPipelineStatus == 1 ? true : false
        defaultHideLead[subItem?.id] = value
      })
    })

    setLeadPipeline(defaultHideLead)
    setExpandedSections(newExpandedSections)
    setSectionColumnVisibility(defaultVisibility)
  }, [apiData])

  const statusToggleHandler = type => {
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
    { title: 'Expected Date' },
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
    <>
      <div className='mb-3 flex items-center justify-between'>
        <div></div>

        <div className='grid grid-cols-2 gap-2'>
          {' '}
          <div className='flex items-center space-x-2'>
            {' '}
            <Switch
              id='airplane'
              checked={forceHideAll}
              onClick={() => setForceHideAll(prev => !prev)}
            />
            <Label htmlFor='airplane'>{'  Collaps'}</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Switch
              id='airplane-mode'
              checked={showHiddenContent}
              onClick={handleHideButton}
            />
            <Label htmlFor='airplane-mode'>Show Hidden Status</Label>
          </div>
        </div>
      </div>

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
                <TableCell
                  colSpan={columns.length}
                  className='py-8 text-center'
                >
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
                  return (
                    <React.Fragment key={section.type}>
                      <DroppableSectionHeader
                        type={section.id}
                        val={section.type}
                        col={section?.statusColor}
                        setHideId={setHideId}
                        setHideValue={setHideValue}
                        expandedSections={expandedSections}
                        statusToggleHandler={statusToggleHandler}
                        sectionColumnVisibility={sectionColumnVisibility}
                        setSectionColumnVisibility={setSectionColumnVisibility}
                        hideStatus={section.hide_status}
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
                            col={section?.statusColor + '1c'}
                            hideLeadPipeline={hideLeadPipeline}
                            setLeadPipeline={setLeadPipeline}
                            setHideLeadId={setHideLeadId}
                            setHideLeadValue={setHideLeadValue}
                            apiData={apiData}
                            setStatusId={setStatusId}
                            opp={opp}
                            handlePipelineStatus={handlePipelineStatus}
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
    </>
  )
}
