import BulkQuotes from '@/components/MaterialQuotes/BulkQuote'
import AddCompanyForm from '../../leads-module/AddCompanyForm'
import AddContactForm from '../../leads-module/AddContactForm'
import AddEngineerForm from '../../leads-module/AddEngineerForm'
import AddProjectForm from '../../leads-module/AddProjectForm'
import SearchProjects from '../../leads-module/SearchProjects'
import { Dialog, DialogContent, DialogHeader } from '../../ui/dialog'

export function QuoteBulkModal({
  open,
  onOpenChange,
  formType,
  handleCloseDialog,
  onSubmitBulkQuotes,
  handleProjectSelect,
  id
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'>
        <DialogHeader>{/* <DialogTitle>{label}</DialogTitle> */}</DialogHeader>
        <div>
            <BulkQuotes
              handleCloseDialog={handleCloseDialog}
              handleProjectSelect={handleProjectSelect}
              onSubmitBulkQuotes={onSubmitBulkQuotes}
            />
        
        </div>
      </DialogContent>
    </Dialog>
  )
}
