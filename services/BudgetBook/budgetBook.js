import api from '@/lib/api'

const BudgetBooksServices = {
  budgetBooks: () => {
    return api.get(`/budget-books`)
  },
  addbudgetBooks: formData => {
    return api.post(`/budget-books`, formData)
  },
}
export default BudgetBooksServices
