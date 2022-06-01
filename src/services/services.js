import api from './api'
import { serializeParams } from '../helpers/utils'

const baseUrl = 'services'

export function getServices(filters) {
  let queryParams = ''
  if (filters) {
    queryParams = serializeParams(filters)
  }
  return api.get(`${baseUrl}${queryParams}`)
}

export function createService(data) {
  return api.post(baseUrl, data)
}

export function updateService(id, data) {
  return api.put(`${baseUrl}/${id}`, data)
}

export function deleteService(id) {
  return api.delete(`${baseUrl}/${id}`)
}
