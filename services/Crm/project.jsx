import api from '@/lib/api'

export const ProjectService = {
  AddProject: formData => {
    return api.post(`/budget-books`, formData)
  },

  GetAllProjects: (length, page) => {
    return api.get(
      `/budget-books?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
    )
  },
  deleteProjectById: deleteIndex => {
    return api.delete(`/budget-books/${deleteIndex}`)
  },
  GetProjectBYId: id => {
    return api.get(`/budget-books/${id}`)
  },
  UpdateProjectById: (id, formData) => {
    return api.post(`/budget-books/${id}`, formData)
  }
}

export const ContactServices = {
  contacts: () => {
    return api.get(`/contacts`)
  },
  AddContacts: formData => {
    return api.post(`/contacts`, formData)
  },
  getContactById: editId => {
    return api.get(`/contacts/${editId}`)
  },

  updateContactById: (editId, values) => {
    return api.post(`/contacts/${editId}`, values)
  },
  deleteContact: deleteIndex => {
    return api.delete(`/contacts/${deleteIndex}`)
  },
  ContractorComponents: () => {
    return api.get(`/contract-components?limit=100`)
  },
  getAllContact: (page, length) => {
    if ((page, length)) {
      return api.get(`/contacts?limit=100&page=${page}&per_page=${length}`)
    } else {
      return api.get(`/contacts?limit=100`)
    }
  }
}
