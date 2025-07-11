import api from '@/lib/api'

const TeamServices = {
  AddTeam: formData => {
    return api.post(`/lead-teams`, formData)
  },
  getTeamById: editId => {
    return api.get(`/lead-teams/${editId}`)
  },

  updateTeamById: (editId, values) => {
    return api.post(`/lead-teams/${editId}`, values)
  },
  updateTeamContactById: (editId, values) => {
    return api.put(`/update-lead-team-members/${editId}`, values)
  },
  deleteTeam: deleteIndex => {
    return api.delete(`/lead-teams/${deleteIndex}`)
  },
  getAllTeam: (page, length) => {
    return api.get(`/lead-teams?page=${page}&per_page=${length}`)
  }
}
export default TeamServices
