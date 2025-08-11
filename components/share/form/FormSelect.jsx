import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const FormSelectField = ({
  name,
  form,
  label,
  className,
  placeholder = 'Select an option',
  options,
  disabled,
  onChange
}) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            value={field.value || ''}
            onValueChange={value => {
              field.onChange(value)
              onChange?.(value)
            }}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl
              className={`border-color-grey h-12 rounded !bg-white !shadow-none ace-employ${
                fieldState.error ? 'border-red-500' : ''
              } ${className}`}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='!text-[11px]'>
              {options?.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.icon ? (
                    <>
                      <option.icon className="mr-2 inline h-5 w-5 " />
                      {option.label}
                    </>
                  ) : (
                    option.label
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
          {/* <FormDescription /> */}
        </FormItem>
      )}
    />
  )
}

export default FormSelectField