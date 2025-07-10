'use client'

import LeadsSettingServices from '@/services/Settings/LeadSetting'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import FormRadioButton from '../share/form/FormInputRadioButtom'
import SelectFilter from '../share/form/SelectFilter'
import { PipelineType, statusGroup } from '../static-Values'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import DayIndicator from './DayIndicator'
import RuleList from './RuleList'

export default function AddPipelineStatusForm({
  form,
  setRemovedIds,
  editData,
  setRemoveRuleIds,
  setRemovedDayIds
}) {
  const { control, watch, getValues } = form
  const [leadType, setLeadType] = useState([])
  const [status, setStatus] = useState([])
  const [expandedRows, setExpandedRows] = useState({})
  const [chooseStatus, setChooseStatus] = useState([])
  useEffect(() => {
    if (editData) {
      const currentStatus = editData?.statusGroup?.pipelineStatus?.map(item => {
        return {
          label: item?.status,
          value: item?.id
        }
      })
      setChooseStatus(currentStatus)
    }
  }, [editData])
  // setChooseStatus()
  const toggleRow = index => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'statusGroup.pipelineStatus'
  })

  const expectedDaysList = useWatch({
    control: form.control,
    name: 'statusGroup.pipelineStatus'
  })

  const handleRemove = (index, id) => {
    if (id) {
      setRemovedIds(prev => [...prev, id])
    }
    remove(index)
  }

  const pipelineType = watch('materialType')

  useEffect(() => {
    const fetchLeadTypes = async () => {
      try {
        const response = await LeadsSettingServices.getTags()
        if (response.status === 200) {
          const modified = response.data?.data.map(item => ({
            label: item.title,
            value: item.id
          }))
          setLeadType(modified)
        }
      } catch (error) {
        console.error('Error fetching lead types:', error)
      }
    }

    if (pipelineType === 'lead') {
      fetchLeadTypes()
    } else {
      setLeadType(statusGroup)
    }
  }, [pipelineType])

  useEffect(() => {
    const fetchLeadStatuses = async () => {
      try {
        const response = await LeadsSettingServices.getLeadsStatus()
        if (response.status === 200) {
          const modified = response.data?.data.map(item => ({
            label: item.title,
            value: item.id
          }))
          setStatus(modified)
        }
      } catch (error) {
        console.error('Error fetching lead statuses:', error)
      }
    }

    if (pipelineType === 'lead') {
      fetchLeadStatuses()
    } else {
      setStatus([])
    }
  }, [pipelineType])
  // Watch all defaultStatus values
  const defaultStatusValues = useWatch({
    control,
    name: 'statusGroup.pipelineStatus'
  })

  useEffect(() => {
    if (!defaultStatusValues) return

    const selectedIndex = defaultStatusValues.findIndex(
      item => item?.defaultStatus === 'true'
    )

    if (selectedIndex !== -1) {
      defaultStatusValues.forEach((item, i) => {
        if (i !== selectedIndex && item?.defaultStatus === 'true') {
          form.setValue(`statusGroup.pipelineStatus[${i}].is_default`, '')
        }
      })
    }
  }, [defaultStatusValues, form])

  // calculate sum & percentage of expected days
  useEffect(() => {
    if (!expectedDaysList || expectedDaysList.length === 0) return

    const total = expectedDaysList.reduce((acc, row) => {
      const val = Number(row?.expectedDays)
      return acc + (isNaN(val) ? 0 : val)
    }, 0)

    const currentTotal = form.getValues('totaldays')
    if (currentTotal !== total) {
      form.setValue('totaldays', total, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false
      })
    }

    expectedDaysList.forEach((row, index) => {
      const rawVal = row?.expectedDays
      const val = Number(rawVal)

      const safeVal = isNaN(val) || val === null ? 0 : val
      const percent = total > 0 ? ((safeVal / total) * 100).toFixed(2) : '0.00'

      const currentPercent = form.getValues(
        `statusGroup.pipelineStatus[${index}].percentage`
      )

      if (currentPercent !== percent) {
        form.setValue(
          `statusGroup.pipelineStatus[${index}].percentage`,
          percent,
          {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false
          }
        )
      }
    })
  }, [expectedDaysList])

  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='name'
          label='Name'
          placeholder='Enter Name'
        />
        <SelectFilter
          form={form}
          name='materialType'
          placeholder='Select Pipeline Type'
          label='Pipeline Type'
          options={PipelineType}
        />
      </div>

      <div className='!my-6 flex justify-between'>
        <h4 className='text-xl font-semibold text-gray-800'>Status Group</h4>
      </div>

      <Table className='w-full border text-black'>
        <TableHeader>
          <TableRow className='bg-blue-300'>
            <TableHead className='text-left'>Status</TableHead>
            <TableHead className='text-left'>Order</TableHead>
            <TableHead className='text-left'>Select Default Status</TableHead>
            <TableHead className='relative gap-4 text-left'>
              <span>Expected Days</span>{' '}
              <span className='ml-5'>Percentage</span>{' '}
            </TableHead>
            <TableHead className='w-20 text-left'>Color</TableHead>

            <TableHead className='text-left'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-blue-100'>
          {fields.map((field, index) => {
            return (
              <>
                <TableRow className='border-black-300 rounded-md border bg-blue-50'>
                  <TableCell className='border-black-300 relative rounded-l-md border-r bg-blue-50 py-3 pl-4'>
                    <FormInputField
                      form={form}
                      name={`statusGroup.pipelineStatus[${index}].status`}
                      placeholder='Enter Status'
                    />
                  </TableCell>
                  <TableCell className='bg-blue-50 py-2'>
                    <FormInputField
                      form={form}
                      name={`statusGroup.pipelineStatus[${index}].order`}
                      type='number'
                      placeholder='Enter Order'
                    />
                  </TableCell>
                  <TableCell className='bg-blue-50 py-2'>
                    <FormRadioButton
                      name={`statusGroup.pipelineStatus[${index}].is_default`}
                      className='mt-4 flex flex-row justify-center gap-3'
                      form={form}
                      options={[
                        {
                          label: '',
                          value: 'true'
                        }
                      ]}
                      onChange={() => {
                        fields.forEach((_, i) => {
                          form.setValue(
                            `statusGroup.pipelineStatus[${i}].is_default`,
                            i === index ? 'true' : ''
                          )
                        })
                      }}
                    />
                  </TableCell>
                  <TableCell className='bg-blue-50 py-2'>
                    <div className='relative w-56 gap-4'>
                      <FormInputField
                        form={form}
                        name={`statusGroup.pipelineStatus[${index}].expectedDays`}
                        placeholder='Enter Expected Days'
                        type='number'
                        className='w-full pr-20' // extra space for percentage field
                      />

                      <div className='absolute right-2 top-1/2 flex -translate-y-1/2 items-center'>
                        <FormInputField
                          form={form}
                          name={`statusGroup.pipelineStatus[${index}].percentage`}
                          readOnly
                          className='pointer-events-none w-12 rounded border border-gray-300 bg-white p-1 text-right text-sm'
                        />
                        <span className='ml-1 text-sm text-muted-foreground'>
                          %
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className='bg-blue-50 py-2'>
                    <FormInputField
                      form={form}
                      name={`statusGroup.pipelineStatus[${index}].statusColor`}
                      type='color'
                      placeholder='Choose color'
                    />
                  </TableCell>
                  <TableCell className='relative grid grid-cols-2 gap-2 bg-blue-50 py-2 pl-8'>
                    {getValues(
                      `statusGroup.pipelineStatus[${index}].leadCount`
                    ) > 0 ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type='button'
                              variant='ghost'
                              className='mt-3 h-6 w-6'
                            >
                              <Trash2 className='h-4 w-4 text-red-300' />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Cannot delete. Leads exist.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Button
                        type='button'
                        variant='ghost'
                        className='mt-3 h-6 w-6'
                        onClick={() =>
                          handleRemove(
                            index,
                            getValues(`statusGroup.pipelineStatus[${index}].id`)
                          )
                        }
                      >
                        <Trash2 className='h-4 w-4 text-red-500' />
                      </Button>
                    )}

                    <Button
                      type='button'
                      onClick={() => toggleRow(index)}
                      className='text-dark-color rounded text-white'
                    >
                      {expandedRows[index] ? 'Close' : 'Set Rule'}
                    </Button>
                  </TableCell>
                </TableRow>

                {expandedRows[index] && (
                  <TableRow className='border-t-2 border-blue-200 !bg-blue-200'>
                    <TableCell colSpan={7} className='bg-blue-100'>
                      <RuleList
                        control={control}
                        index={index}
                        form={form}
                        leadType={leadType}
                        status={status}
                        setRemoveRuleIds={setRemoveRuleIds}
                        editData={editData}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )
          })}
          {/* calculate Expected Days sum */}
          {/* <TableCell colSpan={3}></TableCell> */}
          {/* <TableCell className='py-2'> */}
          <FormInputField
            form={form}
            // label='Total'
            name={`totaldays`}
            type='hidden'
          />
          {/* </TableCell> */}
        </TableBody>
      </Table>

      <Button
        type='button'
        className='site-button-small mt-4 text-white'
        onClick={() => append({ status: '', order: '' })}
      >
        + Add More
      </Button>
      <DayIndicator
        form={form}
        editData={editData}
        setRemovedDayIds={setRemovedDayIds}
      />
    </>
  )
}
