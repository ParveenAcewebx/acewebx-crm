import api from '@/lib/api'

export const ReceiverServices = {
  AddReceiver: formData => {
    return api.post(`/terms`, formData)
  },
  EditReceiver: (editId, formData) => {
    return api.post(`/terms/${editId}`, formData)
  },
  GetAllReceiver: (page, length) => {
    return api.get(
      `/terms?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
    )
  },
  deleteReceiver: deleteIndex => {
    return api.delete(`/terms/${deleteIndex}`)
  },
  getReceiverById: editId => {
    return api.get(`/terms/${editId}`)
  },
  getReceiverByType: type => {
    return api.get(`terms?term_type=${type}`)
  }
}
