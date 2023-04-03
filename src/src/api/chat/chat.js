import request from '../request'

// 获取医生端或患者端的通讯列表
export function getChatList() {
  return request({
    url: '/webSocket/getList',
    method: 'get'
  })
}

// 根据toUid得到通讯内容
export function getChatContentById(params) {
  return request({
    url: '/webSocket/getMessage',
    method: 'get',
    params
  })
}
