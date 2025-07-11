'use client'
import { Button } from '@/components/ui/button'
import notFound404Img from '@/public/images/not-found-404.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <section className='min-h-screen-minus-header flex flex-col items-center justify-center space-y-4 text-center'>
      <Image
        src={notFound404Img}
        alt='Not Found'
        height={250}
        priority={true}
      />
      <h1 className='text-4xl font-semibold text-secondary'>Page Not Found!</h1>
      <p>Sorry, the page you are looking for cannot be found.</p>
      <Button onClick={() => router.back()}>Back</Button>
    </section>
  )
}
