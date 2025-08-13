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
    }

  
}

export default BirthdaysApi
