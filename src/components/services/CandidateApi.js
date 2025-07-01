import ApiClient from './apiBase'
const Candidate = {
  addCandidate: data => {
    return ApiClient.post(`candidate/save`, data)
  },
  candidateList: data => {
    return ApiClient.get(`candidate/getAllCandidate?page=${data?.page}&limit=${data?.limit}`)
  },
  updateCandidate: (id, data) => {
    return ApiClient.put(`candidate/save`)
  },
  romoveCandidate: id => {
    return ApiClient.delete(`candidate/save`)
  },
  viewCandidate: id => {
    return ApiClient.get(`candidate/getCandidateById/${id}`)
  },
  candidateListFilters: data => {
    const page = data?.page ?? ''
    const limit = data?.limit ?? ''
    const name = data?.name ?? ''
    const email = data?.email ?? ''
    const currentSalary = data?.currentSalary ?? ''

    return ApiClient.get(
      `candidate/getAllCandidate?page=${page}&limit=${limit}&name=${name}&email=${email}&currentSalary=${currentSalary}`
    )
  }
}

export default Candidate
