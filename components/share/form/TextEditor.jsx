import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Load ReactQuill only on the client side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const TextEditor = ({ name, form, label,className,placeholder }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactQuill
              {...field}
              value={field?.value}
              placeholder={placeholder}
              className={`text-editor ${className}`}
              theme='snow'
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextEditor




// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'

// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'

// const TextEditor = ({ name, form, label }) => {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <FormControl>
//             <ReactQuill
//               {...field}
//               value={field?.value}
//               className={`h-full`}
//               theme='snow'
//             />
//           </FormControl>
//           <FormDescription />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }
// export default TextEditor


// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'

// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'

// const TextEditor = ({ name, form, label }) => {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <FormControl>
//             <ReactQuill
//               {...field}
//               value={field?.value}
//               className={`h-full`}
//               theme='snow'
//             />
//           </FormControl>
//           <FormDescription />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }
// export default TextEditor
