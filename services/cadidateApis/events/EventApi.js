import api from "@/lib/api"

const EventApi = {
    addEvent: data => {
        return api.post(`event/save`, data)
    },
    editEvent: (id, data) => {
        return api.put(`event/updateEvent/${id}`, data)
    },
    getByIdEvent: id => {
        return api.get(`event/getEventById?id=${id}`)
    },
    getAllEvent: (page, length) => {
        return api.get(`event/getAllEvent?page=${page}&limit=${length}`)
    },
    deleteEvent: id => {
        return api.delete(`event/deleteEvent/${id}`)
    },
    // getAllEventByType: (type) => {
    //     return api.get(`event/getSkillByType/${type}`)
    // },

    globalEventGetApi: () => {
        return api.get(`/event/globalSkill`)
    }
    // getUSkillByFilter: data => {
    //     return api.get(
    //         `auth/getAllUser?page=${data?.page}&limit=${data?.limit}&name=${data?.name}&email=${data?.email}&currentSalary=${data?.currentSalary}`
    //     )
    // }
}

export default EventApi
