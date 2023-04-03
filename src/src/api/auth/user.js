import request from '../request'

export function userlogin(data) {
  return request({
    url: '/doctor/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
