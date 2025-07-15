import api from '@/lib/api'

const SalesCandidate = {
  addSalesCandidate: data => {
    return api.post(`candidateSale/save`, data)
  },
  salesCandidateList: (page, limit) => {
    return api.get(`candidateSale/getAllCandidateSale?page=${page}&limit=${limit}`)
  },
  salesCandidateGetById: id => {
    return api.get(`candidateSale/getCandidateSaleById/${id}`)
  },
  updateSalesCandidate: (candiId, data) => {
    let id = candiId
    return api.put(`candidateSale/update/${id}`, data)
  },
  romoveSalesCandidate: id => {
    return api.delete(`candidateSale/deleteCandidateSale/${id}`)
  },
  viewCandidate: id => {
    return api.get(`candidateSale/getCandidateById/${id}`)
  },
  candidateListFilters: data => {
    console.log('datadata', data)
    const search = data?.search ?? ''
    const maxSalary = data?.maxSalary ?? ''
    const minSalary = data?.minSalary ?? ''

    return api.get(
      `candidateSale/getAllCandidate?search=${search}&maxSalary=${maxSalary}&minSalary=${minSalary}`
    )
  },
  candidateListAddvanceFilters: data => {
    return api.get(
      `candidateSale/getAllCandidate?page=${data?.page}&limit=${data?.limit}&skill=${data?.Skill}&preferredShift=${data?.preferredShift}&minSalary=${data?.minSalary}&maxSalary=${data?.maxSalary}&startDate=${data?.startDate}&endDate=${data?.endDate}`
    )
  },

  sendSalesWalkInLink: id => {
    return api.post(`candidateSale/send-walk-in-application/${id}`)
  },

  SalesCandidateGetByUUID: id => {
    return api.post(`candidateSale/confirm-candidate-token/${id}`)
  }
}

export default SalesCandidate
