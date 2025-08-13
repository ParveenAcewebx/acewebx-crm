import api from "@/lib/api"

const AnniversariesApi = {
    addAnniversary: data => {
        return api.post(`anniversary/save`, data)
    },

    getAllPastAnniversaries : (eventId) => {
        return api.get(`employee/${eventId}/events`)
    },
    getAllNewAnniversaries: (page, length) => {
        return api.get(`anniversary/getAllEmployee?page=${page}&limit=${length}`)
    },
    editAnniversaries: (id ,eventId, data) => {
        return api.put(`/employee/${id}/updateEmployeeEvent/${eventId}`, data)
    },
    getByIdAnniversaries: (id,empId) => {
        return api.get(`employee/${id}/getEmployeeEventById/${empId}`)
    },
    

}

export default AnniversariesApi
