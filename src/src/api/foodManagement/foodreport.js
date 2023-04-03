import request from '../request'

// 饮食汇报

// 医生查看饮食汇报（可搜索）
export function getAllHuibaoForDoc(params) {
  return request({
    url: '/food/report/manage/allForDoctor',
    method: 'get',
    params
  })
}

//   管理员查看饮食汇报（可搜索）
export function getAllHuibaoForAdm(params) {
  return request({
    url: '/food/report/manage/allForAdmin',
    method: 'get',
    params
  })
}

// 根据汇报的id返回具体信息
export function getFoodDetailById(params){
  return request({
    url: '/food/report/manage/getById',
    method: 'get',
    params
  })
}

// 医生或管理员提建议
export function adviceFoodById(data){
  return request({
    url: '/food/report/manage/advice',
    method: 'post',
    data
  })
}

//医生或管理员删除饮食汇报
export function deleteReport(params) {
  return request({
    url: '/food/report/manage/delete',
    method: 'get',
    params
  })
}
