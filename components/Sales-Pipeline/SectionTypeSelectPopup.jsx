'use client'
import { useEffect, useState } from 'react'
import FormSelectField from '../share/form/FormSelect'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form } from '../ui/form'

function SectionTypeSelectPopup({
  openDialog,
  setOpenDialog,
  form,
  data,
  leadId,
  setOpenDialogTypeSection,
  setLeadIdRelatedType,
}) {
  const [options, setOptions] = useState([])

  const handleSetionType = data => {
    if (data?.section_Type) {
      setLeadIdRelatedType(data?.section_Type)
      setOpenDialog(true)
    }
  }

  // options for typeselection :-
  useEffect(() => {
    const newOptions = data?.map(item => {
      let newObj = { label: item.type, value: String(item.id) }
      return newObj
    })
    setOptions(newOptions)
  }, [data])



  return (
    <>
      <div>
        {' '}
        <Dialog open={openDialog} onOpenChange={setOpenDialogTypeSection}>
          <DialogContent className='max-h-[90vh] overflow-y-auto transition-all duration-300'>
            <DialogHeader>
              <DialogTitle>
                <div className='flex items-center justify-between'>
                  <span>Select Section Type</span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSetionType)}>
                <FormSelectField
                  form={form}
                  name='section_Type'
                  label=''
                  placeholder='Select Section Type'
                  options={options}
                />

                <div className='mt-4 flex justify-end'>
                  <Button type='submit' className='site-button'>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default SectionTypeSelectPopup
