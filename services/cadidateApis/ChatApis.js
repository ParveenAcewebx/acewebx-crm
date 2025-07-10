import api from "@/lib/api"

const ChatApis = {
  addMessage: data => {
    return api.post(`chat/sendMessage`, { message: data })
  },
  editMessage: (id, data) => {
    return api.put(`chat/updateMessage/${id}`, { message: data })
  },
  getByIdMessage: id => {
    return api.get(`chat/getMessagesById?chatId=${id}`)
  },
  getAllMessages: () => {
    return api.get(`chat/getMessages`)
  },
  deleteMessage: (id, data) => {
    return api.delete(`chat/deleteMessage/${id}`)
  }
}

export default ChatApis
