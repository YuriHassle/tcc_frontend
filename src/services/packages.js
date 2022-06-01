import api from './api'
import { serializeParams } from '../helpers/utils'

const baseUrl = 'packages'

export function getPackages(filters) {
  let queryParams = ''
  if (filters) {
    queryParams = serializeParams(filters)
  }
  return api.get(`${baseUrl}${queryParams}`)
}

export function createPackage(data) {
  return api.post(baseUrl, data)
}

export function updatePackage(id, data) {
  return api.put(`${baseUrl}/${id}`, data)
}

export function deletePackage(id) {
  return api.delete(`${baseUrl}/${id}`)
}
