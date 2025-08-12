import api from "@/lib/api"

const IncrementsTabApi = {
    addIncrementsTab: data => {
        return api.post(`increments/save`, data)
    },

    getAllPastIncrements: (page, length) => {
        return api.get(`increments/getAllEmployee?page=${page}&limit=${length}`)
    },
    getAllNewIncrements: (page, length) => {
        return api.get(`increments/getAllEmployee?page=${page}&limit=${length}`)
    },

    saveEmployeeMetaData: (data) => {
        return api.post(`employee/saveEmployeeMetaData`, data)
    },
    getByIdIncrements: (eventId) => {
        return api.get(`employee/getEmployeeMetaData?eventId=${eventId}`)
    },
    getByIdIncrementsMetaData: (eventId) => {
        return api.get(`employee/getEmployeeMetaData?eventId=${eventId}`)
    },



}

export default IncrementsTabApi
