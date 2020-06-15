// 组件api
import Vue from 'vue'
import Login from '@/components/account/index.vue'

export default ({ app }, inject) => {
  const VLogin = Vue.extend(Login)
  inject('Account', () => {
    if (typeof document === 'undefined') return
    const VIM = new VLogin({
      el: document.createElement('div'),
      store: app.store,
      router: app.router,
      data: () => ({
        dialogFormVisible: true
      })
    })
    // 添加节点
    document.body.appendChild(VIM.$el)
    return VIM
  })
  // inject('Test', () => {})
}
