import axios from 'axios'
import { ElMessage } from 'element-plus'

// https://www.aikeyunkang.top:8081
const baseURL = '/api'
// const baseURL = 'https://192.168.88.8:443'

const service = axios.create({
  baseURL,
  timeout: 5000
})

const requsetQueue = []

// config.withCredentials = true
// 请求拦截
service.interceptors.request.use(async (config) => {
  // 函数节流
  // let flag = await stopRepeatRequest(
  //   requsetQueue,
  //   config.url,
  //   `${config.url} 请求重复`
  // )
  // if (flag) {
  //   return
  // }
  config.withCredentials = true
  return config
})

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    ElMessage({
      message: '服务器出错，请联系维护人员！',
      type: 'error',
      duration: 3 * 1000
    })
    console.log(error)
    return Promise.reject(error)
  }
)

//请求中的URL集合
function stopRepeatRequest(reqList, url, errorMessage) {
  if (reqList.length) {
    let arr = reqList.filter((item) => item == url)
    if (arr.length) {
      console.log(errorMessage, 49)
      return true
    }
  }
  reqList.push(url)
}

export function getURl() {
  return baseURL
}

export default service
