'use client'

import { Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import CustomMultiSelectDropdown from '../share/form/CustomMultiSelectInput'
import FormInputField from '../share/form/FormInputField'
import { Button } from '../ui/button'

const SegmentForm = ({ form, catindex, groupIdx }) => {
  const { control } = form

  const {
    fields: segments,
    append: appendSegment,
    remove: removeSegment
  } = useFieldArray({
    control,
    name: `categories.${catindex}.groups.${groupIdx}.sagments`
  })

  const handleAppendSegment = () => {
    appendSegment({
      title: '',
      url: '',
      option: []
    })
  }

  return (
    <>
      {segments.map((segment, index) => {
        return (
          <>
            <div className='mb-4 ml-10 rounded border p-4'>
              <div
                className='grid grid-cols-[1fr_1fr_1fr_auto] items-start gap-4'
                key={segment.id}
              >
                {/* Segment Name */}
                <FormInputField
                  form={form}
                  name={`categories.${catindex}.groups.${groupIdx}.sagments.${index}.title`}
                  label='Segment Name'
                  placeholder='Enter Segment Name'
                />

                {/* URL */}
                <FormInputField
                  form={form}
                  name={`categories.${catindex}.groups.${groupIdx}.sagments.${index}.url`}
                  label='URL'
                  placeholder='Enter URL'
                />

                {/* Options */}
                <CustomMultiSelectDropdown
                  name={`categories.${catindex}.groups.${groupIdx}.sagments.${index}.option`}
                  label='Options'
                  options={[]}
                />

                {/* Remove Segment */}
                <div className='mt-8'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => removeSegment(index)}
                  >
                    <Trash2 className='h-5 w-5 text-red-600' />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )
      })}

      <div className='ml-10 mt-3'>
        <Button
          type='button'
          onClick={handleAppendSegment}
          className='segment-button'
        >
          Add Segment
        </Button>
      </div>
    </>
  )
}

export default SegmentForm
