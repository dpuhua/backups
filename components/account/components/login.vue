<template>
  <section class="login-box">
    <!-- 头部 -->
    <div class="hd">
      <h2 class="title">登录</h2>
      <p class="sub-title">
        没有账号
        <a class="link" @click="$emit('switch', 'register')">去注册</a>
        <a class="fr" @click="$emit('switch', 'forgot')">忘记密码？</a>
      </p>
    </div>

    <div class="bd">
      <div class="nav-tabs">
        <div class="nav-tabs">
          <div
            :class="{ active: loginMode === 0 }"
            class="nav"
            @click="loginMode = 0"
          >
            账号密码登录
          </div>
          <div
            :class="{ active: loginMode === 1 }"
            class="nav"
            @click="loginMode = 1"
          >
            手机验证码登录
          </div>
        </div>
      </div>

      <div class="con">
        <el-form ref="loginForm" :model="loginForm" :rules="rules">
          <!-- 手机号 -->
          <el-form-item prop="phone">
            <el-input
              v-model="loginForm.phone"
              type="tel"
              placeholder="请输入手机号"
            />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item v-if="loginMode === 0" prop="pwd" class="mb0">
            <el-input
              v-model="loginForm.pwd"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>

          <!-- 验证码 -->
          <el-form-item v-else-if="loginMode === 1" prop="captcha" class="mb0">
            <el-input
              v-model="loginForm.captcha"
              type="number"
              placeholder="请输入验证码"
            />
            <button
              class="send-btn"
              :disabled="disabledCaptcha"
              @click.stop.prevent="sendCaptcha"
            >
              <span v-if="countdown === 0" class="default">发送验证码</span>
              <span v-else class="countDown">{{ countdown }}s</span>
              <!-- TODO倒数样式修改 -->
            </button>
          </el-form-item>

          <el-form-item class="habit-box">
            <el-checkbox v-model="rememberMe" class="fl">
              记住账号
            </el-checkbox>
            <el-checkbox v-model="autoCheckin" class="fr">
              7天内免登录
            </el-checkbox>
          </el-form-item>
          <el-form-item class="mb0">
            <el-button
              class="btn block login-btn"
              type="primary"
              :disabled="disabledLogin"
              :loading="loading"
              loading-text="登陆中"
              @click="doLogin('loginForm')"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 协议 -->
      <div class="note-box">
        登录即代表同意
        <span class="link">《XXX用户协议》</span>
        及
        <span class="link">《XXX隐私政策》</span>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import SparkMD5 from 'spark-md5'
import NetCaptcha from '~/components/ne-captcha'
Vue.use(NetCaptcha)
const COUNTDOWN = 10
const PhoneRegex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

