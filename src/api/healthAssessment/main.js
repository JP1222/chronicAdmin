import request from '../request'
import { getURl } from '../request'

// 健康测评
export function getAllType() {
  return request({
    url: '/health/type',
    method: 'get'
  })
}

// 根据type返回数据
export function getTypeData(params) {
  return request({
    url: '/health/get',
    method: 'get',
    params
  })
}

// 返回历史数据
export function getHistroyData(params) {
  return request({
    url: '/health/history',
    method: 'get',
    params
  })
}

// 新增健康调查
export function addHealthyAssess(url, data) {
  return request({
    url: `${url}/insert`,
    method: 'post',
    data
  })
}

// 更新健康调查
export function updateHealthyAssess(url, data) {
  return request({
    url: `${url}/update`,
    method: 'post',
    data
  })
}

export function adduploadUrl(url) {
  let baseURL = getURl()
  return `${baseURL}/${url}/insert`
}
