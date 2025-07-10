import api from '@/lib/api'

const MaterialQuotesService = {
  // Leads Setting Status
  getMaterialQuotesList: (length, page) => {
    if ((page, length)) {
      return api.get(
        `/material-quotes?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
      )
    } else {
      return api.get(`/material-quotes?limit=100`)
    }
  },
  AddMaterial: formData => {
    return api.post(`/material-quotes`, formData)
  },

  deleteMaterialQuoteById: deleteIndex => {
    return api.delete(`/material-quotes/${deleteIndex}`)
  },
  GetMaterialStatusBYId: id => {
    return api.get(`/material-quotes/${id}`)
  },
  UpdateMaterialQuotesById: (id, formData) => {
    return api.post(`/material-quotes/${id}`, formData)
  }
}
export default MaterialQuotesService

export const MaterialService = {
  // Leads Setting Status
  getMaterialList: (length, page) => {
    return api.get(
      `/materials?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
    )
  },
  AddMaterial: formData => {
    return api.post(`/materials`, formData)
  },

  deleteMaterialById: deleteIndex => {
    return api.delete(`/materials/${deleteIndex}`)
  },
  GetMaterialBYId: id => {
    return api.get(`/materials/${id}`)
  },
  UpdateMaterialById: (id, formData) => {
    return api.post(`/materials/${id}`, formData)
  }
}