export default {
  components: {},
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!PhoneRegex.test(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
    return {
      visible: true,
      loginMode: 1, // 1 验证码登录 0 密码登录
      loginForm: {
        phone: '',
        captcha: '',
        pwd: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkPhone,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      showSwiperCaptcha: false,
      rememberMe: false,
      autoCheckin: false, // 7 天免登录
      countdown: 0, // 验证码倒数
      loading: false
    }
  },
  computed: {
    disabledCaptcha() {
      return !PhoneRegex.test(this.loginForm.phone) || this.countdown > 0
    },
    disabledLogin() {
      if (this.loginMode === 0) {
        return !this.loginForm.phone || !this.loginForm.pwd
      } else {
        return !this.loginForm.phone || !this.loginForm.captcha
      }
    }
  },
  mounted() {},
  methods: {
    async sendCaptcha() {
      /* TODO 加载动画 */
      const pass = await this.verifySlideCaptcha() // 发送验证码
      if (!pass) return // TODO 滑块错误提示
      const sent = await this.sendMsgCaptcha()
      if (!sent) return // TODO 发送失败错误提示
      // 成功，设置倒数
      this.setCountdown()
    },
    async verifySlideCaptcha() {
      const { validate } = await this.$popupCaptcha()
      this.$popupCaptcha.close()
      if (!validate) return // TODO 滑块验证出错
      const { code } = await this.$store.dispatch('modules/user/apiDragImg', {
        validate
      })
      if (code === '000000') return true
      else return false
    },
    async sendMsgCaptcha() {
      try {
        const { code } = await this.$store.dispatch(
          'modules/user/apiGetCaptcha',
          {
            phone: this.loginForm.phone,
            type: 2
          }
        )
        if (code === '000000') return true
        else return false
      } catch (err) {
        return false
      }
    },
    doLogin() {
      // 登陆 分发
      switch (String(this.loginMode)) {
        case '0':
          // 账号密码登陆
          this.loginByPassword()
          break
        case '1':
          // 验证码登陆
          this.loginByCapture()
          break
      }
    },
    async loginByCapture() {
      /* TODO 复制粘贴的代码，待优化 */
      const params = {
        phone: this.loginForm.phone,
        code: this.loginForm.captcha,
        os_type: 'Web'
      }

      const { code, data, message } = await this.$store.dispatch(
        'modules/user/apiLoginByCaptcha',
        params
      )

      if (code === '000000') {
        this.$store.dispatch('login', data.result || data)
        try {
          const userInfo = await this.$store.dispatch('modules/user/apiProfile')
          this.$store.commit('setUserInfo', userInfo.data)
          this.dialogFormVisible = false
          this.$message.success('登录成功')
        } catch (e) {}
      } else {
        this.$message.error(message)
      }
    },
    async loginByPassword() {
      // TODO 密码登陆
      const params = {}
      const { pwd, phone } = this.loginForm
      params.pwd = SparkMD5.hash(pwd)
      params.phone = phone
      params.os_type = 'Web'
      // const { code, data, message } = await apiLogin(params)
      this.loginLoading = true
      const { data } = await this.$store.dispatch(
        'modules/user/apiLogin',
        params
      )

      this.$store.dispatch('login', data.result || data)
      try {
        await this.$store.dispatch('modules/user/apiProfile')
        this.dialogFormVisible = false
        this.$message.success('登录成功')
      } catch (e) {}
      this.loginLoading = false
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
</script>

<style lang="less" scoped>
@import '@/assets/css/global.less';

/deep/ .el-dialog {
  .center;
  margin-top: 0 !important;
  width: 530px;
  border-radius: 8px;
  overflow: hidden;
  color: rgba(68, 68, 79, 1);

  .upgrade-dialog & {
    width: 446px;
  }

  .error-dialog & {
    width: 388px;
  }

  .drag-dialog & {
    width: 336px;

    .el-dialog__headerbtn {
      top: 10px;
      right: 10px;
    }
  }

  &__header,
  &__body {
    padding: 0;
  }

  &__headerbtn {
    top: 20px;
    right: 30px;
    font-size: 22px;
    line-height: 24px;
    font-weight: bold;

    .el-dialog__close {
      color: rgba(169, 168, 174, 1);

      &:hover {
        color: rgba(131, 130, 136, 1);
      }
    }
  }
}

/deep/ .el-form-item {
  position: relative;
  margin-bottom: 24px;

  &.is-error {
    margin-bottom: 16px;
  }

  &.mb0 {
    margin-bottom: 0;
  }

  &__label {
    margin-bottom: 16px;
    position: relative;
    padding-right: 24px;
    font-size: 20px;
    font-weight: bold;
    line-height: 28px;

    &::before {
      position: absolute;
      top: 4px;
      right: 0;
      font-weight: bold;
      font-size: 24px;
    }
  }

  &__error {
    position: relative;
    top: 0;
    padding-top: 8px;
    color: rgba(255, 0, 12, 1);
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }

  &__content {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }

  .el-input__inner {
    height: 52px;
    padding: 0 20px;
    line-height: 52px;
    border-color: rgba(207, 207, 212, 1);
    border-radius: 4px;
  }
}

.login-box,
.register-box {
  // &:extend(.center);
  width: 530px;
  background-color: #fff;
  font-size: 16px;
  line-height: 22px;

  /deep/ .el-checkbox__label {
    font-size: 16px;
    line-height: 22px;
    color: rgba(68, 68, 79, 1);
  }

  .link {
    color: #e62e37;
  }

  .hd {
    padding: 20px 62px 22px;
    border-bottom: solid 1px #ebebec;

    .title {
      margin-bottom: 10px;
      font-size: 28px;
      font-weight: bold;
      line-height: 32px;
    }
  }

  .bd {
    padding: 28px 66px 46px;

    .nav-tabs {
      height: 50px;
      border-bottom: solid 1px #ebebec;
      font-size: 20px;
      font-weight: bold;
      line-height: 28px;
    }

    .nav {
      position: relative;
      height: 50px;
      margin-bottom: 30px;
      &:extend(.fl);
      margin-right: 32px;
      color: rgba(169, 168, 174, 1);
      cursor: pointer;

      &:hover {
        color: rgba(131, 130, 136, 1);
      }

      &.active {
        color: rgba(68, 68, 79, 1);

        &::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 100%;
          height: 5px;
          background-color: rgba(230, 46, 55, 1);
        }
      }
    }
  }

  .habit-box {
    margin: 18px 0 28px;
  }

  .el-form-item {
    .send-btn {
      position: absolute;
      top: 0;
      right: 28px;
      width: 90px;
      padding: 0;
      text-align: center;
      color: rgba(230, 46, 55, 1);
      font-size: 16px;
      line-height: 52px;
      border-width: 0;
      background-color: transparent;
      cursor: pointer;
    }
  }

  .btn.block {
    width: 390px;
    height: 64px;
    box-shadow: 0 9px 12px -4px rgba(255, 210, 212, 1);
    border-radius: 6px;
    font-size: 22px;
  }

  .login-btn {
    margin-bottom: 18px;
  }
}

.register-box {
  .el-form-item .send-btn {
    top: 45px;
  }
}

.upgrade-box,
.error-box {
  .hd {
    border-bottom: solid 1px #ebebec;
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    text-align: center;
  }

  .bd {
    padding: 22px 40px 30px;
  }

  .pic {
    display: block;
    width: 72px;
    margin: 0 auto 24px;
  }

  .txt {
    margin-bottom: 30px;
    font-size: 16px;
    line-height: 22px;
  }

  .btn {
    width: 270px;
    height: 44px;
    margin: 0 auto;
    border-radius: 8px;
  }
}

.error-box {
  text-align: center;

  .el-icon-warning {
    margin-bottom: 20px;
    font-size: 50px;
    line-height: 50px;
    color: rgba(230, 46, 55, 1);
  }
}

// 滑块
.drag-box {
  padding: 32px 0;

  .drag {
    width: 256px;
    height: 184px;
    margin: 0 auto;
  }
}
</style>
