import api from "@/lib/api"

const BirthdaysApi = {
    addBirthdays: data => {
        return api.post(`employee/save`, data)
    },

    getAllPastBirthdays : (page, length) => {
        return api.get(`employee/getAllEmployee?page=${page}&limit=${length}`)
    },
    getAllNewBirthdays: (page, length) => {
        return api.get(`employee/getAllEmployee?page=${page}&limit=${length}`)
    },
    editBirthdays: (id ,eventId, data) => {
        return api.put(`/employee/${id}/updateEmployeeEvent/${eventId}`, data)
    },
    getByIdBirthdays: (id,empId) => {
        return api.get(`employee/${id}/getEmployeeEventById/${empId}`)
    },
    // getAllEmployees: (page, length) => {
    //     return api.get(`employee/getAllEmployee?page=${page}&limit=${length}`)
    // },
    // deleteEmployees: id => {
    //     return api.delete(`employee/deleteEmployee/${id}`)
    // },
    // getAllEmployeesByType: (type) => {
    //     return api.get(`skill/getSkillByType/${type}`)
    // },

    // globalEmployeesGetApi: () => {
    //     return api.get(`/skill/globalSkill`)
    // },
    // activityDevEmployees: (module, editId) => {
    //     return api.get(
    //       `activity/logs?module=${module}&moduleId=${editId}`
    //     )
    //   },
    //   employeesListFilters: data => {
    //     const search = data?.search ?? ''
    //     return api.get(
    //       `employee/getAllEmployee?search=${search}`
    //     )
    //   },

  
}

export default BirthdaysApi
