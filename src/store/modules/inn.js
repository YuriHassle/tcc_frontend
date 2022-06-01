const state = () => ({
  activeInn: null,
})

const getters = {}

const actions = {
  selectActiveInn({ commit }, inn) {
    commit('setActiveInn', inn || null)
  },
}

const mutations = {
  setActiveInn(state, inn) {
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
