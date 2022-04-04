import api from './api'

export function getInns() {
  return api.get('inns')
}

export function storeInn(data) {
  return api.post('inns', data)
}
