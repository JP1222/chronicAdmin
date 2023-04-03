import request from '../request'

// 药物管理

// 医生获取对应的药物指导（可搜索）
export function getDrugListForDoc(params) {
  return request({
    url: '/drug/manage/allForDoctor',
    method: 'get',
    params
  })
}

// // 管理员获取所有的药物指导（可搜索）
export function getDrugListForAdm(params) {
  return request({
    url: '/drug/manage/allForAdmin',
    method: 'get',
    params
  })
}

// 医生新增药物指导
export function addDrugForDoc(data) {
  return request({
    url: '/drug/manage/insertForDoctor',
    method: 'post',
    data
  })
}

// 管理员新增饮食指导
export function addDrugForAdm(data) {
  return request({
    url: '/drug/manage/insertForAdmin',
    method: 'post',
    data
  })
}

// 医生修改饮食指导
export function updateDrugForDoc(data) {
  return request({
    url: '/drug/manage/updateForDoctor',
    method: 'post',
    data
  })
}

// 管理员修改饮食指导
export function updateDrugForAdm(data) {
  return request({
    url: '/drug/manage/updateForAdmin',
    method: 'post',
    data
  })
}

// 根据id获取药物指导
export function getDrugGuideById(params) {
  return request({
    url: '/drug/manage/getById',
    method: 'get',
    params
  })
}

// 根据id删除药物指导
export function deleteDrugById(params) {
  return request({
    url: '/drug/manage/delete',
    method: 'get',
    params
  })
}
