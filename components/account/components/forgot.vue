<template>
  <!-- 注册/忘记密码 -->
  <section class="register-box">
    <div class="hd">
      <h2 class="title">找回密码</h2>
      <p class="sub-title">
        <a class="link" @click="$emit('switch', 'login')"> 返回账号密码登录</a>
      </p>
    </div>
    <div class="bd">
      <el-form ref="registerForm" :model="registerForm" :rules="rules">
        <!-- 验证码阶段 -->
        <template v-if="step === 1">
          <el-form-item label="请输入手机号" prop="phone">
            <el-input
              v-model="registerForm.phone"
              type="tel"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item label="请输入短信验证码" prop="captcha">
            <el-input
              v-model="registerForm.captcha"
              type="number"
              placeholder="请输入短信验证码"
            />
            <button class="send-btn" @click="sendCaptcha">
              <span v-if="countdown === 0" class="default">发送验证码</span>
              <span v-else class="countdown">{{ countdown }}s</span>
            </button>
          </el-form-item>
        </template>
        <!-- 注册阶段 -->
        <template v-else>
          <el-form-item label="请设置登录密码" prop="resetPwd">
            <el-input
              v-model="registerForm.resetPwd"
              type="password"
              placeholder="密码需包含数字、字母，且不少于8位"
            />
          </el-form-item>
          <el-form-item label="请再次确登录密码" prop="checkPwd">
            <el-input
              v-model="registerForm.checkPwd"
              type="password"
              placeholder="请再次确认登录密码"
            />
          </el-form-item>
        </template>

        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="registerForm.agree" class="note">
            已经阅读并同意<span class="link">《恒房通官网隐私保护政策》</span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn block" type="primary" @click="submit()">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import captcha from './captcha'
const PhoneRegex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
export default {
  mixins: [captcha],
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
      countdown: 0,
      step: 0,
      onLoading: false,
      registerForm: {
        phone: '',
        pwd: '',
        redPwd: '',
        agree: ''
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
        redPwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    disabledCaptcha() {
      return !PhoneRegex.test(this.registerForm.phone) || this.countdown > 0
    },
    disabledVerify() {
      return (
        !PhoneRegex.test(this.registerForm.phone) || !this.registerForm.captcha
      )
    },
    disabledRegister() {
      return !this.pwd || !this.rePwd
    }
  },
  methods: {
    submit() {
      switch (String(this.step)) {
        case '0':
          this.verifyCaptcha()
          break
        case '1':
          this.register()
          break
      }
    },
    async verifyCaptcha() {
      // 校验是否通过相关协议
      // 校验验证码
      // 校验成功，保存签名
      if (this.registerForm.agree) return // TODO 提示同意相关协议

      const params = {
        phone: this.phone,
        code: this.captcha,
        type: 1
      }
      try {
        const { data } = await this.$store.dispatch(
          'modules/user/apiValifyCaptcha',
          params
        )
        const secret = data.secret
        sessionStorage.setItem('register-secret', secret)
        this.step++
      } catch (err) {
        // TODO 提示出错
      }
    },
    async register() {
      // 防止重复提交
      // 校验输入的密码是否一致
      // 去注册
      // 注册成功
      if (this.registerForm.pwd !== this.registerForm.rePwd) return // TODO 提示密码不一致
      if (this.onLoading === true) return
      this.onLoading = true
      /* TODO 复制粘贴的代码，待优化 */
      const { code, data, message } = await this.$store.dispatch(
        'modules/user/apiRegister',
        {
          phone: this.registerForm.phone,
          pwd: this.registerForm.pwd,
          secret: sessionStorage.getItem('register-secret')
        }
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
