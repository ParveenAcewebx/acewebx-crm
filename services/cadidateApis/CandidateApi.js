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
  updateCandidate: (id, data) => {
    return api.put(`candidate/update/${id}`, data)
  },
  romoveCandidate: id => {
    return api.delete(`candidate/deleteCandidate/${id}`)
  },
  viewCandidate: id => {
    return api.get(`candidate/getCandidateById/${id}`)
  },
  candidateListFilters: data => {
    const page = data?.page ?? ''
    const limit = data?.limit ?? ''
    const name = data?.name ?? ''
    const email = data?.email ?? ''
    const currentSalary = data?.currentSalary ?? ''

    return api.get(
      `candidate/getAllCandidate?name=${name}&email=${email}&currentSalary=${currentSalary}`
    )
  },
  candidateListAddvanceFilters: data => {
    return api.get(
      `candidate/getAllCandidate?page=${data?.page}&limit=${data?.limit}&skill=${data?.Skill}&preferredShift=${data?.preferredShift}&minSalary=${data?.minSalary}&maxSalary=${data?.maxSalary}&startDate=${data?.startDate}&endDate=${data?.endDate}`
    )
  }
}

export default Candidate
