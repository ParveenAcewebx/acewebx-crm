import api from '@/lib/api'
const CustomerService = {
  GetCustomer: () => {
    return api.get(`/customers?limit=100`)
  },
  GetEngineers: () => {
    // return api.get(`/engineers?limit=100`)
    return api.get(`/projects-companies`)
  }
}
export default CustomerService

const Routes = {
  GETLIST: '/engineers'
}

export const GetAllEngineers = {
  GetEngineersList: (params = {}) => {
    return api.get(Routes.GETLIST, {
      params: {
        limit: 100,
        ...params
      }
    })
  }
}
