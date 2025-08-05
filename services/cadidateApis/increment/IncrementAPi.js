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

      sendIncrementInLink: id => {
        return api.post(`employee/send-increment-link/${id}`)
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


    //   chat apis
      addMessageEmployee: data => {
        return api.post(`employeeChat/sendMessage`,data )
      },
      editMessageEmployee: (id, data) => {
        return api.put(`employeeChat/updateMessage/${id}`, { message: data })
      },
      getByIdMessageEmployee: id => {
        return api.get(`employeeChat/getMessagesById?chatId=${id}`)
      },
      getAllMessagesEmployee: (id) => {
        console.log("ididid",id)
        return api.get(`employeeChat/getMessagesByEmployeeId?employeeId=${id}`)
      },
      deleteMessageEmployee: (id, data) => {
        return api.delete(`employeeChat/deleteMessage/${id}`)
      }
}

export default IncrementAPi
