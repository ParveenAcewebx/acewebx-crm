import api from '@/lib/api'
const UserServices = {
  AddUser: formData => {
    return api.post(`/users`, formData)
  },
  EditUser: (editId, formData) => {
    return api.post(`/users/${editId}`, formData)
  },
  GetAllUser: (page, length) => {
    return api.get(
      `/users?limit=100&sort_column=undefined&sort_direction=undefined&per_page=${length}&page=${page}`
    )
  },
  deleteUserById: deleteIndex => {
    return api.delete(`/users/${deleteIndex}`)
  },

  AddUserRole: formData => {
    return api.post(`/roles`, formData)
  },
  EditUserRole: (editId, formData) => {
    return api.post(`/roles/${editId}`, formData)
  },
  GetAllUserRoles: (page, length) => {
    return api.get(
      `/roles?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
    )
  },
  deleteUserRoleById: deleteIndex => {
    return api.delete(`/roles/${deleteIndex}`)
  }
}
export default UserServices
export const RolesServices = {
  roles: () => {
    return api.get(`/roles`)
  },
  
}
export const UsersServices = {
  users: () => {
    return api.get(`/users`)
  },
}