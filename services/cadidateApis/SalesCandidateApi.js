import api from '@/lib/api'

const SalesCandidate = {
  addSalesCandidate: data => {
    return api.post(`candidateSale/save`, data)
  },
  salesCandidateList: (newData) => {
    let start = newData?.startDate == undefined ? "" : newData?.startDate
    let end = newData?.endDate == undefined ? "" : newData?.endDate
    let totalExperience = newData?.totalExperience == undefined ? "" : newData?.totalExperience
    let preferredShift = newData?.preferredShift == undefined ? "" : newData?.preferredShift
    let skill = newData?.skill == undefined ? "" : newData?.skill

    return api.get(`candidateSale/getAllCandidateSale?page=${newData?.page}&limit=${newData?.length}&minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}&totalExperience=${totalExperience}&preferredShift=${preferredShift}&skill=${skill}`)
  },
  salesCandidateCSVList: (newData) => {
    let start = newData?.startDate == undefined ? "" : newData?.startDate
    let end = newData?.endDate == undefined ? "" : newData?.endDate
    let totalExperience = newData?.totalExperience == undefined ? "" : newData?.totalExperience
    let preferredShift = newData?.preferredShift == undefined ? "" : newData?.preferredShift
    let skill = newData?.skill == undefined ? "" : newData?.skill

    return api.get(`candidateSale/export-candidates?minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}&totalExperience=${totalExperience}&preferredShift=${preferredShift}&skill=${skill}`)
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
    let start = newData?.startDate == undefined ? "" : newData?.startDate
    let end = newData?.endDate == undefined ? "" : newData?.endDate
    let search = newData?.search == undefined ? "" : newData?.search
    let totalExperience = newData?.totalExperience == undefined ? "" : newData?.totalExperience
    let preferredShift = newData?.preferredShift == undefined ? "" : newData?.preferredShift
    let skill = newData?.skill == undefined ? "" : newData?.skill


    return api.get(
      `candidateSale/getAllCandidateSale?minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}&search=${search}&totalExperience=${totalExperience}&preferredShift=${preferredShift}&skill=${skill}`
    )
  },

  sendSalesWalkInLink: id => {
    return api.post(`candidateSale/send-walk-in-application/${id}`)
  },

  SalesCandidateGetByUUID: id => {
    return api.post(`candidateSale/confirm-candidate-token/${id}`)
  },
  activitySalesCandidate: (module, editId) => {
    return api.get(
      `activity/logs?module=${module}&moduleId=${editId}`
    )
  }
}

export default SalesCandidate
