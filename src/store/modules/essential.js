const state = () => ({
  showSideMenu: false,
})

const getters = {}

const actions = {}

const mutations = {
  UPDATE_SHOW_SIDE_MENU(state, status) {
    state.showSideMenu = status
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
