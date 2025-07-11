import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'


const RadioButton = ({
  name,
  form,
  label,
  options,
  onChange
}) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl
            className={`radio-collunm !mb-5 !flex-row !flex-nowrap gap-4`}
          >
            <RadioGroup
              onValueChange={value => {
                field.onChange(value)
                onChange?.(value)
              }}
              value={field.value}
              className='flex flex-col justify-center space-y-1'
            >
              {options?.map(option => (
                <FormItem
                  key={option.value}
                  className='radio-btn !mt-0 flex items-center justify-center space-x-3 space-y-0'
                >
                  <FormControl>
                    <RadioGroupItem className='border-gray-500' value={option.value} />
                  </FormControl>
                  <FormLabel className='!ml-2 font-normal'>
                    {option.label}
                  </FormLabel>
                </FormItem>   
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default RadioButton
