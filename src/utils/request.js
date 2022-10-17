import axios from "axios"
import router from "../router/index"
import store from "@/store/index"

// 创建请求方法体
const http = axios.create({
  // 在这里进行查看，是否为代理状态
  baseUrl: process.env.VUE_APP_OPEN_PROXY == true ? process.env.VUE_APP_BASE_URL : process.env.VUE_APP_BASE_URL,
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// 请求拦截
http.interceptors.request.use(function (config) {
  // 在这里带上 token
  config.headers["X-Jhuiyun-Token"] = JSON.parse(sessionStorage.getItem('toKen'))
  return config;
}, function (error) {
  return Promise.reject(error)
})


// 响应拦截
http.interceptors.response.use(function (response) {

  if (response.data && response.data.code === 401) {
    // 未登录 or token失效，重定向至登录页
    router.replace({
      name: 'login'
    })
    // 清除token 以及其他信息
    store.dispatch('user/clearUserInfo')
  }
  // 对响应数据做点什么
  if (response.data && response.data.code === 0) {
    return response
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  console.log(error)
  // 对响应错误做点什么
  if (error.response.data.status === 400) {
    // 未登录，token失效，重定向至登录页
    router.replace({
      name: 'login'
    })
    // 清除token 以及其他信息
    store.dispatch('user/clearUserInfo')
  } else if (error.response.status === 500) {
  }
  return Promise.reject(error);
});



/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/api]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.VUE_APP_OPEN_PROXY ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_URL) + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? Object.assign(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? Object.assign(data, defaults) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}


export default http