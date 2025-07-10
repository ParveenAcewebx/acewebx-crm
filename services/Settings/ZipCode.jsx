import api from '@/lib/api'

export const ZipCodeServices = {
  AddZipCode: formData => {
    return api.post(`/taxes`, formData)
  },
  EditZipCode: (editId, formData) => {
    return api.post(`/taxes/${editId}`, formData)
  },
  GetAllZipCode: (page, length) => {
    return api.get(
      `/taxes?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
    )
  },
  deleteZipCode: deleteIndex => {
    return api.delete(`/taxes/${deleteIndex}`)
  }
}
