<template>
  <el-dialog
    :class="{
      'sms-dialog': dialogVerifyType === 1,
      'drag-dialog': dialogVerifyType === 2,
      'error-dialog': dialogVerifyType === 3
    }"
    :visible.sync="dialogFormVisible"
    @closed="verifyClose"
  >
    <!-- 短信检验 -->
    <section v-if="dialogVerifyType === 1" class="sms-box">
      <div class="hd">
        <p class="title">安全验证</p>
        <p class="sub-title">
          当前号码 <span class="link">{{ phone | maskNumber2 }}</span>
        </p>
      </div>
      <div class="bd">
        <el-form>
          <el-form-item>
            <el-input
              v-model="captcha"
              maxlength="6"
              type="number"
              placeholder="请输入验证码"
            />
            <button
              :disabled="sendCodeDisabled"
              class="send-btn"
              @click="clickSend"
            >
              {{ smsCodeText }}
            </button>
          </el-form-item>
          <el-form-item class="mb0">
            <el-button class="btn block" type="danger" @click="verifyCaptcha">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>

    <!-- 滑块验证 -->
    <section v-else-if="dialogVerifyType === 2" class="drag-box">
      <div ref="drag" class="drag"></div>
    </section>
    <!-- 错误提示 -->
    <section v-else-if="dialogVerifyType === 3" class="error-box">
      <div class="hd">提示</div>
      <div class="bd">
        <i class="el-icon-warning"></i>
        <p class="txt">
          密码修改失败，请重试
        </p>
        <el-button class="btn block" type="danger">
          确认
        </el-button>
      </div>
    </section>
  </el-dialog>
</template>

<script>
import { load163DunScript, maskNumber2 } from '@/utils/utils'
const WyCaptchaid = '185403fe7eca457a964b8daa4960b55c'
const countDown = 60

export default {
  filters: {
    maskNumber2
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogVerifyType: 1,
      captcha: '',
      countDown: 0,
      smsCodeText: '发送验证码',
      sendCodeDisabled: false
    }
  },
  watch: {
    visible(val) {
      this.dialogFormVisible = val
    }
  },
  mounted() {
    this.initDragVerify()
  },
  methods: {
    clickSend() {
      this.nextStep(2)
      this.initDragVerify()
    },
    // 发送验证码
    async sendCaptcha() {
      const params = {
        phone: this.phone,
        type: 6
      }
      const { code, data, message } = await this.$store.dispatch(
        'modules/user/apiGetCaptcha',
        params
      )
      if (code === '000000') {
        this.$message({
          message: '发送成功',
          type: 'success'
        })
        this.setCountdown()
      } else {
        console.log(code, data, message)
        this.$message({
          message: message | `${code} error`,
          type: 'error'
        })
      }
    },
    setCountdown() {
      // 倒计时
      this.countDown = countDown
      this.captchaTimer = setInterval(() => {
        this.smsCodeText = this.countDown + 's'
        if (this.countDown === 0) {
          this.smsCodeText = '发送验证码'
          this.sendCodeDisabled = false
          clearInterval(this.captchaTimer)
        } else {
          this.countDown--
        }
      }, 1000)
    },
    initDragVerify() {
      // 滑块
      load163DunScript().then((initNECaptcha) => {
        const el = this.$refs.drag
        if (!el) {
          return
        }
        initNECaptcha(
          {
            captchaId: WyCaptchaid,
            element: el,
            mode: 'embed',
            width: el.clientWidth,
            onVerify: (err, data) => {
              if (data) {
                this.$store
                  .dispatch('modules/user/apiDragImg', {
                    validate: data.validate
                  })
                  .then(() => {
                    this.captchaIns.destroy()
                    this.nextStep(1)
                    this.sendCaptcha()
                    this.sendCodeDisabled = true
                  })
                  .catch(() => {
                    alert('校验失败')
                  })
              } else {
                // 失败
                console.log(err)
              }
            }
          },
          (instance) => {
            // 初始化成功
            this.captchaIns = instance
          },
          (err) => {
            // 初始化失败
            console.log(err)
          }
        )
      })
    },
    nextStep(step) {
      this.dialogVerifyType = step
    },
    async verifyCaptcha() {
      // 校验验证码
      const params = {
        country_code: '+086',
        phone: this.phone,
        type: 6,
        code: this.captcha
      }
      const { code, data, message } = await this.$store.dispatch(
        'modules/user/apiValifyCaptcha',
        params
      )
      console.log(code, data, message)

      if (code === '000000') {
        this.verifyClose()
        clearInterval(this.captchaTimer)
      }
    },
    verifyClose() {
      this.$emit('result', false)
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

  // 错误
  .error-dialog & {
    width: 388px;
  }

  // 短信
  .sms-dialog & {
    width: 490px;
  }

  // 滑块
  .drag-dialog & {
    width: 336px;

    .el-dialog__headerbtn {
      top: 10px;
      right: 10px;
    }
  }

  &__header,
  &__body {
    height: auto;
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

.sms-box {
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

    .sub-title {
      font-weight: bold;
    }
  }

  .bd {
    padding: 28px 66px 46px;
  }

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

  .btn.block {
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

.error-box {
  text-align: center;

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

  .el-icon-warning {
    margin-bottom: 20px;
    font-size: 50px;
    line-height: 50px;
    color: rgba(230, 46, 55, 1);
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
