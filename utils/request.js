import axios from 'axios'
// import CryptoJS from 'crypto-js'
import config from '~/config'

const instance = axios.create({
  baseURL: process.server ? config.API_HOST : ''
})

instance.interceptors.request.use((config) => {
  // 请求头添加签名(config.isLogin=false表示不要求登陆态)
  /*
    const isLogin = !(typeof config.isLogin === 'boolean' && !config.isLogin)
    const token = store.getters.token
    if (isLogin && token) {
      const unionId = store.getters.unionId
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
    */
  config.headers.terminalType = 'web'
  return config
})

instance.interceptors.response.use((response) => {
  return response.data
})

export const post = instance.post
export const get = instance.get
export default instance
