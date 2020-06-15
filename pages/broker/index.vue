/* 会员中心首页 */
<template>
  <div>
    <div class="vip-introduce-wrap">
      <div class="introduce hight_brokerage">
        <p class="title">高额佣金</p>
        <p>推荐成交即获高额佣金</p>
      </div>
      <div class="introduce pay_brokerage">
        <p class="title">佣金快速结算</p>
        <p>佣金快速结算，线上5个工作日支付到账</p>
      </div>
      <div class="introduce serve">
        <p class="title">一站式服务</p>
        <p>
          VR实景看房，专属销售线上服务，在线轻松查看全国房源信息，一键网上认购
        </p>
      </div>
    </div>
    <div class="vip-info-wrap">
      <div class="title-wrap">
        <h3 class="title">我的佣金</h3>
        <a class="r-link" href="/broker/brokerage">查看明细 &gt;</a>
      </div>
      <div class="data-wrap">
        <div class="money">
          <p class="number">{{ brokerageNum.totalsBrokerage || 0 }}</p>
          <p class="text">
            <i class="icon">
              <img src="~@/assets/img/account/vip/icon_brokerage.png" alt /> </i
            >累计佣金（元）
          </p>
        </div>
        <div class="money">
          <p class="number">{{ brokerageNum.providedBrokerage || 0 }}</p>
          <p class="text">
            <i class="icon">
              <img src="~@/assets/img/account/vip/icon_brokerage.png" alt /> </i
            >已发佣金（元）
          </p>
        </div>
        <div class="money">
          <p class="number gray">{{ brokerageNum.providingBrokerage || 0 }}</p>
          <p class="text">
            <i class="icon">
              <img
                src="~@/assets/img/account/vip/icon_pay_brokerage.png"
                alt
              /> </i
            >待发佣金（元）
          </p>
        </div>
      </div>
    </div>

    <div class="vip-info-wrap mb_0">
      <div class="title-wrap">
        <h3 class="title">我的客户</h3>
        <a class="r-link" href="/broker/customer">查看明细 &gt;</a>
      </div>
      <div class="data-wrap">
        <div class="myclient">
          <p class="number">{{ recommendCount.notVisited || 0 }}</p>
          <p class="text">未到访</p>
        </div>
        <div class="myclient">
          <p class="number">{{ recommendCount.visited || 0 }}</p>
          <p class="text">已到访</p>
        </div>
        <div class="myclient">
          <p class="number">{{ recommendCount.saled || 0 }}</p>
          <p class="text">已认购</p>
        </div>
        <div class="myclient">
          <p class="number">{{ recommendCount.signed || 0 }}</p>
          <p class="text">已签约</p>
        </div>
        <div class="myclient">
          <p class="number">{{ recommendCount.expired || 0 }}</p>
          <p class="text">已过期</p>
        </div>
      </div>
    </div>

    <!-- 弹窗区域 -->
    <el-dialog
      title="实名认证信息"
      :visible.sync="centerDialogVisible"
      width="817px"
      center
    >
      <div class="auth-box">
        <p class="title-tips">
          未认证用户需进行实名认证才可使用会员专属功能服务
        </p>

        <certification
          :id-card-type-list="idCardTypeList"
          class="certification-box"
        ></certification>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Certification from '@/components/user/certification'

export default {
  components: {
    Certification
  },
  data() {
    return {
      centerDialogVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
        region: '',
        type: ''
      },
      idCardTypeList: [],
      recommendCount: {},
      brokerageNum: {}
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    this.centerDialogVisible = !this.userInfo.id_card
    this.getCount()
  },
  methods: {
    getCount() {
      this.$store.dispatch('modules/broker/apiRecommendCount').then((res) => {
        this.recommendCount = {
          ...this.recommendCount,
          ...res.data
        }
      })

      this.$store
        .dispatch('modules/broker/apiRecommendDealCount')
        .then((res) => {
          this.recommendCount = {
            ...this.recommendCount,
            ...res.data
          }
        })

      this.$store.dispatch('modules/broker/apiBrokerageNum').then((res) => {
        this.brokerageNum = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 会员中心部分

.vip-introduce-wrap {
  width: 1000px;
  height: 128px;
  padding-bottom: 6px;
  box-sizing: content-box;
  .introduce {
    float: left;
    width: 158px;
    height: 128px;
    padding: 0 103px 0 29px;
    font-size: 12px;
    color: #a8a9ae;
    line-height: 17px;
    &.hight_brokerage {
      margin-left: -10px;
      margin-right: 28px;
      background: url('~@/assets/img/account/vip/hight_brokerage.png') no-repeat
        center;
    }
    &.pay_brokerage {
      margin-right: 28px;
      background: url('~@/assets/img/account/vip/pay_brokerage.png') no-repeat
        center;
    }
    &.serve {
      background: url('~@/assets/img/account/vip/serve.png') no-repeat center;
    }
    .title {
      margin: 14px 0 1px 0;
      height: 32px;
      font-size: 20px;
      color: #44444f;
      line-height: 32px;
    }
  }
}

.vip-info-wrap {
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 27px;

  .title-wrap {
    padding: 0 21px 0 31px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px #ebebec solid;
    .title {
      float: left;
      width: 200px;
      font-size: 20px;
      color: #44444f;
      font-weight: 400;
    }
    .r-link {
      display: block;
      float: right;
      color: #a8a9ae;
    }
  }

  .data-wrap {
    height: 152px;
    text-align: center;
    .money {
      width: 302px;
      display: block;
      float: left;
    }
    .number {
      margin-top: 42px;
      margin-bottom: 12px;
      font-size: 32px;
      font-weight: 400;
      color: #e62e37;
      line-height: 32px;
      &.gray {
        color: #9097ab;
      }
    }
    .text {
      font-size: 14px;
      color: #44444f;
      i {
        width: 16px;
        height: 16px;
        margin-right: 4px;
        vertical-align: -2px;
      }
    }
    .myclient {
      width: 181px;
      float: left;
      .number {
        margin-top: 38px;
        margin-bottom: 8px;
        color: #44444f;
      }
      .text {
        color: #777587;
      }
    }
  }
}

// 弹窗部分
.auth-box {
  .title-tips {
    margin: 0 auto;
    width: 648px;
    height: 37px;
    background: #fff6f6;
    font-size: 14px;
    font-weight: 400;
    color: #e62e37;
    line-height: 37px;
    text-align: center;
  }
}

// 弹窗标题
/deep/.el-dialog {
  border-radius: 8px;

  &--center .el-dialog__body {
    padding-top: 0;
  }

  &__header {
    padding: 28px 20px 7px;
    height: 45px;
    line-height: 45px;
  }

  &__title {
    font-size: 32px;
    font-weight: 500;
    color: rgba(68, 68, 79, 1);
    line-height: 45px;
  }
}

.certification-box {
  padding-left: 58px;
}

.mb_0 {
  margin-bottom: 0;
}
</style>

<style lang="less">
// 组件样式  选择框选中后文字重置
.el-select-dropdown__item.selected {
  color: #606266;
}
</style>
