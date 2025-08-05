import api from "@/lib/api"

const IncrementsTabApi = {
    addIncrementsTab: data => {
        return api.post(`increments/save`, data)
    },

    getAllPastIncrements : (page, length) => {
        return api.get(`increments/getAllEmployee?page=${page}&limit=${length}`)
    },
    getAllNewIncrements: (page, length) => {
        return api.get(`increments/getAllEmployee?page=${page}&limit=${length}`)
    },
    // editEmployees: (id, data) => {
    //     return api.put(`employee/updateEmployee/${id}`, data)
    // },
    // getByIdEmployees: id => {
    //     return api.get(`employee/getEmployeeById/${id}`)
    // },
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

export default IncrementsTabApi
