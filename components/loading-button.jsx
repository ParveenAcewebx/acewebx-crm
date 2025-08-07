import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

export default function LoadingButton({
  children,
  loading,
  loadingText,
  disabled,
  className,
  ...props
}) {
  return (
    <Button disabled={loading || disabled} className={cn(className)} {...props}>
      {loading ? (
        <>
          <Loader2Icon className='h-4 w-4 animate-spin' />
          {loadingText || 'Loading...'}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
