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
    getAllSkill: () => {
        return api.get(`skill/getAllSkill`)
    },
    deleteSkill: id => {
        return api.delete(`skill/deleteSkill/${id}`)
    },
    // getUSkillByFilter: data => {
    //     return api.get(
    //         `auth/getAllUser?page=${data?.page}&limit=${data?.limit}&name=${data?.name}&email=${data?.email}&currentSalary=${data?.currentSalary}`
    //     )
    // }
}

export default SkillApi
