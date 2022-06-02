import api from './api'
import { serializeParams } from '../helpers/utils'

const baseUrl = 'bookings'

export function getBookings(filters) {
  let queryParams = ''
  if (filters) {
    queryParams = serializeParams(filters)
  }
  return api.get(`${baseUrl}${queryParams}`)
}

export function createBooking(data) {
  return api.post(baseUrl, data)
}

export function updateBooking(id, data) {
  return api.put(`${baseUrl}/${id}`, data)
}

export function deleteBooking(id) {
  return api.delete(`${baseUrl}/${id}`)
}
