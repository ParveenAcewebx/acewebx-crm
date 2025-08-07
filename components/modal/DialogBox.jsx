import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'



const DialogBox = ({
  description,
  onDelete,
  deleteHandleModalClose,
  deleteOpenModal
}) => {
  return (
    <Dialog open={deleteOpenModal} onOpenChange={deleteHandleModalClose}>
      <DialogContent className='custom-modal'>
        <DialogHeader className='!text-center'>
          <DialogTitle className='!text-2xl'>Delete Confirmation</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='!justify-center'>
          <Button onClick={deleteHandleModalClose} color='primary' className='site-button rounded-6 !shadow-none'>
            Cancel
          </Button>
          <Button onClick={onDelete} color='error' autoFocus className='site-button bg-red rounded-6 !shadow-none'>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBox
