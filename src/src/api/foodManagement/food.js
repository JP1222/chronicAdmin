import request from '../request'

// 饮食管理模块
// 饮食指导

// 医生获取对应的饮食指导（可搜索）
export function getFoodListForDoc(params) {
  return request({
    url: '/food/manage/allForDoctor',
    method: 'get',
    params
  })
}

// 管理员获取所有的饮食指导（可搜索）
export function getFoodListForAdm(params) {
  return request({
    url: '/food/manage/allForAdmin',
    method: 'get',
    params
  })
}

// 根据id获取饮食指导
export function getFoodById(params) {
  return request({
    url: 'food/manage/getById',
    method: 'get',
    params
  })
}

// 返回所有医生的id、account、name、oid、organizationName（下拉框）
export function getAllDocList() {
  return request({
    url: '/patient/manage/allDoctor',
    method: 'get'
  })
}

// 根据医生的id得到对应的患者的id和name
export function getPatientByDocId(params) {
  return request({
    url: '/patient/manage/getListByDid',
    method: 'get',
    params
  })
}

// 医生新增饮食指导
export function addZhiDaoForDoc(data) {
  return request({
    url: '/food/manage/insertForDoctor',
    method: 'post',
    data
  })
}
// 管理员新增饮食指导
export function addZhiDaoforAdmi(data) {
  return request({
    url: '/food/manage/insertForAdmin',
    method: 'post',
    data
  })
}

// 医生修改饮食指导
export function updateZhiDaoForDoc(data) {
  return request({
    url: '/food/manage/updateForDoctor',
    method: 'post',
    data
  })
}

// 医生修改饮食指导
export function updateZhiDaoForAdm(data) {
  return request({
    url: '/food/manage/updateForAdmin',
    method: 'post',
    data
  })
}

// 医生或管理员删除饮食指导
export function deleteZhiDao(params) {
  return request({
    url: '/food/manage/delete',
    method: 'get',
    params
  })
}
