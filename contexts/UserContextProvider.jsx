'use client'
import useLocalStorage from 'use-local-storage'
import UserContext from './UserContext'
import { useState } from 'react'
const UserContextProvider = ({ children }) => {
  const [budgetIndex, setbudgetIndex] = useLocalStorage('budgetIndex', [])
  const [hideShowMap, setHideShowMap] = useLocalStorage('hideShow', [])
  const [verifyEmail, setVerifyEmail] = useLocalStorage('verifyMail', '')
  const [selectedStatus, setSelectedStatus] = useLocalStorage('status', '')
  const [showHiddenContent, setShowHiddenContent] = useLocalStorage('show',false)

  return (
    <UserContext.Provider
      value={{
        budgetIndex,
        setbudgetIndex,
        hideShowMap,
        setHideShowMap,
        verifyEmail,
        setVerifyEmail,
        showHiddenContent, setShowHiddenContent,
        selectedStatus,
        setSelectedStatus
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider
