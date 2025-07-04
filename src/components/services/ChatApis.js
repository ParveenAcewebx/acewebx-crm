import ApiClient from './apiBase'
const ChatApis = {
  addMessage: data => {
    return ApiClient.post(`chat/sendMessage`, { message: data })
  },
  editMessage: (id, data) => {
    return ApiClient.put(`chat/updateMessage/${id}`, { message: data })
  },
  getByIdMessage: id => {
    return ApiClient.get(`chat/getMessagesById?chatId=${id}`)
  },
  getAllMessages: () => {
    return ApiClient.get(`chat/getMessages`)
  },
  deleteMessage: (id, data) => {
    return ApiClient.delete(`chat/deleteMessage/${id}`)
  }
}

export default ChatApis
