import { Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { Button } from '../ui/button'
import SegmentForm from './SegmentForm'

const GroupField = ({ catindex, form }) => {
  const { control } = form
  const {
    fields: group,
    append: appendGroup,
    remove: removeGroup
  } = useFieldArray({
    control,
    name: `categories.${catindex}.groups`
  })
  const defaultGroupRow = {
    title: '',
    sagments: []
  }
  const handleAppendGroup = () => {
    appendGroup(defaultGroupRow)
  }
  const deleteRowGroup = groupIdx => {
    removeGroup(groupIdx)
  }
  return (
    <>
      {group.map((item, groupIdx) => {
        return (
          <>
            <div className='mb-2 ml-3 mt-5 flex add-fileds gap-2'>
              <FormInputField
                form={form}
                name={`categories.${catindex}.groups.${groupIdx}.title`}
                label='Group Name'
                placeholder='Enter Group Name'
              />
              <Button
                type='button'
                variant='ghost'
                className='mt-10 h-6 w-6'
                onClick={() => deleteRowGroup(groupIdx)}
              >
                <Trash2 className='h-4 w-4 text-red-500' />
              </Button>
            </div>

            <SegmentForm form={form} catindex={catindex} groupIdx={groupIdx} />
          </>
        )
      })}

      <div className='ml-3 mt-3'>
        <Button
          type='button'
          onClick={handleAppendGroup}
          className='group-button'
        >
          Add Group
        </Button>
      </div>
    </>
  )
}

export default GroupField
