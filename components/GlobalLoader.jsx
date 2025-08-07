'use client'
import { useLoadingStore } from '@/lib/loadingStore'

export default function GlobalLoader() {
  const isLoading = useLoadingStore(state => state.loading)
  // const { isLoading, startLoading, stopLoading } = useLoader(useContext)

  // Set loader proxy on mount
  // useEffect(() => {
  //   setLoaderFunctions({ startLoading, stopLoading })
  // }, [startLoading, stopLoading])

  if (!isLoading) return null

  return (
    <>
      <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-white border-t-blue-500'></div>
      </div>
      {/* <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-30'>
        <div className='loader text-black'>Loading...</div>
      </div> */}
    </>
  )
}
