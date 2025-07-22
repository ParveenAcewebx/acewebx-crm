import api from '@/lib/api'

const Candidate = {
  addCandidate: data => {
    return api.post(`candidate/save`, data)
  },
  candidateList: (newData) => {
    let start= newData?.startDate == undefined ? "": newData?.startDate
    let end= newData?.endDate == undefined ? "":newData?.endDate
    return api.get(`candidate/getAllCandidate?page=${newData?.page}&limit=${newData?.length}&minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}`)
  },
  candidateGetById: id => {
    return api.get(`candidate/getCandidateById/${id}`)
  },
  updateCandidate: (candiId, data) => {
    let id = candiId
    return api.put(`candidate/update/${id}`, data)
  },
  updateWalkinCandidate: (candiId, data) => {
    let id = candiId
    return api.put(`candidate/walkIn/update/${id}`, data)
  },
  romoveCandidate: id => {
    return api.delete(`candidate/deleteCandidate/${id}`)
  },
  viewCandidate: id => {
    return api.get(`candidate/getCandidateById/${id}`)
  },
  candidateListFilters: data => {
    const search = data?.search ?? ''
    
    return api.get(
      `candidate/getAllCandidate?search=${search}`
    )
  },
  candidateListAddvanceFilters: newData => {
    let start= newData?.startDate == undefined ? "": newData?.startDate
    let end= newData?.endDate == undefined ? "":newData?.endDate
    let search = newData?.search==undefined?"":newData?.search
    return api.get(
      `candidate/getAllCandidate?minSalary=${newData?.minSalary}&maxSalary=${newData?.maxSalary}&startDate=${start}&endDate=${end}&search=${search}`
    )
  },

  sendWalkInLink: id => {
    return api.post(`send-walk-in-application/${id}`)
  },

  candidateGetByUUID: id => {
    return api.post(`confirm-candidate-token/${id}`)
  },
  activityDevCandidate:(module ,editId)=>{
    return api.get(
      `activity/logs?module=${module}&moduleId=${editId}`
    )
  }


}

export default Candidate
