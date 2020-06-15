/* 修改手机号 */ /* 实名认证信息 */
<template>
  <!-- 修改手机号部分 -->
  <div class="tab-min">
    <div class="set-phone">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item v-if="step === 1" label="原手机验证码" prop="captcha">
          <el-input
            v-model="ruleForm.captcha"
            maxlength="6"
            type="password"
          ></el-input>
          <a v-if="countDown === 0" class="send-code" @click="sendCaptcha"
            >免费获取</a
          >
          <a v-else class="send-code">{{ countDown }}s</a>
        </el-form-item>
        <el-form-item v-if="step === 1">
          <el-button type="danger" @click="nextHandler('ruleForm')"
            >下一步</el-button
          >
        </el-form-item>
        <el-form-item v-if="step === 2" label="新手机号" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            type="number"
            autocomplete="off"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="step === 2" label="新手机验证码" prop="acaptcha">
          <el-input
            v-model="ruleForm.acaptcha"
            type="password"
            autocomplete="off"
          ></el-input>
          <a v-if="countDown0 === 0" class="send-code" @click="sendNewCaptcha"
            >免费获取</a
          >
          <a v-else class="send-code">{{ countDown0 }}s</a>
        </el-form-item>
        <el-form-item v-if="step === 2">
          <el-button type="danger" @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import MySideBar from '@/components/my-side-bar'
