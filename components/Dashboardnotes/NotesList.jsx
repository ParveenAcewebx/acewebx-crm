'use client'

import api from '@/lib/api'
import LeadsServices from '@/services/Leads/lead'
import { formatDistanceToNow } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { CardContent, CardDescription } from '../ui/card'

const NotesList = ({ notesData, getNotesApi, customer, editData }) => {
  const pathname = usePathname()
  const currentpath = pathname === '/quotes-preview/preview'
  const { data } = useSession()

  const handleDeleteNotes = async ({ noteId }) => {
    if (!noteId) return
    try {
      const response = currentpath
        ? await api.get(`delete-lead-note/${noteId}`)
        : await LeadsServices.deleteNotes(noteId)

      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        getNotesApi()
      }
    } catch (err) {
      console.error('Delete Note Error:', err)
      errorMessage({
        description: err?.response?.data?.message || 'Failed to delete note.'
      })
    }
  }

  return (
    <>
      {notesData?.map(notes => (
        <CardContent key={notes?.id} className='pb-3 pl-0 pr-2'>
          <div className='relative flex items-start gap-3 rounded-lg bg-muted/40 p-4'>
            {/* Avatar */}
            <div className='h-10 w-10 flex-shrink-0 overflow-hidden rounded-full'>
              <img
                src='/images/user-avatar-male-5.png'
                alt='User Avatar'
                className='h-full w-full object-cover'
              />
            </div>

            {/* Note Content */}
            <div className='flex-1 space-y-1'>
              <div className='flex items-start justify-between gap-2'>
                <div>
                  <h6 className='text-sm font-semibold leading-tight'>
                    {notes?.user?.name || customer || editData?.contact?.name}
                  </h6>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-xs font-medium text-gray-400'>
                    {formatDistanceToNow(new Date(notes?.created_at), {
                      addSuffix: true
                    })}
                  </span>
                  {notes?.user?.id === data?.user?.id && (
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-red-500 hover:text-red-600'
                      onClick={() =>
                        handleDeleteNotes({
                          noteId: notes?.id
                        })
                      }
                    >
                      <Trash2 className='h-5 w-5' />
                    </Button>
                  )}
                </div>
              </div>

              <CardDescription className='break-words text-sm text-muted-foreground'>
                {notes.notes}
              </CardDescription>
            </div>
          </div>
        </CardContent>
      ))}
    </>
  )
}

export default NotesList
