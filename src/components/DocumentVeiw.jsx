import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

export default function DocumentView({ handleClickOpen, handleClose, open, candidateUrl }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{
          style: {
            width: '90%',
            maxWidth: '1000px'
          }
        }}
      >
        <DialogActions className='justify-end'>
          <Button onClick={handleClose} className='!text-xl !font-bold !text-gray-600'>
            ✕
          </Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <div>
              {candidateUrl ? (
                <iframe
                  src={decodeURIComponent(`${process.env.NEXT_PUBLIC_API_BASE_URL}${candidateUrl}`)}
                  width='100%'
                  height='600px'
                  title='PDF Preview'
                />
              ) : (
                <p>No document URL provided.</p>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
