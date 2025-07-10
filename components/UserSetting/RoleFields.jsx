import api from '@/lib/api'
import { useEffect, useMemo, useState } from 'react'
import FormCheckBox from '../share/form/CheckBox'
import FormInputField from '../share/form/FormInputField'
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table'

const RoleFields = ({ form }) => {
  const [roles, setRole] = useState([])
  const fetchPermission = async () => {
    const response = await api.get('/get-permissions?limit=100')

    if (response.status === 200) {
      const data = response?.data?.data
      setRole(data)
    }
  }
  useEffect(() => {
    fetchPermission()
  }, [])
  const allPermissionIds = useMemo(() => {
    return Object.values(roles)
      .flat()
      .map(item => item.id)  }, [roles])

  // Handler for Select All
  const handleSelectAll = checked => {
    form.setValue('permissions', checked ? allPermissionIds : [])
  }

  // Determine if "Select All" is checked
  const isAllSelected = useMemo(() => {
    const selected = form.watch('permissions') || []
    return (
      allPermissionIds.length > 0 &&
      allPermissionIds.every(id => selected.includes(id))
    )
  }, [form.watch('permissions'), allPermissionIds])
  return (
    <>
      <FormInputField
        form={form}
        name='name'
        placeholder='Enter Role Name'
        label='Role Name'
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className='font-bold'>Administrator Access</TableCell>
            <TableCell>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={isAllSelected}
                  onChange={e => handleSelectAll(e.target.checked)}
                />
                Select All
              </label>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(roles).map(([key, items]) => (
            <TableRow key={key}>
              <TableCell className='capitalize'>
                {key.replace(/_/g, ' ')}
              </TableCell>
              <TableCell>
                <FormCheckBox
                  name='permissions'
                  className='grid grid-cols-4 gap-4'
                  form={form}
                  items={items.map(item => ({
                    value: item.id,
                    label: item.display_name
                  }))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default RoleFields

// import api from '@/lib/api'
// import { useEffect, useMemo, useState } from 'react'
// import FormCheckBox from '../share/form/CheckBox'
// import FormInputField from '../share/form/FormInputField'
// import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table'

// const RoleFields = ({ form }) => {
//   const [roles, setRole] = useState({})

//   const fetchPermission = async () => {
//     const response = await api.get('/get-permissions?limit=100')
//     if (response.status === 200) {
//       setRole(response?.data?.data)
//     }
//   }

//   useEffect(() => {
//     fetchPermission()
//   }, [])

//   // Flatten all permission IDs into one array
//   const allPermissionIds = useMemo(() => {
//     return Object.values(roles)
//       .flat()
//       .map(item => String(item.id))
//   }, [roles])

//   // Handler for Select All
//   const handleSelectAll = checked => {
//     form.setValue('permissions', checked ? allPermissionIds : [])
//   }

//   // Determine if "Select All" is checked
//   const isAllSelected = useMemo(() => {
//     const selected = form.watch('permissions') || []
//     return (
//       allPermissionIds.length > 0 &&
//       allPermissionIds.every(id => selected.includes(id))
//     )
//   }, [form.watch('permissions'), allPermissionIds])

//   return (
//     <>
//       <FormInputField
//         form={form}
//         name='name'
//         placeholder='Enter Role Name'
//         label='Role Name'
//       />

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell className='font-bold'>Administrator Access</TableCell>
//             <TableCell>
//               <label className='flex items-center gap-2'>
//                 <input
//                   type='checkbox'
//                   checked={isAllSelected}
//                   onChange={e => handleSelectAll(e.target.checked)}
//                 />
//                 Select All
//               </label>
//             </TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {Object.entries(roles).map(([key, items]) => (
//             <TableRow key={key}>
//               <TableCell className='capitalize'>
//                 {key.replace(/_/g, ' ')}
//               </TableCell>
//               <TableCell>
//                 <FormCheckBox
//                   name='permissions'
//                   className='grid grid-cols-4 gap-4'
//                   form={form}
//                   items={items.map(item => ({
//                     value: String(item.id),
//                     label: item.display_name
//                   }))}
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </>
//   )
// }

// export default RoleFields
