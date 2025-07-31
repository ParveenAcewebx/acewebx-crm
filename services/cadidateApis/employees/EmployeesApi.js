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
    getAllEmployees: (page, length) => {
        return api.get(`employee/getAllEmployee?page=${page}&limit=${length}`)
    },
    deleteEmployees: id => {
        return api.delete(`employee/deleteEmployee/${id}`)
    },
    getAllEmployeesByType: (type) => {
        return api.get(`skill/getSkillByType/${type}`)
    },

    globalEmployeesGetApi: () => {
        return api.get(`/skill/globalSkill`)
    }
    // getUSkillByFilter: data => {
    //     return api.get(
    //         `auth/getAllUser?page=${data?.page}&limit=${data?.limit}&name=${data?.name}&email=${data?.email}&currentSalary=${data?.currentSalary}`
    //     )
    // }
}

export default EmployeesApi
