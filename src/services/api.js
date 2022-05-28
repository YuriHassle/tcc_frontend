import axios from 'axios'
import router from '../router'
import store from '../store'
import alert from '../helpers/alerts'

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
})

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token')
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (router.history.current.name !== 'login') {
        router.push({ name: 'login' }).then(() => {
          store.dispatch('user/logout')
          alert(
            'info',
            'Sessão expirada',
            'Você foi redirecionado para a página de login porque sua sessão expirou.'
          )
        })
      }
    }
    return Promise.reject(error)
  }
)

export default api
