import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

const FormTextArea = ({
  name,
  form,
  placeholder,
  label,
  content,
  className,
  disabled = false,
  value,
  onChange
}) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {content && <p className='text-sm text-gray-500'>{content}</p>}
          <FormControl>
            <Textarea
              disabled={disabled}
              className={`custom-radius border-color-grey h-12 rounded bg-white shadow-slate-100 ${className} ${
                fieldState.error ? 'border-red-500' : ''
              }`}
              {...field}
              value={field?.value?.replace(/<[^>]*>/g, '') || ''|| value }
              placeholder={placeholder}
              onChange={e => {
                field.onChange(e)        
                onChange?.(e)             
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormTextArea
