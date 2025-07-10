import api from '@/lib/api'

const EngineerServices = {
  engineers: () => {
    return api.get(`/engineers`)
  },
  AddEngineers: formData => {
    return api.post(`/engineers`, formData)
  }
}
export default EngineerServices
