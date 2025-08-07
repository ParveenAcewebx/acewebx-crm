import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'



const FormRadioButton = ({
  name,
  form,
  label,
  options,
  onChange,
  className
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className={`mb-2`}>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value) 
                onChange?.(value) 
              }}
              value={field.value} 
              className={`flex flex-col space-y-1${className}`}
            >
              {options?.map((option) => (
                <FormItem
                  key={option.value}
                  className='flex items-center space-x-3 space-y-0 !mt-0 radio-btn'
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className='font-normal !ml-2'>{option.label}</FormLabel>
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

export default FormRadioButton
