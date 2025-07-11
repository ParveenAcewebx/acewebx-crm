import { FormProvider } from 'react-hook-form'
import FormRadioButton from './share/form/FormInputRadioButtom'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

// Define the prop types

const UpdateDialogBox = ({
  description,
  onUpdate,
  updateModalDialogBox,
  openUpdateModal,
  form
}) => {
  return (
    <Dialog open={openUpdateModal} onOpenChange={updateModalDialogBox}>
      <DialogContent className='custom-modal'>
        <DialogHeader className='!text-center'>
          <DialogTitle className='!text-2xl'>Update Confirmation</DialogTitle>
          <DialogDescription>{description}</DialogDescription>

          <div>
            <FormProvider {...form}>
              <FormRadioButton
                name='update'
                className='mt-4 flex flex-row justify-center gap-3'
                form={form}
                options={[
                  {
                    label: 'Overwrite existing data',
                    value: 'overwrite'
                  },
                  {
                    label: 'Create new version',
                    value: 'new_version'
                  }
                ]}
              />
            </FormProvider>
          </div>
        </DialogHeader>
        <DialogFooter className='!justify-center'>
          <Button
            onClick={updateModalDialogBox}
            color='primary'
            className='site-button cancel-button rounded-6 !shadow-none'
          >
            Cancel
          </Button>
          <Button
            onClick={onUpdate}
            color='error'
            autoFocus
            className='site-button rounded-6 !shadow-none'
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateDialogBox
