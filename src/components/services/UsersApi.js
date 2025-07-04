import ApiClient from './apiBase'
const UsersApi = {
  addUser: data => {
    return ApiClient.post(`auth/register`, data)
  },
  editUser: (id, data) => {
    return ApiClient.put(`auth/updateUser/${id}`, data)
  },
  getByIdUser: id => {
    return ApiClient.get(`auth/getUserById?userId=${id}`)
  },
  getAllUsers: () => {
    return ApiClient.get(`auth/getAllUser`)
  },
  deleteUser: (id, data) => {
    return ApiClient.delete(`auth/deleteUser/${id}`)
  }
}

export default UsersApi
