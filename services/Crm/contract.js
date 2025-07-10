import api from '@/lib/api'

const ContractServices = {
  AddContracts: formData => {
    return api.post(`/contracts`, formData)
  },
  getContractById: editId => {
    return api.get(`/contracts/${editId}`)
  },

  updateContractById: (editId, values) => {
    return api.post(`/contracts/${editId}`, values)
  },
  deleteContract: deleteIndex => {
    return api.delete(`/contracts/${deleteIndex}`)
  },
  getAllContract: (page, length) => {
    return api.get(
      `/contract-components?limit=100&page=${page}&per_page=${length}`
    )
  }
}
export default ContractServices
