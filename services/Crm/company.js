import api from '@/lib/api'

const CompaniesServices = {
  
  companies: (page,length) => {
    return api.get(`/companies?page=${page}&per_page=${length}`)
  },
  AddCompanies: (formData) => {
    return api.post(`/companies`, formData)
  },
  getCompaniesById: editId => {
    return api.get(`/companies/${editId}`)
  },

  updateCompaniesById: (editId, values) => {
    return api.post(`/companies/${editId}`, values)
  },
  deleteCompanies: deleteIndex => {
    return api.delete(`/companies/${deleteIndex}`)
  },
  
}
export default CompaniesServices


export const CompanyTypeServices = {
  AddCompaniesType: formData => {
    return api.post(`/company-types`, formData)
  },
  allCompaniesType: (page, length) => {
    return api.get(`/company-types?page=${page}&per_page=${length}`)
  },
  getCompaniesTypeById: editId => {
    return api.get(`/company-types/${editId}`)
  },

  updateCompaniesTypeById: (editId, values) => {
    return api.post(`/company-types/${editId}`, values)
  },
  deleteCompaniesType: deleteIndex => {
    return api.delete(`/company-types/${deleteIndex}`)
  }
}