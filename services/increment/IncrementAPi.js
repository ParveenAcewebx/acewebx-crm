import api from "@/lib/api"

const IncrementAPi = {
  addIncrementAPi: data => {
    return api.post(`increment/save`, data)
  },
  editIncrementAPi: (id, data) => {
    return api.put(`increment/updateIncrement/${id}`, data)
  },
  getByIdIncrementAPi: id => {
    return api.get(`increment/getIncrementById/${id}`)
  },
  getAllIncrementAPi: (page, length) => {
    return api.get(`increment/getAllIncrement?page=${page}&limit=${length}`)
  },
  deleteIncrementAPi: id => {
    return api.delete(`increment/deleteIncrement/${id}`)
  },
  getAllIncrementAPiByType: (type) => {
    return api.get(`increment/getSkillByType/${type}`)
  },
  IncrementListFilters: data => {
    const search = data?.search ?? ''
    return api.get(
      `increment/getAllIncrement?search=${search}`
    )
  },

  sendIncrementInLink: (id, eventID) => {
    return api.post(`employee/send-increment-link/${id}`, { empEventId: eventID })
  },
  getByIdVerifyIncrementAPi: id => {
    return api.post(`employee/confirm-increment-token/${id}`)
  },

  activityDevIncrementAPi: (module, editId) => {
    return api.get(
      `activity/logs?module=${module}&moduleId=${editId}`
    )
  },
  incrementAPisListFilters: data => {
    const search = data?.search ?? ''
    return api.get(
      `employee/getAllEmployee?search=${search}`
    )
  },


  // review increment :-
  IncrementGetByUUIDConfirm: id => {
    return api.get(`increment/confirm-reviewer-token/${id}`)
  },
  addIncrementReview: (idForForm, data) => {
    let id = idForForm
    return api.put(`increment/updateIncrementReview/${id}`, data)
  },



  //   chat apis
  addMessageIncrement: data => {
    return api.post(`employeeEventNote/sendMessage`, data)
  },
  editMessageIncrement: (id, data) => {
    return api.put(`employeeEventNote/updateMessage/${id}`, { message: data })
  },
  getByIdMessageIncrement: id => {
    return api.get(`employeeEventNote/getMessagesById?chatId=${id}`)
  },
  getAllMessagesIncrement: (id) => {
    return api.get(`employeeEventNote/getMessages?empEventId=${id}`)
  },
  deleteMessageIncrement: (id, data) => {
    return api.delete(`employeeEventNote/deleteMessage/${id}`)
  }
}

export default IncrementAPi
