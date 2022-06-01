import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import inn from './modules/inn'
import essential from './modules/essential'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    inn,
    essential,
  },
})
