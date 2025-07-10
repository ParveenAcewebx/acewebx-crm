import api from '@/lib/api'

const NewDepartmentServices = {
  // product category
  AllNewDeapartment: (page, length) => {
    return api.get(`/departments?page=${page}&per_page=${length}`)
  },
  AddNewDeapartment: formData => {
    return api.post(`/departments`, formData)
  },
  getNewDeapartment: editId => {
    return api.get(`/departments/${editId}`)
  },

  updateNewDeapartment: (editId, formData) => {
    return api.put(`/departments/${editId}`, formData)
  },
  deleteNewDeapartment: deleteIndex => {
    return api.delete(`/departments/${deleteIndex}`)
  },
}
export default NewDepartmentServices
