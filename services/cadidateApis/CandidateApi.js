import api from '@/lib/api'

const Candidate = {
  addCandidate: data => {
    return api.post(`candidate/save`, data)
  },
  candidateList: (page, limit) => {
    return api.get(`candidate/getAllCandidate?page=${page}&limit=${limit}`)
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
    console.log('datadata', data)
    const search = data?.search ?? ''
    const maxSalary = data?.maxSalary ?? ''
    const minSalary = data?.minSalary ?? ''

    return api.get(
      `candidate/getAllCandidate?search=${search}&maxSalary=${maxSalary}&minSalary=${minSalary}`
    )
  },
  candidateListAddvanceFilters: data => {
    return api.get(
      `candidate/getAllCandidate?page=${data?.page}&limit=${data?.limit}&skill=${data?.Skill}&preferredShift=${data?.preferredShift}&minSalary=${data?.minSalary}&maxSalary=${data?.maxSalary}&startDate=${data?.startDate}&endDate=${data?.endDate}`
    )
  },

  sendWalkInLink: id => {
    return api.post(`send-walk-in-application/${id}`)
  },

  candidateGetByUUID: id => {
    return api.post(`confirm-candidate-token/${id}`)
  }
}

export default Candidate
