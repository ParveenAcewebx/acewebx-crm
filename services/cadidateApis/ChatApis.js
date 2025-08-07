import api from "@/lib/api"

const ChatApis = {
  addMessage: data => {
    return api.post(`chat/sendMessage`,data )
  },
  editMessage: (id, data) => {
    return api.put(`chat/updateMessage/${id}`, { message: data })
  },
  getByIdMessage: id => {
    return api.get(`chat/getMessagesById?chatId=${id}`)
  },
  getAllMessages: (id) => {
    return api.get(`chat/getMessages?candidateId=${id}`)
  },
  deleteMessage: (id, data) => {
    return api.delete(`chat/deleteMessage/${id}`)
  }
}

export default ChatApis
