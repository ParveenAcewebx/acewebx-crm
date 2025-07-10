import api from '@/lib/api'
const BudgetBookService = {
  projects: (page, length) => {
    if ((page, length)) {
      return api.get(`/projects?page=${page}&length=${length}`)
    } else {
      return api.get(`/projects?limit=100`)
    }
  },

  GetAllProjects: () => {
    return api.get(`/budget-books?limit=100`)
  },

  GetContacts: () => {
    return api.get(`/contacts?limit=100`)
  },

  AddBudgetBook: formData => {
    return api.post(`/projects`, formData)
  },

  getBudgetById: id => {
    return api.get(`/projects/${id}`)
  },

  updateBudgetById: (id, data) => {
    return api.post(`/projects/${id}`, data)
  },

  deleteBudgetById: deleteIndex => {
    return api.delete(`/projects/${deleteIndex}`)
  },

  GetBudgetScop: () => {
    return api.get(`/scopes?limit=100`)
  },

  GetQuotesPreview: id => {
    return api.get(`quote-invoice/${id}`)
  },
  GetCoverPdf: id => {
    return api.get(`cover-project/${id}`)
  },
  GetVeOption: id => {
    return api.get(`ve-print/${id}`)
  },
  GetProjectsRevisionData: id => {
    return api.get(`projects-revision-data/${id}`)
  }
}
export default BudgetBookService

const Routes = {
  GETLIST: '/contacts'
}

export const GetAllContact = {
  GetContact: (params = {}) => {
    return api.get(Routes.GETLIST, {
      params: {
        limit: 100,
        ...params
      }
    })
  }
}
