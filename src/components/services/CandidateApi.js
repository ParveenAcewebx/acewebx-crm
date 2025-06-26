import ApiClient from './apiBase'
const Candidate = {
  addCandidate: data => {
    return ApiClient.post(`candidate/save`, data)
  },
  candidateList: () => {
    return ApiClient.get(`candidate/getAllCandidate`)
  },
  updateCandidate: (id, data) => {
    return ApiClient.put(`candidate/save`)
  },
  romoveCandidate: id => {
    return ApiClient.delete(`candidate/save`)
  },
  viewCandidate: (id)=> {
    return ApiClient.get(`candidate/getCandidateById/${id}`)
  }
}

export default Candidate
