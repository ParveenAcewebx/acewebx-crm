import { Switch } from '@/components/ui/switch'
import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
const FormInputSwitchGroup = ({ label, items, formKey, idKey }) => {

  const { control, setValue, watch } = useFormContext()
  const data = watch(formKey) || []

  useEffect(() => {
    if (data.length === 0) {
      const initial = items?.map(item => ({
        [idKey]: item.id,
        is_include: false
      }))
      setValue(formKey, initial, { shouldDirty: true })
    }
  }, [items, idKey, setValue])

  const handleChange = (index, checked) => {
    const updated = [...data]
    updated[index] = {
      ...updated[index],
      is_include: checked
    }
    setValue(formKey, updated, { shouldValidate: true })
  }

  return (
    <div className='space-y-2 py-4'>
      <h3 className='text-md font-semibold'>{label}</h3>
      {items?.map((item, index) => {
        const switchId = `${formKey}-${index}`
        return (
          <label
            key={item.id}
            htmlFor={switchId}
            className='flex cursor-pointer items-center space-x-2 rounded px-2 py-1 transition hover:bg-gray-100'
          >
            <Controller
              control={control}
              name={`${formKey}.${index}.is_include`}
              render={({ field }) => (
                <Switch
                  id={switchId}
                  checked={field.value}
                  onCheckedChange={checked => {
                    field.onChange(checked)
                    handleChange(index, checked)
                  }}
                />
              )}
            />
            <span className='text-sm'>{item.title || item.name}</span>
          </label>
        )
      })}
    </div>
  )
}

export default FormInputSwitchGroup
