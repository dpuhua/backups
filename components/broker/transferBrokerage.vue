<template>
  <div class="boxtransform">
    <template v-if="step === 1">
      <p>本操作需要安全验证</p>
      <p v-if="countDown !== 0">
        验证码已发送至当前账号<span class="red">{{ desPhone }} </span>
      </p>
      <p class="input-wrap">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          class="demo-ruleForm"
        >
          <el-form-item
            prop="code"
            :rules="[
              { required: true, message: '验证码不能为空' },
              { type: 'number', message: '验证码必须为数字值' }
            ]"
          >
            <el-input
              v-model.number="ruleForm.code"
              :maxlength="6"
              placeholder="请输入验证码"
            ></el-input>
            <span
              v-if="countDown === 0"
              class="send-code"
              @click.stop="sendCaptcha"
              >免费获取</span
            >
            <span v-else class="send-code">{{ countDown }}s</span>
          </el-form-item>
        </el-form>
      </p>
      <p class="price-text">请选择转让佣金比例</p>
      <ul class="check-price">
        <li
          v-for="(item, index) in rateList"
          :key="item.rateValue"
          :class="{ on: rateActive === index }"
          @click="rateActive = index"
        >
          {{ item.rate }}
        </li>
      </ul>
    </template>

    <div v-if="step === 2" class="default-box">
      <div class="img-wrap">
        <img src="~@/assets/img/account/vip/icon_warning.png" alt="" />
      </div>
      <p class="box-tips">
        请再次确认，是否将<span class="red">{{
          rateList[rateActive].rate
        }}</span
        >佣金转给购房者享受优惠？
      </p>
    </div>

    <div v-if="step === 3" class="default-box">
      <p class="box-tips">
        最终佣金抵房款优惠政策请以各楼盘具体政策为准。
      </p>
    </div>

    <span slot="footer" class="dialog-footer fr">
      <el-button @click="cencel">取 消</el-button>
      <el-button type="danger" @click="nextHandler">确 定</el-button>
    </span>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
const COUNTDOWN = 60
const UPDATE_TYPE = 8
const TITLE = {
  1: '转让佣金',
  2: '提示',
  3: '操作成功'
}
export default {
  props: {
    recommendId: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        code: ''
      },
      rateList: [],
      rateActive: 0,
      step: 1,
      countDown: 0
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['desPhone'])
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          this.init()
        }
      },
      immediate: true
    }
  },
  methods: {
    init() {
      this.getRate()
      this.$emit('update:title', TITLE[this.step])
    },
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
    cencel() {
      this.$emit('input', false)
      this.ruleForm.code = ''
      this.step = 1
    },
    getRate() {
      this.transferDialogVisible = true
      // 根据recommendId动态获取佣金比例
      this.$store
        .dispatch('modules/broker/apiRateList', {
          recommendId: this.recommendId
        })
        .then((res) => {
          if (res.data) {
            this.rateList = res.data
          }
        })
    },
    sendCaptcha() {
      this.$store
        .dispatch('modules/user/apiGetCaptcha', {
          data: {
            phone: this.userInfo.phone,
            type: UPDATE_TYPE
          }
        })
        .then((res) => {
          this.setCountdown()
        })
    },
    nextStep() {
      this.step++
      this.$emit('update:title', TITLE[this.step])
    },
    nextHandler() {
      const step = this.step
      if (step === 1) {
        this.valifyCaptcha()
        return
      }
      if (step === 2) {
        this.setBrokerageMortgage()
        return
      }
      if (step === 3) {
        this.cencel()
      }
    },
    valifyCaptcha() {
      if (!this.ruleForm.code) {
        this.$message('请输入短信验证码')
        return
      }
      this.$store
        .dispatch('modules/user/apiValifyCaptcha', {
          phone: this.userInfo.phone, // 电话  必填
          code: this.ruleForm.code, // 手机验证码
          type: UPDATE_TYPE
        })
        .then((res) => {
          this.nextStep()
        })
    },
    setBrokerageMortgage() {
      this.$store
        .dispatch('modules/broker/apiSetBrokerageMortgage', {
          recommendId: this.recommendId,
          intentionRate: this.rateList[this.rateActive].rateValue
        })
        .then((res) => {
          this.nextStep()
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 佣金转让弹窗
.boxtransform {
  padding: 16px 32px 24px;
  overflow: hidden;
  p {
    height: 22px;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 400;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;
    .red {
      color: #e62e37;
    }
  }
  .input-wrap {
    position: relative;
    margin-top: 16px;
    margin-bottom: 40px;
    height: 54px;
  }
  .price-text {
    height: 22px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;
    margin-bottom: 16px;
  }
  .check-price {
    display: block;
    margin-bottom: 40px;
    overflow: hidden;
    li {
      display: block;
      float: left;
      width: 80px;
      height: 38px;
      line-height: 38px;
      background: rgba(235, 235, 236, 0.5);
      border-radius: 19px;
      margin-right: 24px;
      margin-bottom: 10px;
      text-align: center;
      cursor: pointer;
      color: #44444f;
      font-size: 16px;
      &.on {
        background: #e62e37;
        color: #ffffff;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}

// 组件样式  表单
.boxtransform /deep/.el-input__inner {
  width: 469px;
  height: 54px;
  border-radius: 4px;
  border: 1px solid #cfcfd4;
  margin-bottom: 40px;
  &::placeholder {
    color: rgba(169, 168, 174, 1);
  }
}
// 组件样式  错误提示文字
.boxtransform /deep/.el-form-item__error {
  top: 54px;
  left: 5%;
  text-align: left;
  white-space: nowrap;
}
// 组件样式 错误提示图标
.boxtransform /deep/.el-input__suffix {
  right: auto;
  left: 0;
  top: 18px;
}
// 组件样式  按钮
.boxtransform /deep/.el-button {
  width: 130px;
  height: 44px;
  font-size: 16px;
  color: #a9a8ae;
  border: 1px solid #a9a8ae;
}
.boxtransform /deep/.el-button--danger {
  color: #ffffff;
  border: 1px solid #e62e37;
}
// 组件样式 发送验证码按钮
.boxtransform /deep/.el-form-item__content {
  .send-code {
    position: absolute;
    top: 14px;
    right: 40px;
    display: block;
    font-size: 14px;
    color: #e62e37;
    line-height: 20px;
    cursor: pointer;
  }
}

// 默认弹窗
.default-box {
  text-align: center;
  padding-top: 24px;
  padding-bottom: 24px;
  .img-wrap {
    margin: 0 auto 23px;
    width: 50px;
    height: 50px;
    img {
      width: 100%;
    }
  }
  .red {
    color: #e62e37;
  }
  .box-tips {
    height: 22px;

    font-size: 16px;
    font-weight: 400;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;
  }
  .defoult-footer {
    margin-top: 24px;
    .el-button {
      width: 130px;
      height: 44px;
    }
  }
}

/deep/.el-dialog__body {
  padding: 0;
}
</style>
