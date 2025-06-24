import ApiClient from "./apiBase";
const Candidate = {
  addCandidate: (data) => {
    return ApiClient.post(`candidate/save`, data);
  },
};

export default Candidate;
