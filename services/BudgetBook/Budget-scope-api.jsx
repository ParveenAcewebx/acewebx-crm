import api from '@/lib/api'
const BudgetScopeService = {
  AddScopes: formData => {
    return api.post(`/scopes`, formData)
  },

  GetAllScopes: (page, length) => {
    return api.get(`/scopes?limit=100&page=${page}&per_page=${length}`)
  },
  deleteScopeById: deleteIndex => {
    return api.delete(`/scopes/${deleteIndex}`)
  },
  GetScopesBYId: scopId => {
    return api.get(`/scopes/${scopId}`)
  },
  UpdateScopesById: (scopId, formData) => {
    return api.post(`/scopes/${scopId}`, formData)
  },
  addSillPlate: formData => {
    return api.post(`/sill-plate-project`, formData)
  },

  //budget category service
  AddCategory: formData => {
    return api.post(`/budget-categories`, formData)
  },
  GetCategoryBYId: categoryId => {
    return api.get(`/budget-categories/${categoryId}`)
  },
  UpdateCategoryById: (categoryId, formData) => {
    return api.post(`/budget-categories/${categoryId}`, formData)
  },
  GetAllCategory: (page, length) => {
    return api.get(`/get-budget-category?page=${page}&per_page=${length}`)
  },
  DeleteCategoryById: deleteIndex => {
    return api.delete(`/budget-categories/${deleteIndex}`)
  },

  AddKeyAreas: formData => {
    return api.post(`/budget-key-areas`, formData)
  },
  GetaKeyAreasBYId: keyAreasId => {
    return api.get(`/budget-key-areas/${keyAreasId}`)
  },
  UpdateKeyAreasById: (keyAreasId, formData) => {
    return api.post(`/budget-key-areas/${keyAreasId}`, formData)
  },
  GetAllKeyAreas: (page, length) => {
    return api.get(`/budget-key-areas?page=${page}&per_page=${length}`)
  },
  DeleteKeyAreasById: deleteIndex => {
    return api.delete(`/budget-key-areas/${deleteIndex}`)
  }
}
export default BudgetScopeService