import { mapGetters } from 'vuex'
const COUNTDOWN = 60
const COUNTDOWN0 = 60
export default {
  components: {
    // MySideBar
  },

  data() {
    const captcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入6位验证码'))
      } else if (value.length != 6) {
        callback(new Error('请输入6位验证码'))
      } else {
        callback()
      }
    }
    const checkPhone = (rule, value, callback) => {
      const PhoneRegex = /^[1][3,4,5,6,7,8][0-9]{9}$/
      if (value === '') {
        callback(new Error('请输入客户手机号'))
      } else if (!PhoneRegex.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      disabled: false,
      countDown: 0, // 倒计时
      countDown0: 0,
      step: 1,
      ruleForm: {
        phone: '',
        acaptcha: '',
        captcha: '',
        region: '',
        type: ''
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        captcha: [{ validator: captcha, trigger: 'blur' }],
        acaptcha: [{ validator: captcha, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['realphone'])
  },
  methods: {
    // 发送短信验证码到新手机
    sendNewCaptcha() {
      try {
        const params = { phone: this.ruleForm.phone, type: 5 }
        this.$store
          .dispatch('modules/user/apiGetCaptcha', params)
          .then((res) => {
            this.setCountdown0()
          })
      } catch (error) {
        console.error(error)
      }
    },
    nextHandler() {
      this.apiValifyCaptcha()
    },
    // 发送短信验证码原手机
    sendCaptcha() {
      try {
        const params = { phone: this.realphone, type: 8 }
        this.$store
          .dispatch('modules/user/apiGetCaptcha', params)
          .then((res) => {
            this.setCountdown()
          })
      } catch (error) {
        console.error(error)
      }
    },
    // 60s倒计时
    setCountdown() {
      this.countDown = COUNTDOWN
      this.captchaTimer = setInterval(() => {
        if (this.countDown === 0) {
          clearInterval(this.captchaTimer)
        } else {
          this.countDown--
        }
      }, 1000)
    },
    // 60s倒计时
    setCountdown0() {
      this.countDown0 = COUNTDOWN0
      this.captchaTimer0 = setInterval(() => {
        if (this.countDown0 === 0) {
          clearInterval(this.captchaTimer0)
        } else {
          this.countDown0--
        }
      }, 1000)
    },
    // 原手机验证
    apiValifyCaptcha() {
      try {
        const params = {
          phone: this.realphone, // 电话
          code: this.ruleForm.captcha, // 手机验证码
          type: 8
        }
        this.$store
          .dispatch('modules/user/apiValifyCaptcha', params)
          .then((res) => {
            this.countDown = 0
            this.step = 2
          })
      } catch (error) {
        console.error(error)
      }
    },
    // 新手机验证码验证及更改手机号码
    apiValifyNewCaptcha() {
      try {
        const params = {
          phone: this.ruleForm.phone, // 电话
          code: this.ruleForm.acaptcha, // 手机验证码
          type: 5
        }
        this.$store
          .dispatch('modules/user/apiValifyCaptcha', params)
          .then((res) => {
            const params = {
              phone: this.ruleForm.phone,
              secret: res.data.secret
            }
            return this.$store
              .dispatch('modules/user/apiUpdatePhone', params)
              .then((res) => {
                this.$alert('手机号码修改完成，去登录', '温馨提示', {
                  showClose: false,
                  confirmButtonText: '去登录',
                  type: 'info'
                }).then(() => {
                  this.$store.dispatch('modules/user/apiLogout')
                  this.$router.push('/')
                })
              })
          })
      } catch (error) {
        console.error(error)
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apiValifyNewCaptcha()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.tab-min {
  padding-top: 20px;
  // 实名信息认证
  .user-info {
    font-size: 14px;
    color: rgba(168, 169, 174, 1);
    line-height: 20px;
    margin-bottom: 21px;
    .left-text {
      text-align: right;
      display: inline-block;
      width: 58px;
      vertical-align: top;
      margin-left: 15px;
      margin-right: 25px;
    }
    .right-text {
      color: #44444f;
      text-align: left;
    }
    .right-img {
      img {
        display: inline-block;
        width: 150px;
        height: 90px;
        margin-right: 30px;
      }
    }
    .btn-set {
      float: right;
      display: block;
      width: 92px;
      height: 34px;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      line-height: 34px;
      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: -9px;
        img {
          width: 100%;
          vertical-align: top;
        }
      }
    }
  }
  // 修改个人信息部分
  .set-user-info {
    .tips {
      margin-top: 8px;
      font-size: 14px;
      color: #a9a8ae;
      line-height: 20px;
    }
    .tips-bank {
      color: #44444f;
      line-height: 20px;
      margin-bottom: 24px;
    }
    .title {
      margin: 16px 0 26px;
      font-size: 20px;
      font-weight: 600;
      color: #44444f;
      line-height: 28px;
      &.bank {
        margin: 0px 0 12px;
      }
    }
  }
  .set-user {
    width: 446px;
    clear: both;
    margin-left: 54px;
  }

  // 修改密码区域
  .set-password-tab {
    float: left;
    display: block;
    margin-bottom: 38px;
    margin-left: 1px;
    li {
      position: relative;
      margin-left: -1px;
      display: block;
      float: left;
      width: 105px;
      height: 34px;
      border: 1px solid rgba(235, 235, 236, 1);
      text-align: center;
      background: #ffffff;
      a {
        display: block;
        width: 100%;
        font-size: 16px;
        color: rgba(168, 169, 174, 1);
        line-height: 34px;
      }
      &.on {
        background: #fafafa;
        a {
          color: #44444f;
        }
      }
    }
  }
  //修改手机号部分
  .set-phone {
    width: 446px;
    clear: both;
    margin-left: 54px;
  }
  //修改密码部分
  .set-password {
    width: 446px;
    clear: both;
    margin-left: 54px;

    .set-tips-text {
      font-size: 14px;
      color: #a8a9ae;
      line-height: 24px;
      white-space: nowrap;
    }
  }

  // 组件样式  form 定位
  /deep/.demo-ruleForm {
    margin-bottom: 32px;
  }
  // 组件样式 表单label文字
  /deep/.el-form-item__label {
    font-size: 14px;
    color: rgba(68, 68, 79, 1);
    line-height: 48px;
  }
  // 组件样式  表单
  /deep/.el-input__inner {
    width: 346px;
    height: 48px;
    border-radius: 4px;
    border: 1px solid rgba(207, 207, 212, 1);
    &::placeholder {
      color: rgba(169, 168, 174, 1);
    }
  }
  // 组件样式  错误提示文字
  /deep/.el-form-item__error {
    top: 24%;
    left: 107%;

    text-align: left;
    white-space: nowrap;
  }
  // 组件样式 错误提示图标
  /deep/.el-input__suffix {
    right: -24px;
  }
  // 组件样式  按钮
  /deep/.el-button {
    width: 216px;
    height: 48px;
    font-size: 16px;
    color: #ffffff;
  }
  // 组件样式 发送验证码按钮
  /deep/.el-form-item__content {
    .send-code {
      position: absolute;
      top: 14px;
      right: 18px;
      display: block;
      font-size: 14px;

      color: #e62e37;
      line-height: 20px;
    }
  }
  /deep/.el-select {
    .el-input__suffix {
      right: 12px;
    }
  }
  /deep/.el-checkbox-group {
    line-height: 48px;
    .text {
      color: #44444f;
      a {
        color: #e62e37;
      }
    }
  }
}
</style>
