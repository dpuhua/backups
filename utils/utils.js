// 数据按照拼音排序，分类(data数据源，field数据中拼音的key)
export function dataLetterSort(data, field) {
  const list = []
  // 首字母 转 大写英文
  data.forEach((item) => {
    const letter = item[field].substr(0, 1).toUpperCase()
    if (!(letter in list)) {
      list[letter] = []
    }
    list[letter].push(item)
  })
  // 转换 格式
  const resault = []
  for (const key in list) {
    resault.push({
      label: key,
      children: list[key]
    })
  }
  // 进行 排序；
  resault.sort(function(x, y) {
    return x.label.charCodeAt(0) - y.label.charCodeAt(0)
  })

  return resault
}
/**
 * 动态加载JS
 * @param {string} url
 * @param {function} callback
 * @param {function} errorCallback
 */
export function loadJs(
  url = '',
  callback = () => {},
  errorCallback = () => {}
) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  if (typeof callback !== 'undefined') {
    if (script.readyState) {
      script.onreadystatechange = () => {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = () => {
        callback()
      }
    }
  }
  script.src = url
  script.onerror = errorCallback
  document.body.appendChild(script)
}

// 加载网易易盾
export function load163DunScript() {
  const URL = `https://cstaticdun.126.net/load.min.js?t=${Date.now()}&callback=onWyDunCallback`
  return new Promise((resolve, reject) => {
    window.onWyDunCallback = () => {
      resolve(window.initNECaptcha)
    }
    if (typeof window.initNECaptcha !== 'undefined') {
      resolve(window.initNECaptcha)
    } else {
      loadJs(URL, window.onWyDunCallback, reject)
    }
  })
}

/**
 * 存储localStorage
 */

export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */

export const getStore = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */

export const removeStore = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * @description 给手机号码/身份证号/银行卡号打位掩码
 * @param { String } Number 原号码
 * @return { String } 带掩码号码
 */

export const maskNumber = (val) => {
  const reg = /(\d{2})\d{3,17}(\d{2})/
  return val ? val.replace(reg, '$1****$2') : ''
}

// 手机号 130****0000
export const maskNumber2 = (val) => {
  const reg = /(\d{3})\d{4,16}(\d{4})/
  return val ? val.replace(reg, '$1****$2') : ''
}
