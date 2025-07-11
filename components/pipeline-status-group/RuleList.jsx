import PipelineStatusServices from '@/services/Pipeline/pipeline'
import { Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import SelectFilter from '../share/form/SelectFilter'
import { selectType } from '../static-Values'
import { Button } from '../ui/button'
export default function RuleList({
  control,
  index,
  form,
  leadType,
  status,
  setRemoveRuleIds,
  editData
}) {
  const { watch } = form
  const [piplineGroup, setPipelineGroup] = useState([])
  const [pipelineStatusGroup, setPipeLineStatusGroup] = useState([])
  const { fields, append, remove } = useFieldArray({
    control,
    name: `statusGroup.pipelineStatus[${index}].rules`
  })
  const {
    fields: pipelineGlobalfield,
    append: pipelineGlobalappend,
    remove: pipelineGlobalremove
  } = useFieldArray({
    control,
    name: `statusGroup.pipelineStatus[${index}].pipelineGlobal`
  })
  const watchedPipeline = useWatch({
    control,
    name: `statusGroup.pipelineStatus[${index}].pipelineGlobal`
  })
  const watchedRules = useWatch({
    control,
    name: `statusGroup.pipelineStatus[${index}].rules`
  })
  const pipelineAppended = useRef(false)
  useEffect(() => {
    if (!pipelineAppended.current && pipelineGlobalfield?.length === 0) {
      pipelineGlobalappend({
        pipeline: '',
        pipelineStatus: ''
      })
      pipelineAppended.current = true
    }
  }, [pipelineGlobalfield?.length])
  const selectedTypes = watchedRules?.map(r => r?.type).filter(Boolean) || []
  const availableOptions = selectType?.filter(
    opt => !selectedTypes.includes(opt?.value)
  )
  const canAddMoreRules = availableOptions.length > 0
  const hasAppended = useRef(false)
  useEffect(() => {
    if (
      fields.length === 0 &&
      availableOptions.length > 0 &&
      !hasAppended.current
    ) {
      append({ type: availableOptions[0].value, value: '' })
      hasAppended.current = true
    }
  }, [fields.length, availableOptions.length])
  const handleRemove = (ruleIndex, ruleId) => {
    if (ruleId) {
      setRemoveRuleIds(prev => [...prev, ruleId])
    }
    remove(ruleIndex)
  }
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [pipeline] = await Promise.all([
          PipelineStatusServices.getPipelineStatus()
        ])
        if (pipeline.status === 200) {
          const modifyProjectData = pipeline?.data?.data.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
          setPipelineGroup([
            { label: 'Select Pipeline', value: '' },
            ...modifyProjectData
          ])
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }
    fetchAllData()
  }, [])
  useEffect(() => {
    const fetchStatuses = async () => {
      const response = await PipelineStatusServices.getPipelineStatus()
      if (response.status === 200) {
        const allPipelines = response.data.data
        const newStatusMap = []
        watchedPipeline?.forEach((entry, i) => {
          const matched = allPipelines?.find(p => p?.id == entry?.pipeline)
          if (matched) {
            newStatusMap[i] = matched?.statusGroup?.pipelineStatus
            newStatusMap[i] =
              matched?.statusGroup?.pipelineStatus?.map(item => ({
                label: item?.status,
                value: item?.id
              })) || []
          }
        })
        setPipeLineStatusGroup(newStatusMap)
      }
    }
    fetchStatuses()
  }, [watchedPipeline])
  return (
    <>
      <div className='flex w-full flex-col gap-4 lg:flex-row'>
        {/* Left Side – Rules */}
        <div className='flex w-full min-w-[300px] flex-col gap-4 lg:w-1/2'>
          {fields.map((rule, ruleIndex) => {
            const ruleType = watchedRules?.[ruleIndex]?.type
            const optionsForRule = selectType.filter(
              opt =>
                !selectedTypes.includes(opt.value) || opt.value === ruleType
            )

            return (
              <div key={ruleIndex} className='rounded-md bg-white p-4'>
                {ruleIndex === 0 ? (
                  <div className='text-base'>Select Tags & Status</div>
                ) : (
                  ''
                )}
                <div
                  key={rule.id}
                  className={`flex items-center gap-4 ${ruleIndex === 0 ? 'mt-5' : ''}`}
                >
                  <div className='w-full min-w-[150px]'>
                    <SelectFilter
                      className='w-full'
                      form={form}
                      name={`statusGroup.pipelineStatus[${index}].rules[${ruleIndex}].type`}
                      placeholder='Select Group Type'
                      options={optionsForRule}
                    />
                  </div>
                  <div className='w-full min-w-[150px]'>
                    <SelectFilter
                      className='w-full'
                      form={form}
                      name={`statusGroup.pipelineStatus[${index}].rules[${ruleIndex}].value`}
                      placeholder={
                        ruleType === 'tag' ? 'Select Tag' : 'Select Status'
                      }
                      options={ruleType === 'tag' ? leadType : status}
                    />
                  </div>
                  <Button
                    type='button'
                    variant='ghost'
                    className='flex h-8 w-8 items-center justify-center'
                    onClick={() => {
                      const ruleId = form.getValues(
                        `statusGroup.pipelineStatus[${index}].rules[${ruleIndex}].id`
                      )
                      handleRemove(ruleIndex, ruleId)
                    }}
                  >
                    <Trash2 className='h-5 w-5 text-red-500' />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side – Pipeline Fields (50%) */}
        {editData && (
          <div className='rounded-md bg-white p-4'>
            <div className='text-base'>Move Pipeline </div>
            <div className='mt-3 grid w-full min-w-[750px] grid-cols-2 items-start gap-4 lg:w-1/2'>
              <div className=''>
                <SelectFilter
                  className='w-full'
                  form={form}
                  label='Select Pipeline'
                  name={`statusGroup.pipelineStatus[${index}].pipelineGlobal[0].pipeline`}
                  placeholder='Select Pipeline'
                  options={piplineGroup}
                />
              </div>
              <div className=''>
                <SelectFilter
                  className='w-full'
                  form={form}
                  label='Select Pipeline Status'
                  name={`statusGroup.pipelineStatus[${index}].pipelineGlobal[0].pipelineStatus`}
                  placeholder='Select Pipeline Status'
                  options={[
                    { label: 'Select Pipeline Status', value: '' },
                    ...(pipelineStatusGroup?.[0] || [])
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {canAddMoreRules && (
        <Button
          type='button'
          className='segment-button m-5'
          onClick={() => {
            const nextType = availableOptions[0]?.value
            if (nextType) {
              append({ type: nextType, value: '' })
            }
          }}
        >
          + Add Rule
        </Button>
      )}
      {/* <div className='mt-3'>
        {pipelineGlobalfield?.map((pipeline, pipelineIndex) => {
          return (
            <>
              {editData && (
                <>
                  <div
                    key={pipelineIndex}
                    className='gap -4 mb-4 ml-5 mt-4 grid grid-cols-2 gap-4'
                  >
                    <SelectFilter
                      form={form}
                      name={`statusGroup.pipelineStatus[${index}].pipelineGlobal[${pipelineIndex}].pipeline`}
                      label='Select Pipeline '
                      placeholder='Select Pipeline'
                      options={piplineGroup}
                    />
                    <SelectFilter
                      form={form}
                      name={`statusGroup.pipelineStatus[${index}].pipelineGlobal[${pipelineIndex}].pipelineStatus`}
                      label='Select Pipeline Status'
                      placeholder='Select Pipeline Status'
                      options={[
                        { label: 'Select Pipeline Status', value: '' },
                        ...(pipelineStatusGroup[pipelineIndex] || [])
                      ]}
                    />
                  </div>
                </>
              )}
            </>
          )
        })}
      </div> */}
    </>
  )
}
