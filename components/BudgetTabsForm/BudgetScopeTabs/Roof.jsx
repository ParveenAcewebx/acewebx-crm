import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function BugetScopeRoofTab() {
  return (
    <div className='p-4'>
      <Table>
        <TableHeader>
          <TableHead className='text-xs uppercase text-muted-foreground'>
            <b>ROOF</b>
          </TableHead>
          <TableRow>
            <TableHead className='text-xs uppercase'>GENERAL</TableHead>
            <TableHead className='text-xs uppercase'>INC</TableHead>
            <TableHead className='text-xs uppercase'>EXC</TableHead>
            <TableHead className='text-xs uppercase'>NA</TableHead>
            <TableHead className='text-xs uppercase'>NOTES</TableHead>
            <TableHead className='text-xs uppercase'>ACC</TableHead>
            <TableHead className='text-xs uppercase'>CLIENT NOTES</TableHead>
            <TableHead className='text-xs uppercase'>INTERNAL NOTES</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className='text-xs font-medium uppercase text-muted-foreground'>
              PLYWOOD CLIPS
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className='text-xs uppercase'>OVERBUILD</TableCell>
            <TableCell>INC</TableCell>
            <TableCell>EXC</TableCell>
            <TableCell>NA</TableCell>
            <TableCell>NOTES</TableCell>
            <TableCell>ACC</TableCell>
            <TableCell>CLIENT NOTES</TableCell>
            <TableCell>INTERNAL NOTES</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className='text-xs uppercase'>PARAPET</TableCell>
            <TableCell>INC</TableCell>
            <TableCell>EXC</TableCell>
            <TableCell>NA</TableCell>
            <TableCell>NOTES</TableCell>
            <TableCell>ACC</TableCell>
            <TableCell>CLIENT NOTES</TableCell>
            <TableCell>INTERNAL NOTES</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className='text-xs uppercase'>GABLE END</TableCell>
            <TableCell>INC</TableCell>
            <TableCell>EXC</TableCell>
            <TableCell>NA</TableCell>
            <TableCell>NOTES</TableCell>
            <TableCell>ACC</TableCell>
            <TableCell>CLIENT NOTES</TableCell>
            <TableCell>INTERNAL NOTES</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}





