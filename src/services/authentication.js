import api from './api'

export function getLoggedUser() {
  return api.get('user')
}

export function login(data) {
  return api.post('login', data)
}

export function register(data) {
  return api.post('register', data)
}
