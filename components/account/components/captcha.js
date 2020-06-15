const COUNTDOWN = 10
export default {
  data() {
    return {
      captchaTimer: null
    }
  },
  methods: {
    async sendCaptcha(type = 1) {
      /* TODO 加载动画 */
      const pass = await this.verifySwipCaptcha() // 发送验证码
      if (!pass) return // TODO 滑块错误提示
      const sent = await this.sendMsgCaptcha(type)
      if (!sent) return // TODO 发送失败错误提示
      // 成功，设置倒数
      this.setCountdown()
    },
    async verifySwipCaptcha() {
      const { validate } = await this.$popupCaptcha()
      this.$popupCaptcha.close()
      if (!validate) return // TODO 滑块验证出错

      const { code } = await this.$store.dispatch('modules/user/apiDragImg', {
        validate
      })
      if (code === '000000') return true
      else return false
    },
    async sendMsgCaptcha(type) {
      try {
        const { code } = await this.$store.dispatch(
          'modules/user/apiGetCaptcha',
          {
            phone: this.form.phone,
            type
          }
        )
        if (code === '000000') return true
        else return false
      } catch (err) {
        return false
      }
    },
    setCountdown() {
      this.countdown = COUNTDOWN
      this.captchaTimer = setInterval(() => {
        if (this.countdown === 0) {
          clearInterval(this.captchaTimer)
        } else {
          this.countdown--
        }
      }, 1000)
    }
  }
}
