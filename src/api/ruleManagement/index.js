import request from '../request'

// 查询所有套餐
export function getAllRule(data) {
  return request({
    url: '/rule/all',
    method: 'post',
    data
  })
}

// 新增套餐
export function createRule(data) {
  return request({
    url: '/rule/insert',
    method: 'post',
    data
  })
}

//更新套餐
export function updateRule(data) {
  return request({
    url: '/rule/update',
    method: 'post',
    data
  })
}

// 删除套餐
export function deleteRule(params) {
  return request({
    url: '/rule/delete',
    method: 'get',
    params
  })
}

// 获取所有账单
export function getAllBill(data) {
  return request({
    url: '/bill/all',
    method: 'post',
    data
  })
}

//删除账单
export function deleteBill(params) {
  return request({
    url: '/bill/delete',
    method: 'get',
    params
  })
}
