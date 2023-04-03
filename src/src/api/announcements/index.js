import request from '../request'

// 管理员获取公告
export function getNoticeByAdmin(data) {
  return request({
    url: '/notice/allforAdmin',
    method: 'post',
    data
  })
}

// 用户获取公告
export function getNoticeByUser(params) {
  return request({
    url: '/notice/allforUser',
    method: 'get',
    params
  })
}

// 管理员新增公告
export function insertNotice(data) {
  return request({
    url: '/notice/insert',
    method: 'post',
    data
  })
}

// 选为轮播图
export function submitChiose(params) {
  return request({
    url: `/notice/setPictures?ids=${params}`,
    method: 'get'
  })
}

// 根据id对公告信息进行删除
export function deleteNotice(params) {
  return request({
    url: '/notice/delete',
    method: 'get',
    params
  })
}

// 管理员修改公告信息

export function changeNotice(data) {
  return request({
    url: '/notice/update',
    method: 'post',
    data
  })
}
