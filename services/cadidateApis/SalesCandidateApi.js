import api from '@/lib/api'

const SalesCandidate = {
  addSalesCandidate: data => {
    return api.post(`candidateSale/save`, data)
  },
  salesCandidateList: (newData) => {
    let start= newData?.startDate == undefined ? "": newData?.startDate
    let end= newData?.endDate == undefined ? "":newData?.endDate
    return api.get(`candidateSale/getAllCandidateSale?page=${newData?.page}&limit=${newData?.length}&minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}`)
  },
  salesCandidateGetById: id => {
    return api.get(`candidateSale/getCandidateSaleById/${id}`)
  },
  updateSalesCandidate: (candiId, data) => {
    let id = candiId
    return api.put(`candidateSale/update/${id}`, data)
  },
  updateSalesWalkInCandidate: (candiId, data) => {
    let id = candiId
    return api.put(`candidateSale/walkIn/update/${id}`, data)
  },
  romoveSalesCandidate: id => {
    return api.delete(`candidateSale/deleteCandidateSale/${id}`)
  },
  viewSalesCandidate: id => {
    return api.get(`candidateSale/getCandidateSaleById/${id}`)
  },
  candidateListFilters: data => {
    const search = data?.search ?? ''
    return api.get(
      `candidateSale/getAllCandidateSale?search=${search}`
    )
  },
  candidateSaleListAddvanceFilters: newData => {
    let start= newData?.startDate == undefined ? "": newData?.startDate
    let end= newData?.endDate == undefined ? "":newData?.endDate
    return api.get(
      `candidateSale/getAllCandidateSale?minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}`
    )
  },

  sendSalesWalkInLink: id => {
    return api.post(`candidateSale/send-walk-in-application/${id}`)
  },

  SalesCandidateGetByUUID: id => {
    return api.post(`candidateSale/confirm-candidate-token/${id}`)
  },
  
}

export default SalesCandidate
