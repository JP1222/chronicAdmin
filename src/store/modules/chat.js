import { getChatList, getChatContentById } from '@/api/chat/chat'
import SocketService from '@/utils/system/global.js'
import { getNowTime } from '@/utils/params/date.js'


const state = () => ({
  selectId: 0,
  selectName: '',
  selectChat: [],
  chatList: [],
  scoketService: SocketService.Instance,
  loading: false
})

// getters
const getters = {
  chatList(state) {
    return state.chatList
  },
  selectChat(state) {
    return state.selectChat
  },
  selectName(state) {
    return state.selectName
  },
  selectId(state) {
    return state.selectId
  },
  loading(state) {
    return state.loading
  }
}

// mutations
const mutations = {
  SETCHATLIST(state, list) {
    state.chatList = list
  },
  SELECTID(state, id) {
    state.selectId = id
  },
  SELECTNAME(state, name) {
    state.selectName = name
  },
  SELECTCHAT(state, list) {
    state.selectChat = list
  },
  SETLOADING(state, isLoading) {
    state.loading = isLoading
  }
}

// actions
const actions = {
  init({ state }) {
    const did = window.sessionStorage.getItem('doctorId')
    SocketService.Instance.connect(did)
    state.scoketService = SocketService.Instance
  },
  // 发送信息
  sendMsg(context, { msg, type }) {
    return new Promise((resolve, reject) => {
      context.commit('SETLOADING', true)
      const obj = {
        uid: parseInt(sessionStorage.getItem('doctorId')),
        toUid: parseInt(context.state.selectId),
        time: getNowTime(),
        type: type,
        content: msg,
        role: 'doctor'
      }
      console.log('obj', obj)
      context.state.scoketService.send(obj)
      resolve(true)
    })
  },
  closeConn({ state }) {
    SocketService.Instance.close()
  },
  async fetchChatList({ commit, dispatch }) {
    const res = await getChatList()
    if (res.success) {
      console.log(res.body[0])
      const sId = res.body[0].toUid
      getChatContentById({ toUid: sId }).then((res) => {
        commit('SELECTCHAT', res.body)
      })
      commit('SELECTID', sId)
      commit('SELECTNAME', res.body[0].name)
      commit('SETCHATLIST', res.body)
    }
  },
  selectSession({ commit, dispatch }, item) {
    commit('SELECTID', item.toUid)
    commit('SELECTNAME', item.name)
    console.log(item)
    dispatch('fetchChatById', item.toUid)
  },
  fetchChatById({ commit }, id) {
    getChatContentById({ toUid: id }).then((res) => {
      commit('SELECTCHAT', res.body)
      commit('SETLOADING', false)
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
