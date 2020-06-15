import SwipCaptchaDialog from './components/index.js'

export default function install(Vue) {
  Vue.prototype.$popupCaptcha = SwipCaptchaDialog
}
