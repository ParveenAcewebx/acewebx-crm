import api from '@/lib/api'

const LeadsSettingServices = {
  // Leads Setting Status
  getLeadsStatus: (page, length) => {
    if ((page, length)) {
      return api.get(`/lead-statuses?limit=100&page=${page}&per_page=${length}`)
    } else {
      return api.get('/lead-statuses')
    }
  },
  AddLeadStatus: formData => {
    return api.post(`/lead-statuses`, formData)
  },

  deleteLeadStatusById: deleteIndex => {
    return api.delete(`/lead-statuses/${deleteIndex}`)
  },
  GetLeadStatusBYId: scopId => {
    return api.get(`/lead-statuses/${scopId}`)
  },
  UpdateLeadStatusById: (scopId, formData) => {
    return api.post(`/lead-statuses/${scopId}`, formData)
  },

  // Leads Setting Tags
  getTags: (page, length) => {
    if ((page, length)) {
      return api.get(`/tags?page=${page}&per_page=${length}`)
    } else {
      return api.get(`/tags`)
    }
  },
  AddTags: formData => {
    return api.post(`/tags`, formData)
  },

  deleteTagsById: deleteIndex => {
    return api.delete(`/tags/${deleteIndex}`)
  },
  GetTagBYId: scopId => {
    return api.get(`/tags/${scopId}`)
  },
  UpdateTagById: (scopId, formData) => {
    return api.post(`/tags/${scopId}`, formData)
  },

  // Leads Setting Type
  getLeadType: (page, length) => {
    if ((page, length)) {
      return api.get(`lead-types?page=${page}&per_page=${length}`)
    } else {
      return api.get(`lead-types`)
    }
  },
  AddLeadsType: formData => {
    return api.post(`lead-types`, formData)
  },

  deleteLeadTypesById: deleteIndex => {
    return api.delete(`lead-types/${deleteIndex}`)
  },
  GetLeadTypesById: scopId => {
    return api.get(`lead-types/${scopId}`)
  },
  UpdateLeadTypesById: (scopId, formData) => {
    return api.post(`lead-types/${scopId}`, formData)
  },

  // Leads Setting Interaction Type
  getInteractionType: (page, length) => {
    return api.get(`/interaction-types?page=${page}&per_page=${length}`)
  },
  AddInteractionTyp: formData => {
    return api.post(`/interaction-types`, formData)
  },

  deleteInteractionTypesById: deleteIndex => {
    return api.delete(`/interaction-types/${deleteIndex}`)
  },
  GetInteractionTypeById: scopId => {
    return api.get(`interaction-types/${scopId}`)
  },
  UpdateInteractionType: (scopId, formData) => {
    return api.post(`/interaction-types/${scopId}`, formData)
  }
}
export default LeadsSettingServices
