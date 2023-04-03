import request from '../request'

// 管理员返回所有运动处方（可搜索）
export function getAllChuFangForAdm(params) {
  return request({
    url: '/prescribe/manage/allForAdmin',
    method: 'get',
    params
  })
}

// 返回医生对应的所有运动处方（可搜索）
export function getAllChuFangForDoc(params) {
  return request({
    url: '/prescribe/manage/allForDoctor',
    method: 'get',
    params
  })
}

// 获取动作库列表（下拉框）
export function getActionList() {
  return request({
    url: '/action/manage/getList',
    method: 'get'
  })
}

// 医生根据患者的id返回对应的运动处方
export function getChuFangByIdForDoc(params) {
  return request({
    url: '/prescribe/manage/findById',
    method: 'get',
    params
  })
}

// 管理员根据患者的id返回运动处方（多了doctorName）
export function getChuFangByIdForAdm(params) {
  return request({
    url: '/prescribe/manage/findByPid',
    method: 'get',
    params
  })
}

// 医生新增患者的运动处方
export function createChuFangForDoc(data) {
  return request({
    url: '/prescribe/manage/insertForDoctor',
    method: 'post',
    data
  })
}

// 管理员新增患者的运动处方
export function createChuFangForAdm(data) {
  return request({
    url: '/prescribe/manage/insertForAdmin',
    method: 'post',
    data
  })
}

// 医生更新患者的运动处方
export function updateChuFangForDoc(data) {
  return request({
    url: '/prescribe/manage/updateForDoctor',
    method: 'post',
    data
  })
}

// 管理员更新患者的运动处方
export function updateChuFangForAdm(data) {
  return request({
    url: '/prescribe/manage/updateForAdmin',
    method: 'post',
    data
  })
}

// 医生或管理员对运动处方进行删除操作
export function deleteChuFang(params){
  return request({
    url:'/prescribe/manage/delete',
    method:'get',
    params
  })
}