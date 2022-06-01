import api from './api'
import { serializeParams } from '../helpers/utils'

export function getItems(filters) {
  let queryParams = ''
  if (filters) {
    queryParams = serializeParams(filters)
  }
  return api.get(`items${queryParams}`)
}

export function createItem(data) {
  return api.post('items', data)
}

export function updateItem(id, data) {
  return api.put(`items/${id}`, data)
}

export function deleteItem(id) {
  return api.delete(`items/${id}`)
}
