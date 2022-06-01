const state = () => ({
  activeInn: null,
})

const getters = {}

const actions = {
  setActiveInn({ commit }, inn) {
    if (inn) {
      localStorage.setItem('activeInn', JSON.stringify(inn))
      commit('UPDATE_ACTIVE_INN', inn)
    } else {
      localStorage.removeItem('activeInn')
      commit('UPDATE_ACTIVE_INN', null)
    }
  },
}

const mutations = {
  UPDATE_ACTIVE_INN(state, inn) {
    state.activeInn = inn
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
