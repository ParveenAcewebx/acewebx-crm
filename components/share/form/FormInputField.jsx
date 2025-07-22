import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const FormInputField = ({
  name,
  form,
  placeholder,
  label,
  disable,
  type,
  className,
  onClick,
  value,
  defaultValue,
  max,
  readOnly,
  inputType
}) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              onClick={onClick}
              disabled={disable}
              value={value ?? field.value}
              readOnly={readOnly && readOnly}
              defaultValue={defaultValue && defaultValue}
              className={`custom-radius border-color-grey h-12 !rounded bg-white !shadow-none ${
                fieldState.error ? 'border-red-500' : ''
              } ${className}`}
              placeholder={placeholder}
              type={inputType}
              min={0}
              max={max && max}
              step='any'
            />
          </FormControl>
          <FormMessage />
          {/* <FormDescription /> */}
        </FormItem>
      )}
    />
  )
}

export default FormInputField
