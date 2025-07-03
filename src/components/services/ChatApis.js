import ApiClient from './apiBase'
const ChatApis = {
  addMessage: data => {
    return ApiClient.post(`chat/sendMessage`, { message: data })
  },

  getAllMessages: () => {
    return ApiClient.get(`chat/getMessages`)
  }
}

export default ChatApis
