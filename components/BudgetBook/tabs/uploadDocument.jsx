'use client'
import DialogBox from '@/components/modal/DialogBox'
import { MultiImageUploaderWithNotes } from '@/components/share/form/MultiFileUploadWithNotes'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { UploadTableColumn } from '@/components/uploadDocumentTable/uploadTableColumn'
import api from '@/lib/api'
import { useState } from 'react'

const UploadDocument = ({
  setImageUpload,
  editData,
  tableData,
  setTableData,
  form,
  setFiles,
  files,
  setFileNotes,
  fileNotes,
  setFileTypes,
  fileTypes
}) => {
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [length, setLength] = useState(10)
  // const [tableData, setTableData] = useState([])
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  console.log('tableData', tableData)

  // delete budget  row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await api.get(`/budget-document-delet/${deleteIndex}`)
        console.log('resresres', res)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          successMessage({ description: res?.data?.message })
          const updated = tableData?.filter(doc => doc.id !== deleteIndex)
          console.log('updatedupdated', updated)
          setTableData(updated)
        }
      } catch (error) {
        console.log('error', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }

  // delete document row
  const handleDeleteDocument = row => {
    console.log('rowrow', row)
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  return (
    <>
      <MultiImageUploaderWithNotes
        setImageUpload={setImageUpload}
        updateImage={[]}
        setFiles={setFiles}
        files={files}
        setFileNotes={setFileNotes}
            fileNotes={fileNotes}
            setFileTypes={setFileTypes}
            fileTypes={fileTypes}
      />
      {editData ? (
        <div className='mt-3'>
          <DataTable
            data={tableData}
            columns={UploadTableColumn(
              handleDeleteDocument,
              setTableData,
              form
            )}
            totalRecord={totalRecord}
            page={page}
            setPage={setPage}
            length={length}
          />

          <DialogBox
            onDelete={onDelete}
            description='Are you certain you want to proceed with this deletion?'
            deleteOpenModal={deleteOpenModal}
            deleteHandleModalClose={deleteHandleModalClose}
          />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default UploadDocument
