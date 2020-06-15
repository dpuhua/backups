import Vue from 'vue'
import SwipCaptcha from './swip-captcha-dialog'
let instance

const SwipCaptchaConstructor = Vue.extend(SwipCaptcha)

const showPopup = function({ resolve, reject, callback }) {
  if (!instance) {
    instance = new SwipCaptchaConstructor({
      propsData: {
        onFit: (data) => {
          if (data) resolve(data)
          else reject(data)
          if (typeof callback === 'function') callback(data)
        }
      }
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
  }

  Vue.nextTick(() => {
    instance.show = true
  })
}

function PopupCaptcha(callback) {
  return new Promise((resolve, reject) => {
    showPopup({
      resolve,
      reject,
      callback
    })
  })
}

PopupCaptcha.close = () => {
  Vue.nextTick(() => {
    instance.show = false
  })
}

export default PopupCaptcha
