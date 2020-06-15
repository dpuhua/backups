/* 修改密码 */ /* 实名认证信息 */
<template>
  <!-- 修改密码部分 -->
  <div class="tab-min">
    <ul class="set-password-tab">
      <li :class="[isActived == false ? 'on' : '']" @click="changeType">
        <a>密码验证</a>
      </li>
      <li :class="[isActived == true ? 'on' : '']" @click="changeType">
        <a>短信验证</a>
      </li>
    </ul>
    <div class="set-password">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item v-if="isActived" label="输入验证码" prop="captcha">
          <el-input
            v-model="ruleForm.captcha"
            maxlength="6"
            type="number"
            autocomplete="off"
          ></el-input>
          <a v-if="countDown === 0" class="send-code" @click="sendCaptcha"
            >免费获取</a
          >
          <a v-else class="send-code">{{ countDown }}s</a>
        </el-form-item>

        <el-form-item v-else label="输入旧密码" prop="oldpass">
          <el-input
            v-model="ruleForm.oldpass"
            type="password"
            autocomplete="off"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入新密码" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
      <p class="set-tips-text">*密码需包含数字、字母，且不少于8位；</p>
      <p class="set-tips-text">
        *以上信息修改后都将同步至恒大统一用户中心，请使用新密码登录恒大统一用户中心应用。
      </p>
    </div>
  </div>
</template>

<script>
// import MySideBar from '@/components/my-side-bar'
import SparkMD5 from 'spark-md5'
import { mapGetters } from 'vuex'
const COUNTDOWN = 60
export default {
  components: {
    // MySideBar
  },
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else if (value < 18) {
          callback(new Error('必须年满18岁'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      const reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8) {
        callback(new Error('请输入不少于8位的密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码需包含数字、字母'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const captcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入6位验证码'))
      } else if (value.length != 6) {
        callback(new Error('请输入6位验证码'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      howClo: false,
      getCaptcha: false,
      countDown: 0, // 倒计时
      isActived: true, //  true为短信验证 false密码验证
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
        region: '',
        type: '',
        oldpass: '',
        captcha: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        oldpass: [{ validator: validatePass3, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }],
        captcha: [{ validator: captcha, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['realphone'])
  },
  mounted() {
    console.log(this.realphone)
  },
  methods: {
    changeType() {
      this.isActived = !this.isActived
    },
    // 旧密码方式修改手机号码
    modifyPassword(formName) {
      try {
        const { oldpass, pass } = this.ruleForm
        const params = {}
        params.pwd_old = SparkMD5.hash(oldpass)
        params.pwd_new = SparkMD5.hash(pass)
        params.os_type = 'Web'
        this.$store
          .dispatch('modules/user/apiModifyPassword', params)
          .then((res) => {
            console.log(res)
            this.toLogin()
          })
      } catch (error) {
        console.error(error)
      }
    },
    // 修改成功后
    toLogin() {
      this.$alert('密码修改成功，请重新登录', '温馨提示', {
        showClose: false,
        confirmButtonText: '去登录',
        type: 'info'
      }).then(() => {
        this.$store.dispatch('modules/user/apiLogout')
        this.$router.push('/')
      })
    },
    // 发送短信验证码
    sendCaptcha() {
      console.log('发送短信验证码')
      try {
        const params = { phone: this.realphone, type: 3 }
        console.log(params)
        this.$store
          .dispatch('modules/user/apiGetCaptcha', params)
          .then((res) => {
            console.log(params)
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
    // 验证验证码并重新设置密码
    resetPassword() {
      try {
        const params = {
          phone: this.realphone, // 电话
          code: this.ruleForm.captcha, // 手机验证码
          type: 3
        }
        this.$store
          .dispatch('modules/user/apiValifyCaptcha', params)
          .then((res) => {
            console.log(res)
            const params = {
              pwd: SparkMD5.hash(this.ruleForm.pass),
              secret: res.data.secret
            }
            console.log(params)
            return this.$store
              .dispatch('modules/user/apiResetPassword', params)
              .then((res) => {
                this.toLogin()
              })
          })
      } catch (error) {
        console.error(error)
      }
    },
    // 点击完成
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isActived == true) {
            this.resetPassword(formName)
          } else {
            this.modifyPassword(formName)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === '/') {
        next()
        return
      }
      if (
        this.ruleForm.pass ||
        this.ruleForm.checkPass ||
        this.ruleForm.oldpass
      ) {
        this.$alert('密码未修改完成，是否确认退出', '温馨提示', {
          confirmButtonText: '退出',
          type: 'info'
        })
          .then(() => {
            next()
          })
          .catch(() => {
            next(false)
          })
      } else {
        next()
      }
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
  .el-message-box__headerbtn {
    display: none !important;
  }
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
