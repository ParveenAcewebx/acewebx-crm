import api from "@/lib/api"

const SalesChatApi = {
  addSaleMessage: data => {
    return api.post(`saleChat/sendMessage`,data )
  },
  editSaleMessage: (id, data) => {
    return api.put(`saleChat/updateMessage/${id}`, { message: data })
  },
  getByIdSaleMessage: id => {
    return api.get(`saleChat/getMessagesById?chatId=${id}`)
  },
  getAllSaleMessages: (id) => {
    return api.get(`saleChat/getMessages?candidateSaleId=${id}`)
  },
  deleteSaleMessage: (id, data) => {
    return api.delete(`saleChat/deleteMessage/${id}`)
  }
}

export default SalesChatApi
