import request from '../request'

// 系统管理（角色：admin）

// 查看所有医生的信息
export function getAllDocInfo(data) {
  return request({
    url: '/system/allDoctor',
    method: 'post',
    data
  })
}

//添加用户
export function addDoc(data) {
  return request({
    url: '/system/insertDoctor',
    method: 'post',
    data
  })
}


//获取医生信息
export function getDocInfo(){
  return request({
    url: '/user',
    method: 'get',
  })
}

// 修改医生个人信息
export function updateDocInfo(data){
  return request({
    url: '/update/info',
    method: 'post',
    data
  })
}

//修改医生信息
export function updateDoc(data) {
  return request({
    url: '/system/update',
    method: 'post',
    data
  })
}

// 获取机构
export function getOrgList() {
  return request({
    url: '/organization/list',
    method: 'get'
  })
}

// 删除医生
export function deleteDocById(params) {
  return request({
    url: '/system/delete',
    method: 'get',
    params
  })
}

// 管理员查看日志
export function getAllLog(params) {
  return request({
    url: '/log/getAll',
    method: 'get',
    params
  })
}
