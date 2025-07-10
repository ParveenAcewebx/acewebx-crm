import AddCompanyForm from '../LeadsModule/AddCompanyForm'
import AddContactForm from '../LeadsModule/AddContactForm'
import AddEngineerForm from '../LeadsModule/AddEngineerForm'
import AddProjectForm from '../LeadsModule/AddProjectForm'
import AddTeamForm from '../LeadsModule/AddTeamForm'
import SearchProjects from '../LeadsModule/SearchProjects'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'

export function LeadFormDialog({
  id,
  getBudgetBooks,
  fetchTeamMembers,
  getCompanies,
  fetchContactsByCompany,
  getEngineer,
  open,
  onOpenChange,
  formType,
  handleCloseDialog,
  handleProjectSelect,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>{/* <DialogTitle>{label}</DialogTitle> */}</DialogHeader>
        <div>
          {formType === 'project' && (
            <AddProjectForm
              id={id}
              handleCloseDialog={handleCloseDialog}
              getBudgetBooks={getBudgetBooks}
            />
          )}
          {formType === 'company' && (
            <AddCompanyForm
              id={id}
              handleCloseDialog={handleCloseDialog}
              getCompanies={getCompanies}
            />
          )}
          {formType === 'contact' && (
            <AddContactForm
              id={id}
              handleCloseDialog={handleCloseDialog}
              fetchContactsByCompany={fetchContactsByCompany}
            />
          )}
          {formType === 'team' && (
            <AddTeamForm
              id={id}
              handleCloseDialog={handleCloseDialog}
              fetchTeamMembers={fetchTeamMembers}
            />
          )}
          {formType === 'engineer' && (
            <AddEngineerForm
              id={id}
              handleCloseDialog={handleCloseDialog}
              getEngineer={getEngineer}
            />
          )}
          {formType === 'search' && (
            <SearchProjects
              id={id}
              handleCloseDialog={handleCloseDialog}
              handleProjectSelect={handleProjectSelect}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
