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
  deleteUser: id => {
    return ApiClient.delete(`auth/deleteUser/${id}`)
  },
  getUsersByFilter: data => {
    return ApiClient.get(
      `auth/getAllUser?page=${data?.page}&limit=${data?.limit}&name=${data?.name}&email=${data?.email}&currentSalary=${data?.currentSalary}`
    )
  }
}

export default UsersApi
