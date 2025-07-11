import FormInputField from '@/components/share/form/FormInputField'
import RadioButton from '@/components/share/form/RadioButton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

const ThreadedRodSystemData = [
  {
    category: 'EXTERIOR SHEARWALL',
    items: [
      { id: 'exterior-shearwall', label: 'EXTERIOR SHEARWALL' },
      { id: 'exterior-load', label: 'EXTERIOR LOAD BEARING WALL' }
    ]
  },
  {
    category: 'INTERIOR SILL PLATE',
    items: [
      { id: 'interior-shearwall', label: 'INTERIOR SHEARWALL' },
      { id: 'interior-load', label: 'INTERIOR LOAD BEARING NON-SHEARWAL' },
      { id: 'interior-nonload', label: 'INTERIOR NON LOAD BEARING WALL' }
    ]
  }
]

const BugetScopeSPTab = ({ form }) => {
  const { control, setValue, getValues } = useFormContext()
  const projectScopes = useWatch({ control, name: 'projectScopes' })
  const sillPlate = useWatch({ control, name: 'sillPlate' })
  const resetSillPlate = getValues('sillPlate')
 

  const titleToFieldId = {
    'EXTERIOR SHEARWALL': 'exterior-shearwall',
    'EXTERIOR LOAD BEARING WALL': 'exterior-load',
    'INTERIOR SHEARWALL': 'interior-shearwall',
    'INTERIOR LOAD BEARING NON-SHEARWALL': 'interior-load', // fixed typo
    'INTERIOR NON LOAD BEARING WALL': 'interior-nonload'
  }
  // Format incoming sillPlate to form state structure
  useEffect(() => {
    if (!Array.isArray(resetSillPlate)) return

    const mapped = resetSillPlate.reduce((acc, item) => {
      console.log('item=--1', item)
      console.log("titleToFieldId[item.title]",item.title)
      const key = titleToFieldId[item.title]
      if (!key) return acc
      acc[key] = {
        notes: item.notes || '',
        acc: item.acc || '',
        client_notes: item.client_notes || '',
        internal_notes: item.internal_notes || '',
        status: item.is_include
      }

      return acc
    }, {})

    setValue('sillPlate', mapped, { shouldValidate: true })
  }, [resetSillPlate])

  // Push sillPlate data back to projectScopes
  useEffect(() => {
    if (!sillPlate || typeof sillPlate !== 'object') return

    const updatedScopes = projectScopes.map(scope => ({
      ...scope,
      categories: scope.categories.map(category => ({
        ...category,
        groups: category.groups.map(group => ({
          ...group,
          sagments: group.sagments.map(sagment => {
            const key = titleToFieldId[sagment.title]
            if (!key) return sagment
            console.log('sillPlate[key]', sillPlate[key])
            const matchingData = sillPlate[key]
            return matchingData
              ? {
                  ...sagment,
                  is_include: matchingData.status || 'na',
                  notes: matchingData.notes || '',
                  acc: matchingData.acc || '',
                  client_notes: matchingData.client_notes || '',
                  internal_notes: matchingData.internal_notes || ''
                }
              : sagment
          })
        }))
      }))
    }))

    setValue('projectScopes', updatedScopes, { shouldValidate: true })
  }, [sillPlate])

  return (
    <div className='space-y-4'>
      <h3 className='text-sm font-semibold'>SILL PLATE</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-1/6 text-left'>SILL PLATE</TableHead>
            <TableHead className='w-1/12 text-center'>INC</TableHead>
            <TableHead className='w-1/12 text-center'>EXC</TableHead>
            <TableHead className='w-1/12 text-center'>NA</TableHead>
            <TableHead className='w-1/6 text-left'>NOTES</TableHead>
            <TableHead className='w-1/6 text-left'>ACC</TableHead>
            <TableHead className='w-1/6 text-left'>CLIENT NOTES</TableHead>
            <TableHead className='w-1/6 text-left'>INTERNAL NOTES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ThreadedRodSystemData.map(section => (
            <>
              <TableRow key={section.category}>
                <TableCell colSpan={8}>
                  <span className='block pt-2 text-base font-semibold text-muted-foreground'>
                    {section.category}
                  </span>
                </TableCell>
              </TableRow>
              {section.items.map(item => (
                <TableRow key={item.id} className='align-top'>
                  <TableCell className='text-sm'>{item.label}</TableCell>
                  {['inc', 'exc', 'na'].map(option => (
                    <TableCell key={option} className='!text-center'>
                      <RadioButton
                        name={`sillPlate.${item.id}.status`}
                        options={[{ label: '', value: option }]}
                        form={form}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <FormInputField
                      className='w-32'
                      form={form}
                      name={`sillPlate.${item.id}.notes`}
                      placeholder=''
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputField
                      className='w-20'
                      form={form}
                      name={`sillPlate.${item.id}.acc`}
                      placeholder=''
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputField
                      className='w-56'
                      form={form}
                      name={`sillPlate.${item.id}.client_notes`}
                      placeholder=''
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputField
                      className='w-40'
                      form={form}
                      name={`sillPlate.${item.id}.internal_notes`}
                      placeholder=''
                    />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default BugetScopeSPTab
