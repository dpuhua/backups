import CryptoJS from 'crypto-js'
import { Message } from 'element-ui'
export default ({ $axios, app, store, route, env, redirect }, inject) => {
  $axios.defaults.timeout = 300000

  $axios.onRequest((config) => {
    config.data = config.data || {}
    // 请求头添加签名(config.isLogin=false表示不要求登陆态)
    const isLogin = !(typeof config.isLogin === 'boolean' && !config.isLogin)
    const token = store.state.token
    if (isLogin && token) {
      const unionId = store.state.unionId
      const timestamp = Date.now()
      const encode = `timestamp=${timestamp}&token=${token}&unionId=${unionId}`
      const sign = CryptoJS.HmacSHA256(encode, 'hdboms')
        .toString()
        .toLocaleUpperCase()

      config.headers = {
        ...config.headers,
        ...{
          timestamp,
          sign,
          unionId,
          Authorization: token
        }
      }
    }
    config.headers.terminalType = 'web'
    return config
  })

  $axios.onResponse((response) => {
    // 内部服务使用code，恒房通服务使用status
    if (+response.data.code === 0 || response.data.status === 0) {
      return response
    } else {
      // 错误码处理
      if (['G00008', 'G00401', 'G60001'].includes(response.data.code)) {
        store.dispatch('logout')
      }
      Message.error(response.data.message || response.data.code)
      const error = new Error(response.data.message || '')
      error.response = response
      return Promise.reject(error)
    }
  })

  $axios.onError((error) => {
    const response = error.response || {}
    let msg = ''
    if (error.message === 'CancelToken' || response.status === 200) {
      // 主动取消加载中请求条件，不需要alert
      return Promise.reject(response.data || {})
    }

    if (error.message === 'Network Error') {
      msg = '您的网络开小差了...'
    } else {
      msg = `接口异常(${response.status})`
    }
    Message.error(msg)
    return Promise.reject(response.data || {})
  })

  // inject('apiAjax', function (params) {
  //   this.$axios.setHeader('Content-Type', 'multipart/form-data;');
  //   return this.$axios();
  // })
}
