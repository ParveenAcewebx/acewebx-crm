"use client"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from '@/components/ui/form';
  import { Input } from '@/components/ui/input';

  const ImageUpload =({
    name,
    form,
    label,
    disable,
    className
  }) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <Input
                id={name}
                type="file"
                disabled={disable}
                className={className}
                onChange={(e) => {
                  const file = e.target.files; // Get the first selected file
                  onChange(file); // Store the file object in the form state
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  export default ImageUpload;