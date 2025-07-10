import * as yup from 'yup'

export const BudgetBookValidation = yup.object().shape({
  budget_book_id: yup.string().required('Project is required'),
  lead_project_id: yup.string().required('Lead is required')
})
