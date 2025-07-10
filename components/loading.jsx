import { Loader2Icon } from 'lucide-react'

export default function Loading() {
  return (
    <section className='min-h-screen-minus-header flex items-center justify-center'>
      <Loader2Icon className='h-10 w-10 animate-spin text-primary' />
    </section>
  )
}
