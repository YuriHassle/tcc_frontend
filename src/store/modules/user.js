import router from '@/router'
import {
  getLoggedUser,
  login as loginService,
  register as registerService,
} from '@/services/authentication'

const user = JSON.parse(localStorage.getItem('user'))
const loggingIn = { loggingIn: true }
const loggedIn = { loggedIn: true }
const loginFailure = { loginFailure: true }
const serverNotReachable = { serverNotReachable: true }
const initialState = user
  ? { loginStatus: loggedIn, user }
  : { loginStatus: {}, user: null }

const state = () => ({
  ...initialState,
})

const getters = {}

const actions = {
  register(_, payload) {
    return registerService(payload)
  },

  getUser(context) {
    return getLoggedUser().then(({ data }) => {
      context.commit('UPDATE_USER', data.data)
      localStorage.setItem('user', JSON.stringify(data.data.user))
    })
  },

  login({ commit }, payload) {
    commit('UPDATE_LOGIN_STATUS', loggingIn)
    return loginService(payload)
      .then(({ data }) => {
        if (data.success) {
          const user = data.data.user
          commit('UPDATE_USER', user)
          commit('UPDATE_LOGIN_STATUS', loggedIn)
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('user', JSON.stringify(user))
          router.push({ name: 'home' })
        }
      })
      .catch(({ response }) => {
        if (response?.status === 403) {
          commit('UPDATE_LOGIN_STATUS', loginFailure)
        } else {
          commit('UPDATE_LOGIN_STATUS', serverNotReachable)
        }
        commit('UPDATE_USER', null)
      })
  },

  logout({ commit, dispatch }) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')

    commit('UPDATE_USER', null)
    commit('UPDATE_LOGIN_STATUS', {})
    dispatch('inn/setActiveInn', null, { root: true })

    if (router.history.current.name != 'login') {
      router.push({ name: 'login' })
    }
  },
}

const mutations = {
  UPDATE_USER(state, payload) {
    state.user = payload
  },
  UPDATE_LOGIN_STATUS(state, payload) {
    state.loginStatus = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
