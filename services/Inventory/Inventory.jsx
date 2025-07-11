import api from '@/lib/api'

const InventoryServices = {
  AddItems: formData => {
    return api.post(`/items`, formData)
  },

  GetAllItems: (length, page) => {
    if ((page, length)) {
      return api.get(
        `/items?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
      )
    } else {
      return api.get('/items')
    }
  },
  deleteItemsById: deleteIndex => {
    return api.delete(`/items/${deleteIndex}`)
  },
  GetItemsBYId: id => {
    return api.get(`/items/${id}`)
  },
  UpdateItemsById: (id, formData) => {
    return api.post(`/items/${id}`, formData)
  },

  // vendor apis
  AllVendors: (page, length) => {
    if ((page, length)) {
      return api.get(`/vendors?page=${page}&per_page=${length}`)
    } else {
      return api.get(`/vendors`)
    }
  },
  AddVendors: formData => {
    return api.post(`/vendors`, formData)
  },
  getVendorsById: editId => {
    return api.get(`/vendors/${editId}`)
  },

  updateVendorsById: (editId, values) => {
    return api.post(`/vendors/${editId}`, values)
  },
  deleteVendors: deleteIndex => {
    return api.delete(`/vendors/${deleteIndex}`)
  },

  // Warehouse apis
  AllWarehouse: (page, length) => {
    if ((page, length)) {
      return api.get(`/where-houses?page=${page}&per_page=${length}`)
    } else {
      return api.get(`/where-houses`)
    }
  },
  AddWarehouse: formData => {
    return api.post(`/where-houses`, formData)
  },
  getWarehouseById: editId => {
    return api.get(`/where-houses/${editId}`)
  },

  updateWarehouseById: (editId, values) => {
    return api.post(`/where-houses/${editId}`, values)
  },
  deleteWarehouse: deleteIndex => {
    return api.delete(`/where-houses/${deleteIndex}`)
  }
}
export default InventoryServices
