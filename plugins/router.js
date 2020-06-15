// import Login from '@/components/login/login.js'
// const whitePaths = ['/', '/building/*']

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // const path = to.fullPath.toLowerCase()
    // const valid = whitePaths.some((item) => {
    //   const whitePath = item.toLowerCase()
    //   if (/^.+\/\*$/.test(item)) {
    //     // 以/*结尾的
    //     const reg = new RegExp(`^${item.slice(0, -1)}`, 'i')
    //     return reg.test(path)
    //   } else {
    //     return whitePath === path
    //   }
    // })
    next()
  })
}
