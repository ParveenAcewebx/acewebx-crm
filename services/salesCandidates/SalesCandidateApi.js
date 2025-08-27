import api from '@/lib/api'

const SalesCandidate = {
  addSalesCandidate: data => {
    return api.post(`candidateSale/save`, data)
  },
  salesCandidateList: (newData) => {
    let search = newData?.search ?? ''
    let start = newData?.startDate == undefined ? "" : newData?.startDate
    let end = newData?.endDate == undefined ? "" : newData?.endDate
    let preferredShift = newData?.preferredShift == undefined ? "" : newData?.preferredShift
    let skill = newData?.skill == undefined ? "" : newData?.skill
    let minExperience = newData?.minExperience == undefined ? "" : newData?.minExperience
    let maxExperience = newData?.maxExperience == undefined ? "" : newData?.maxExperience
    let connectStartDate = newData?.connectStartDate == undefined ? "" : newData?.connectStartDate
    let connectEndDate = newData?.connectEndDate == undefined ? "" : newData?.connectEndDate
    return api.get(`candidateSale/getAllCandidateSale?search=${search}&page=${newData?.page}&limit=${newData?.length}&minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&connectStartDate=${connectStartDate}&connectEndDate=${connectEndDate}&startDate=${start}&endDate=${end}&minExperience=${minExperience}&maxExperience=${maxExperience}&preferredShift=${preferredShift}&preferredShift=${preferredShift}&skill=${skill}`)
  },
  salesCandidateCSVList: (newData) => {
    let search = newData?.search ?? ''

    let start = newData?.startDate == undefined ? "" : newData?.startDate
    let end = newData?.endDate == undefined ? "" : newData?.endDate
    let preferredShift = newData?.preferredShift == undefined ? "" : newData?.preferredShift
    let skill = newData?.skill == undefined ? "" : newData?.skill
    let minExperience = newData?.minExperience == undefined ? "" : newData?.minExperience
    let maxExperience = newData?.maxExperience == undefined ? "" : newData?.maxExperience
    let connectStartDate = newData?.connectStartDate == undefined ? "" : newData?.connectStartDate
    let connectEndDate = newData?.connectEndDate == undefined ? "" : newData?.connectEndDate

    return api.get(`candidateSale/export-candidates?search=${search}&minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}&connectStartDate=${connectStartDate}&connectEndDate=${connectEndDate}&minExperience=${minExperience}&maxExperience=${maxExperience}&preferredShift=${preferredShift}&skill=${skill}`)
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
      `candidateSale/getAllCandidateSale?search=${search}&page=${data?.page}&limit=${data?.length}`
    )
  },
  candidateSaleListAddvanceFilters: newData => {
    let start = newData?.startDate == undefined ? "" : newData?.startDate
    let end = newData?.endDate == undefined ? "" : newData?.endDate
    let search = newData?.search == undefined ? "" : newData?.search
    let preferredShift = newData?.preferredShift == undefined ? "" : newData?.preferredShift
    let skill = newData?.skill == undefined ? "" : newData?.skill
    let minExperience = newData?.minExperience == undefined ? "" : newData?.minExperience
    let maxExperience = newData?.maxExperience == undefined ? "" : newData?.maxExperience
    let connectStartDate = newData?.connectStartDate == undefined ? "" : newData?.connectStartDate
    let connectEndDate = newData?.connectEndDate == undefined ? "" : newData?.connectEndDate
    return api.get(
      `candidateSale/getAllCandidateSale?page=${newData?.page}&limit=${newData?.length}&minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}&search=${search}&connectStartDate=${connectStartDate}&connectEndDate=${connectEndDate}&minExperience=${minExperience}&maxExperience=${maxExperience}&preferredShift=${preferredShift}&skill=${skill}`
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
