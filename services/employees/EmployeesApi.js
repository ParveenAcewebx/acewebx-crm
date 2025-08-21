import api from "@/lib/api"

const EmployeesApi = {
  addEmployees: data => {
    return api.post(`employee/save`, data)
  },
  editEmployees: (id, data) => {
    return api.put(`employee/updateEmployee/${id}`, data)
  },
  getByIdEmployees: id => {
    return api.get(`employee/getEmployeeById/${id}`)
  },
  getAllEmployees: (page, length, status) => {
    return api.get(`employee/getAllEmployee?page=${page}&limit=${length}&status=${status}`)
  },
  deleteEmployees: id => {
    return api.delete(`employee/deleteEmployee/${id}`)
  },
  getAllEmployeesByType: (type) => {
    return api.get(`skill/getSkillByType/${type}`)
  },

  globalEmployeesGetApi: () => {
    return api.get(`/skill/globalSkill`)
  },
  activityDevEmployees: (module, editId) => {
    return api.get(
      `activity/logs?module=${module}&moduleId=${editId}`
    )
  },
  employeesListFilters: data => {
    const search = data?.search ?? ''
    return api.get(
      `employee/getAllEmployee?search=${search}&status=${data?.status}&currentShift=${data?.currentShiftValue}`
    )
  },

  // csv 
  employeeCSVList: (formData) => {

    return api.post(`employee/importEmployees`, formData)
  },
  // csv 
  incrementCSVList: (formData) => {
    return api.post(`employee/importEmployeesincrements`, formData)
  },













  //   chat apis
  addMessageEmployee: data => {
    return api.post(`employeeChat/sendMessage`, data)
  },
  editMessageEmployee: (id, data) => {
    return api.put(`employeeChat/updateMessage/${id}`, { message: data })
  },
  getByIdMessageEmployee: id => {
    return api.get(`employeeChat/getMessagesById?chatId=${id}`)
  },
  getAllMessagesEmployee: (id) => {
    return api.get(`employeeChat/getMessagesByEmployeeId?employeeId=${id}`)
  },
  deleteMessageEmployee: (id, data) => {
    return api.delete(`employeeChat/deleteMessage/${id}`)
  }
}

export default EmployeesApi
