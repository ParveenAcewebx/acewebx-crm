import api from "@/lib/api"

const AnniversariesApi = {
    addAnniversary: data => {
        return api.post(`anniversary/save`, data)
    },

    getAllPastAnniversaries : (page, length) => {
        return api.get(`anniversary/getAllEmployee?page=${page}&limit=${length}`)
    },
    getAllNewAnniversaries: (page, length) => {
        return api.get(`anniversary/getAllEmployee?page=${page}&limit=${length}`)
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

export default AnniversariesApi
