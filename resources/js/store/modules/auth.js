import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  user: null,
  isLoggedIn: localStorage.getItem('isLoggedIn')
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.isLoggedIn,
  check: state => state.user !== null
}
console.log(state.isLoggedIn)
// mutations
export const mutations = {
  [types.SET_LOGIN] (state) {
    localStorage.setItem('isLoggedIn', 'true')
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    localStorage.removeItem('isLoggedIn')
  },

  [types.LOGOUT] (state) {
    state.user = null
    localStorage.removeItem('isLoggedIn')
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  setLogin ({ commit, dispatch }) {
    commit(types.SET_LOGIN)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/api/user')

      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  async logout ({ commit }) {
    try {
      await axios.post('/logout')
    } catch (e) { }

    commit(types.LOGOUT)
  }
}
