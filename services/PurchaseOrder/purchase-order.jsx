import api from '@/lib/api'

const PurchaseOrderService = {
  addPurchaseOrder: formData => {
    return api.post(`/purchase-order`, formData)
  },

  getPurchaseorder: (page, length) => {
    if ((page, length)) {
      return api.get(`/purchase-order?page=${page}&per_page=${length}`)
    } else {
      return api.get(`/purchase-order?limit=100`)
    }
  },
  deletePurchaseorder: deleteIndex => {
    return api.delete(`/purchase-order/${deleteIndex}`)
  },
  getPurchaseorderById: purchaseOrderId => {
    return api.get(`/purchase-order/${purchaseOrderId}`)
  },
  updatePurchaseorder: (purchaseOrderId, data) => {
    return api.put(`/purchase-order/${purchaseOrderId}`, data)
  },
  purchaseOrderInventory: id => {
    return api.get(`/purchase-order-inventory/${id}`)
  }
}

export default PurchaseOrderService
