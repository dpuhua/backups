/* 实名认证信息 */
<template>
  <!-- 实名认证信息部分 -->
  <div>
    <div v-if="!isEdit" class="tab-min">
      <p class="user-info">
        <span class="left-text">姓名</span>
        <span class="right-text">{{ form.name || '-' }}</span>
        <span class="btn btn-set" @click="editProfile">
          <i>
            <img src="~@/assets/img/account/icon_edit.png" alt />
          </i>
          修改资料
        </span>
      </p>
      <p class="user-info">
        <span class="left-text">证件类型</span>
        <span class="right-text">{{ idCardTypeText || '-' }}</span>
      </p>
      <p class="user-info">
        <span class="left-text">证件号码</span>
        <span class="right-text">
          {{ form.id_card || '-' | maskNumber }}
        </span>
      </p>
      <p class="user-info">
        <span class="left-text">常驻地</span>
        <span class="right-text">{{ address || '-' }}</span>
      </p>
      <template v-if="!isAlipay">
        <p class="user-info">
          <span class="left-text">开户行</span>
          <span class="right-text">{{ form.bank_name || '-' }}</span>
        </p>
        <p class="user-info">
          <span class="left-text">银行账号</span>
          <span class="right-text">
            {{ form.bank_card || '-' | maskNumber }}
          </span>
        </p>
      </template>
      <template v-else>
        <p class="user-info">
          <span class="left-text">支付宝</span>
          <span class="right-text">
            {{ form.zhi_fu_bao || '-' }}
          </span>
        </p>
      </template>
    </div>

    <!-- 实名认证修改信息部分 -->
    <div v-else class="tab-min">
      <certification
        :id-card-type-list="idCardTypeList"
        @isEdit="isEditChange"
      ></certification>
    </div>

    <!-- 修改前校验 -->
    <verify
      :visible="showVerify"
      :phone="form.phone"
      @result="verifyChange"
    ></verify>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Verify from '@/components/user/verify'
import Certification from '@/components/user/certification'
import { maskNumber } from '@/utils/utils'

export default {
  components: {
    Verify,
    Certification
  },
  filters: {
    maskNumber
  },
  data() {
    return {
      showVerify: false,
      isEdit: false,
      idCardTypeList: [],
      idCardTypeText: '',
      address: '',
      isAlipay: false,
      form: {
        phone: '',
        name: '',
        id_card_type: null,
        id_card: '',
        bank_card: '',
        bank_name: '',
        province_name: '',
        city_name: '',
        district_name: '',
        zhi_fu_bao: ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    console.log(this.userInfo)
    this.init()
  },
  methods: {
    init() {
      const userInfo = this.userInfo
      if (!userInfo.bank_card && userInfo.zhi_fu_bao) {
        this.isAlipay = true
      }
      this.address =
        userInfo.province_name + userInfo.city_name + userInfo.district_name ||
        '-'
      this.form = {
        phone: userInfo.phone,
        name: userInfo.name,
        id_card_type: userInfo.id_card_type,
        id_card: userInfo.id_card,
        bank_card: userInfo.bank_card,
        bank_name: userInfo.bank_name,
        zhi_fu_bao: userInfo.zhi_fu_bao
      }
      this.getCardType(this.form.id_card_type)
    },
    async getCardType(type) {
      const { code, data, message } = await this.$store.dispatch(
        'modules/user/apiCardType',
        {}
      )
      if (code === '000000') {
        if (data && data.length > 0) {
          data.forEach((name) => {
            if (+name.status || +name.id === type) {
              this.idCardTypeList.push(name)
              if (+name.id === type) {
                this.idCardTypeText = name.text
              }
            }
          })
        }
        console.log('idCardTypeList', this.idCardTypeList)
      } else {
        this.$message({
          message: message | `${code} error`,
          type: 'error'
        })
      }
    },
    editProfile() {
      this.showVerify = true
      this.isEdit = true
    },
    verifyChange(val) {
      this.showVerify = val
      this.isEdit = true
    },
    isEditChange(val) {
      this.isEdit = val
      this.getProfile()
    },
    async getProfile() {
      const { data } = await this.$store.dispatch('modules/user/apiProfile', {})
      this.userInfo = data
    }
  }
}
</script>

<style lang="less" scoped>
// 页面中部内容
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
}
</style>
