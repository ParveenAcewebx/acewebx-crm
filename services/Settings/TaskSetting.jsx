import api from '@/lib/api'
// Task Subject api
export const TaskSubjectServices = {
  AddSubject: formData => {
    return api.post(`/task-subjects`, formData)
  },
  EditSubject: (editId, formData) => {
    return api.post(`/task-subjects/${editId}`, formData)
  },
  GetAllTaskSubject: (page, length) => {
    return api.get(`/task-subjects?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`)
  },
  deleteSubjectById: deleteIndex => {
    return api.delete(`/task-subjects/${deleteIndex}`)
  },
}
// task Group api 
export const TaskGroupServices = {
    AddGroup: formData => {
      return api.post(`/task-groups`, formData)
    },
    EditGroup: (editId, formData) => {
      return api.post(`/task-groups/${editId}`, formData)
    },
    GetAllTaskGroup: (page, length) => {
      return api.get(`/task-groups?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`)
    },
    deleteGroupById: deleteIndex => {
      return api.delete(`/task-groups/${deleteIndex}`)
    },
    GetScopesBYId: scopId => {
      return api.get(`/scopes/${scopId}`)
    },
    UpdateScopesById: (scopId, formData) => {
      return api.post(`/scopes/${scopId}`, formData)
    }
  }
// Task Tags api 
  export const TaskTagServices = {
    AddTags: formData => {
      return api.post(`/task-tags`, formData)
    },
    EditTags: (editId, formData) => {
      return api.post(`/task-tags/${editId}`, formData)
    },
    GetAllTaskTag: (page, length) => {
      return api.get(`/task-tags?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`)
    },
    deleteTagById: deleteIndex => {
      return api.delete(`/task-tags/${deleteIndex}`)
    },
  }

// Task Urgency Api 
 export  const TaskUrgencyServices = {
    AddUrgency: formData => {
      return api.post(`/task-urgencies`, formData)
    },
    EditUrgency: (editId, formData) => {
      return api.post(`/task-urgencies/${editId}`, formData)
    },
    GetAllTaskUrgency: (page, length) => {
      return api.get(`/task-urgencies?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`)
    },
    deleteUrgencytById: deleteIndex => {
      return api.delete(`/task-urgencies/${deleteIndex}`)
    },
  }