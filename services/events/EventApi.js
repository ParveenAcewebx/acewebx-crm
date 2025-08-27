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
  

    globalEventGetApi: () => {
        return api.get(`/event/globalSkill`)
    },
    eventListFilters: data => {
        const search = data?.search ?? ''
        return api.get(
          `event/getAllEvent?search=${search}&page=${data.page}&limit=${data.length}`
        )
      },

      upComingEventList: () => {
        return api.get(
          `dashboard/upcoming-events`
        )
      },

}

export default EventApi
