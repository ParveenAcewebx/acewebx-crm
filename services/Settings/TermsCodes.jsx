import api from '@/lib/api'

export const TermsCodesServices = {
  AddTermsCodes: formData => {
    return api.post(`/terms`, formData)
  },
  EditTermsCodes: (editId, formData) => {
    return api.post(`/terms/${editId}`, formData)
  },
  GetAllTermsCodes: (page, length) => {
    return api.get(
      `/terms?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
    )
  },
  deleteTermsCodes: deleteIndex => {
    return api.delete(`/terms/${deleteIndex}`)
  },
  getTermsCodesById: editId => {
    return api.get(`/terms/${editId}`)
  },
  getTermsCodesByType: type => {
    return api.get(`terms?term_type=${type}`)
  }
}
