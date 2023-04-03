import { userlogin, logout } from '@/api/auth/user'

const state = () => ({
  patientInfo: {}
})

// getters
const getters = {
  patientInfo(state) {
    return state.patientInfo
  }
}

// mutations
const mutations = {
    SETPATIENTINFO(state,value){
        state.patientInfo = value
    }
}

// actions
const actions = {
  setPatientInfo(state,value){
      state.commit('SETPATIENTINFO',value)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
