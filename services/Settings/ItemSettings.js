import api from '@/lib/api'

const ItemSettingsServices = {
  // product category
  AllProductCategories: (page, length) => {
    return api.get(`/product-categories?page=${page}&per_page=${length}`)
  },
  AddProductCategories: formData => {
    return api.post(`/product-categories`, formData)
  },
  getProductCategoriesById: editId => {
    return api.get(`/product-categories/${editId}`)
  },

  updateProductCategoriesById: (editId, values) => {
    return api.post(`/product-categories/${editId}`, values)
  },
  deleteProductCategories: deleteIndex => {
    return api.delete(`/product-categories/${deleteIndex}`)
  },

  // brands
  AllBrands: (page, length) => {
    return api.get(`/brands?page=${page}&per_page=${length}`)
  },
  AddBrands: formData => {
    return api.post(`/brands`, formData)
  },
  getBrandsById: editId => {
    return api.get(`/brands/${editId}`)
  },

  updateBrandsById: (editId, values) => {
    return api.post(`/brands/${editId}`, values)
  },
  deleteBrands: deleteIndex => {
    return api.delete(`/brands/${deleteIndex}`)
  },
  // product tags
  AllProductTags: (page, length) => {
    return api.get(`/product-tags?page=${page}&per_page=${length}`)
  },
  AddProductTags: formData => {
    return api.post(`/product-tags`, formData)
  },
  getProductTagsById: editId => {
    return api.get(`/product-tags/${editId}`)
  },

  updateProductTagsById: (editId, values) => {
    return api.post(`/product-tags/${editId}`, values)
  },
  deleteProductTags: deleteIndex => {
    return api.delete(`/product-tags/${deleteIndex}`)
  },
  // units
  AllUnits: (page, length) => {
    if ((page, length)) {
      return api.get(`/units?page=${page}&per_page=${length}`)
    } else {
      return api.get(`/units`)
    }
  },
  AddUnits: formData => {
    return api.post(`/units`, formData)
  },
  getUnitsById: editId => {
    return api.get(`/units/${editId}`)
  },

  updateUnitsById: (editId, values) => {
    return api.post(`/units/${editId}`, values)
  },
  deleteUnits: deleteIndex => {
    return api.delete(`/units/${deleteIndex}`)
  }
}
export default ItemSettingsServices
