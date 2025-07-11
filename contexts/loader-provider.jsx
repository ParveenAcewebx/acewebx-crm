'use client'
import { createContext, useContext, useState } from 'react'

const LoaderContex = createContext()
export const LoaderProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0)
  const startLoading = () => setLoadingCount(count => count + 1)
  const stopLoading = () => setLoadingCount(count => Math.max(0, count - 1))

  const isLoading = loadingCount > 0
  return (
    <>
      <LoaderContex.Provider value={{ startLoading, stopLoading, isLoading }}>
        {children}
      </LoaderContex.Provider>
    </>
  )
}


export const useLoader = () => useContext(LoaderContex)
