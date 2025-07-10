import api from '@/lib/api'

const LeadsServices = {
  addLeads: formData => {
    return api.post(`/leads`, formData)
  },

  getleads: (page, length) => {
    if ((page, length)) {
      return api.get(`/leads?page=${page}&per_page=${length}`)
    } else {
      return api.get(`/leads?limit=100`)
    }
  },
  deleteLead: deleteIndex => {
    return api.delete(`/leads/${deleteIndex}`)
  },
  getleadById: editId => {
    return api.get(`/leads/${editId}`)
  },
  updateLeadById: (editId, values) => {
    return api.post(`/leads/${editId}`, values)
  },
  updateLeadDcsById: (editId, values) => {
    return api.post(`/lead-dcs/${editId}`, values)
  },

  // use form apis
  companies: () => {
    return api.get(`/companies`)
  },

  companyContact: companyId => {
    return api.get(`/get/company/contact/${companyId}`)
  },

  leadTeamContact: departmentId => {
    return api.get(`/get-lead-team-contact/${departmentId}`)
  },
  contacts: () => {
    return api.get(`/contacts`)
  },
  interactions: () => {
    return api.get(
      `/interactions?limit=100&sort_column=id&sort_direction=asc&per_page=10&page=1`
    )
  },
  Notes: formData => {
    return api.post(`/lead-notes`, formData)
  },
  GetNotes: editId => {
    return api.get(`/lead-notes?limit=100&lead_id=${editId}`)
  },
  deleteNotes: deleteIndex => {
    return api.delete(`/lead-notes/${deleteIndex}`)
  },
  interactionType: () => {
    return api.get(`/interaction-types?limit=100&take_all=true`)
  },
  contacts: () => {
    return api.get(`/contacts`)
  },
  AddinteractionType: formData => {
    return api.post(`/interactions`, formData)
  },

  projectCost: editId => {
    return api.get(`/project-cost?limit=100&lead_id=${editId}&type=cost`)
  },

  addCost: formData => {
    return api.post(`/project-cost`, formData)
  },

  projectPrice: editId => {
    return api.get(`/project-cost?limit=100&lead_id=${editId}&type=price`)
  },
  tasksAll: (editId, length, page) => {
    return api.get(
      `/lead-tasks?limit=100&lead_id=${editId}&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
    )
  },
  deleteTask: deleteIndex => {
    return api.delete(`/lead-tasks/${deleteIndex}`)
  },
  getTicketsById: taskId => {
    return api.get(`/tickets/${taskId}`)
  },
  addTask: formData => {
    return api.post(`/lead-tasks`, formData)
  },
  editTickets: (taskId, formData) => {
    return api.put(`/tickets/${taskId}`, formData)
  }
}
export default LeadsServices
const LeadList = {
  GETLIST: '/leads'
}
export const GetFilterData = {
  getleads: params => {
    return api.get(LeadList.GETLIST, {
      params: {
        limit: 100,
        ...params
      }
    })
  }
}
