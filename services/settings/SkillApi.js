import api from "@/lib/api"

const SkillApi = {
    addSkill: data => {
        return api.post(`skill/save`, data)
    },
    editSkill: (id, data) => {
        return api.put(`skill/updateSkill/${id}`, data)
    },
    getByIdSkill: id => {
        return api.get(`skill/getSkillById/${id}`)
    },
    getAllSkill: (page, length) => {
        return api.get(`skill/getAllSkill?page=${page}&limit=${length}`)
    },
    deleteSkill: id => {
        return api.delete(`skill/deleteSkill/${id}`)
    },
    getAllSkillByType: (type) => {
        return api.get(`skill/getSkillByType/${type}`)
    },

    globalSkillGetApi: () => {
        return api.get(`/globalSettings`)
    },
    skillListFilters: data => {
        const search = data?.search ?? ''
        return api.get(
          `skill/getAllSkill?search=${search}`
        )
      },

}

export default SkillApi
