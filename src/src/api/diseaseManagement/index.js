import request from '../request'

//根据患者的id返回该患者的疾病汇报(医生)
export function getDiseaseById(params) {
  return request({
    url: '/disease/manage/findById',
    method: 'get',
    params
  })
}

// 根据患者的id返回该患者的疾病汇报(管理员)
export function getDiseaseByIdForAdm(params) {
  return request({
    url: '/disease/manage/findByPid',
    method: 'get',
    params
  })
}

// 返回该医生对应所有患者的疾病汇报（可搜索）
export function getAllDiseaseForDoc(params) {
  return request({
    url: '/disease/manage/allForDoctor',
    method: 'get',
    params
  })
}

//   管理员返回所有病人的疾病汇报（可搜索）
export function getAllDiseaseForAdmin(params) {
  return request({
    url: '/disease/manage/allForAdmin',
    method: 'get',
    params
  })
}

// 返回所有医生的id
export function getAllDocList() {
  return request({
    url: '/patient/manage/allDoctor',
    method: 'get'
  })
}

// 医生新增疾病汇报
export function addDiseaseForDoc(data) {
  return request({
    url: '/disease/manage/insertForDoctor',
    method: 'post',
    data
  })
}

// 管理员新增疾病汇报
export function addDiseaseForAdm(data) {
  return request({
    url: '/disease/manage/insertForAdmin',
    method: 'post',
    data
  })
}

// 医生根据id修改疾病汇报
export function editDiseaseForDoc(data) {
  return request({
    url: '/disease/manage/updateForDoctor',
    method: 'post',
    data
  })
}

// 管理员根据id修改疾病汇报
export function editDiseaseForAdm(data) {
  return request({
    url: '/disease/manage/updateForAdmin',
    method: 'post',
    data
  })
}

// 根据id对疾病汇报进行删除
export function deletDiseaseById(params) {
  return request({
    url: '/disease/manage/delete',
    method: 'get',
    params
  })
}
