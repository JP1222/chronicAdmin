import request from '../request'

// 动作库管理

// 医生或管理员查看所有的动作库
export function getAllAction(data) {
  return request({
    url: '/action/manage/all',
    method: 'post',
    data
  })
}

// 医生或管理员根据动作的id查看详情
export function getActionById(params) {
  return request({
    url: '/action/manage/findById',
    method: 'get',
    params
  })
}

// 图片上传
export function uploadImage(data) {
  return request({
    url: '/upload/editor/picture',
    method: 'post',
    config: {},
    data
  })
}

// 视频上传：
export function uploadVideo(data) {
  return request({
    url: '/upload/editor/video',
    method: 'post',
    config: {},
    data
  })
}

// ## 管理员新增动作：
export function addAction(data) {
  return request({
    url: '/action/manage/insert',
    method: 'post',
    data
  })
}

// 管理员更新动作
export function updateAction(data) {
  return request({
    url: '/action/manage/update',
    method: 'post',
    data
  })
}

// 管理员删除动作库
export function deleteAction(params) {
  return request({
    url: '/action/manage/delete',
    method: 'get',
    params
  })
}

// ===========================================================


// 返回所有类型
export const getAllActionType = (params) => {
  return request({
    url:'/action/type/manage/all',
    method: 'get',
    params
  })
}

// 新增动作类型
export const insertActionType = (data) =>{
  return request({
    url:'/action/type/manage/insert',
    method:'post',
    data
  })
}

// 更新动作类型
export function updateActionType(data){
  return request({
    url:'/action/type/manage/update',
    method:'post',
    data
  })
}

// 删除动作类型
export function deleteActionType(params){
  return request({
    url:'/action/type/manage/delete',
    method:'get',
    params
  })
}