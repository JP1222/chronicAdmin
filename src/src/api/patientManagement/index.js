import request from '../request'
// 患者管理

// 获取所有患者（医生）
export function getAllPaientBystaff(data) {
  return request({
    url: '/patient/manage/allForDoctor',
    method: 'post',
    data
  })
}

// 获取所有患者（管理员）
export function getAllPaientByAdmin(data) {
  return request({
    url: '/patient/manage/allForAdmin',
    method: 'post',
    data
  })
}

// 获取机构的id和名称（下拉框）
export function getMecIDName() {
  return request({
    url: '/organization/list',
    method: 'get'
  })
}

// 获取医生列表（管理员）
export function getDocList() {
  return request({
    url: '/patient/manage/allDoctor',
    method: 'get'
  })
}

// 获取患者每日数据

// 医生查看患者的血糖记录
export function getDayXueTangReport(params) {
  return request({
    url: '/health/all/sweet',
    method: 'get',
    params
  })
}

// 医生查看患者的血压记录
export function getDayXueYaReport(params) {
  return request({
    url: '/health/all/blood',
    method: 'get',
    params
  })
}

// 医生查看患者心率记录
export function getDayXinLvReport(params) {
  return request({
    url: '/health/all/quiet',
    method: 'get',
    params
  })
}

// 根据患者id获取历史步数
export function getUseStep(params){
  return request({
    url: '/step/get',
    method: 'get',
    params
  })
}

//导出患者步数
export function exportUserStep(params){
  return request({
    url: '/step/export',
    method: 'get',
    params
  })
}


// 医生添加患者
export function addPaientByStaff(data) {
  return request({
    url: '/patient/manage/insertForDoctor',
    method: 'post',
    data
  })
}

// 管理员添加患者
export function addPaientByAdmin(data) {
  return request({
    url: '/patient/manage/insertForAdmin',
    method: 'post',
    data
  })
}

// 医生更新患者的信息
export function updatePaientFofStaff(data) {
  return request({
    url: '/patient/manage/updateForDoctor',
    method: 'post',
    data
  })
}

// 管理员更新患者的信息
export function updatePaientFofAdmin(data) {
  return request({
    url: '/patient/manage/updateForAdmin',
    method: 'post',
    data
  })
}

// 根据id删除
export function deletePaientById(params) {
  return request({
    url: '/patient/manage/delete',
    method: 'get',
    params
  })
}
