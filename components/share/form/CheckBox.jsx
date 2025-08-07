import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const FormCheckBox = ({ name, form, items = [], label, className }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <div className='mb-2'>
              <FormLabel className='text-base'>{label}</FormLabel>
            </div>
          )}
          <div className={className}>
            {items.map(item => (
              <FormItem
                key={item.id || item.value}
                className='flex flex-row items-center space-x-3 space-y-0'
              >
                <label className='flex cursor-pointer flex-row items-center space-x-3'>
                  <FormControl>
                    <Checkbox
                      checked={
                        Array.isArray(field.value)
                          ? field.value.includes(item.value)
                          : Boolean(field.value)
                      }
                      onCheckedChange={checked => {
                        const current = field.value

                        if (Array.isArray(current)) {
                          const updated = checked
                            ? [...current, item.value]
                            : current.filter(v => v !== item.value)
                          field.onChange(updated)
                        } else {
                          field.onChange(checked)
                        }
                      }}
                    />
                  </FormControl>
                  <span className='text-sm font-normal'>{item.label}</span>
                </label>
              </FormItem>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormCheckBox
