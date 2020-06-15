<template>
  <div class="set-user-info">
    <p class="tips">
      您需确保身份证号、银行账号准确无误，且与当前账号
      <span class="red">{{ desPhone }}</span>
      属于同一个所有者。
    </p>
    <div class="set-user">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="122px"
      >
        <el-form-item class="txt">
          <p class="title">个人身份信息</p>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入您的真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="id_card_type">
          <el-select
            v-model="ruleForm.id_card_type"
            placeholder="请选择证件类型"
          >
            <el-option
              v-for="item in idCardTypeList"
              :key="item.id"
              :label="item.text"
              :value="+item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="id_card">
          <el-input
            v-model="ruleForm.id_card"
            placeholder="请输入您的证件号"
          ></el-input>
        </el-form-item>
        <el-form-item label="常驻地" prop="district_code">
          <el-cascader
            v-model="addressCode"
            :options="areaList"
            separator=""
            placeholder="请选择所在地区"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="txt">
          <p class="title bank">银行卡信息</p>
          <p class="tips-bank">
            银行卡用于佣金提现，户主需与以上身份证持有人一致，仅支持借记卡
          </p>
        </el-form-item>
        <el-form-item label="银行账号" prop="bank_card">
          <el-input
            v-model="ruleForm.bank_card"
            placeholder="请输入借记卡卡号"
          ></el-input>
        </el-form-item>
        <el-form-item class="mb_0" label="开户行" prop="bank_name">
          <el-select v-model="ruleForm.bank_name" value="请选择开户行">
            <el-option
              v-for="item in bankList"
              :key="item.id"
              :label="item.text"
              :value="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="box-agreement" label prop="agree">
          <el-checkbox-group v-model="agreeCheck">
            <el-checkbox name="type">
              <span class="text">
                我同意
                <a href="/account/notice?type=2" target="_blank">
                  《兼职销售推荐购房须知》
                </a>
                和
                <a href="/account/notice?type=1" target="_blank">
                  《用户隐私协议》
                </a>
              </span>
            </el-checkbox>
          </el-checkbox-group>
          <div v-if="!(agreeCheck || isAgree)" class="agree-error">
            请阅读《兼职销售推荐购房须知》和《用户隐私协议》
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')">
            提交资料
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { bankList } from '@/constants/bank-list'

export default {
  props: {
    idCardTypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const checkIdCard = (rule, value, callback) => {
      const tag = !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
        value
      )
      if (tag) {
        return callback(new Error('请检查身份证号码长度和格式是否正确'))
      }
      return callback()
    }

    return {
      idType: '',
      bankList,
      address: '',
      addressCode: [],
      agreeCheck: false,
      isAgree: true,
      ruleForm: {
        name: '',
        id_card_type: '',
        id_card: '',
        bank_card: '',
        bank_name: '',
        province_code: '',
        city_code: '',
        district_code: ''
      },
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        id_card_type: {
          required: true,
          message: '请选择证件类型',
          trigger: 'change'
        },
        id_card: [
          { required: true, message: '请输入证件号', trigger: 'blur' },
          { validator: checkIdCard, trigger: 'blur' }
        ],
        district_code: {
          required: true,
          message: '请选择常住地',
          trigger: 'change'
        },
        bank_card: {
          required: true,
          message: '请输入银行卡号',
          trigger: 'blur'
        },
        bank_name: {
          required: true,
          message: '请选择开户行',
          trigger: 'change'
        }
      },
      areaList: []
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['desPhone'])
  },
  mounted() {
    this.init()
    this.getAreaList()
  },
  methods: {
    init() {
      const userInfo = this.userInfo

      this.addressCode = [
        +userInfo.province_code,
        +userInfo.city_code,
        +userInfo.district_code
      ]
      this.ruleForm = {
        name: userInfo.name || '',
        id_card_type: userInfo.id_card_type || '',
        id_card: userInfo.id_card || '',
        bank_card: userInfo.bank_card || '',
        bank_name: userInfo.bank_name || '',
        province_code: userInfo.province_code || '',
        city_code: userInfo.city_code || '',
        district_code: userInfo.district_code || ''
      }
      if (!this.idCardTypeList.length) {
        this.getCardType(this.ruleForm.id_card_type)
      }
    },
    async getCardType(type) {
      console.log('getCardType realName')
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.agreeCheck) {
            this.isAgree = false
            return
          }
          this.getCertModifyProfile(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getCertModifyProfile(ruleForm) {
      const { code, data, message } = await this.$store.dispatch(
        'modules/user/apiCertModifyProfile',
        ruleForm
      )
      console.log(code, data, message)

      if (code === '000000') {
        this.$message({
          message: '提交成功',
          type: 'success'
        })

        this.$emit('isEdit', false)
      }
    },
    async getAreaList() {
      const { code, data, message } = await this.$store.dispatch(
        'modules/user/apiAreaList',
        {}
      )
      console.log('getAreaList', code, 'data', message)
      const areaList = []
      data.forEach((province, index) => {
        const cityList = province.cityList
        areaList[index] = {}
        areaList[index].value = province.provinceId
        areaList[index].label = province.provinceName
        areaList[index].children = []

        cityList.forEach((city, cityIndex) => {
          const countyList = city.countyList
          areaList[index].children[cityIndex] = {}
          areaList[index].children[cityIndex].value = city.cityId
          areaList[index].children[cityIndex].label = city.cityName
          areaList[index].children[cityIndex].children = []

          countyList.forEach((county, countyIndex) => {
            areaList[index].children[cityIndex].children[countyIndex] = {}
            areaList[index].children[cityIndex].children[countyIndex].value =
              county.countyId
            areaList[index].children[cityIndex].children[countyIndex].label =
              county.countyName
          })
        })
      })
      this.areaList = areaList
    },
    handleChange(value) {
      this.ruleForm.province_code = value[0]
      this.ruleForm.city_code = value[1]
      this.ruleForm.district_code = value[2]
    }
  }
}
</script>

<style lang="less">
// 组件样式  选择框选中后文字重置
.el-select-dropdown__item.selected {
  color: #606266;
}
</style>

<style lang="less" scoped>
// 修改个人信息部分
.set-user-info {
  .tips {
    margin-top: 12px;
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
  width: 468px;
  clear: both;
}

// 组件样式  form 定位
/deep/ .el-form {
  &-item.txt .el-form-item__content {
    margin-left: 0 !important;
  }

  // 组件样式 表单label文字
  .el-form-item__label {
    font-size: 14px;
    color: rgba(68, 68, 79, 1);
    line-height: 48px;
  }

  // 组件样式  表单
  .el-input__inner {
    width: 346px;
    height: 48px;
    border-radius: 4px;
    border: 1px solid rgba(207, 207, 212, 1);

    &::placeholder {
      color: rgba(169, 168, 174, 1);
    }
  }

  // 组件样式  错误提示文字
  .agree-error,
  .el-form-item__error {
    white-space: nowrap;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 2px;
      left: 0;
      width: 14px;
      height: 14px;
      background-repeat: no-repeat;
      background-size: 14px;
      background-position: center;
      background-image: url('~@/assets/img/form/icon_error.png');
    }
  }

  .el-form-item__error {
    top: 25%;
    left: 102%;
    padding-left: 18px;
    text-align: left;
  }

  .agree-error {
    position: relative;
    padding-left: 25px;
    line-height: 19px;
    color: rgba(230, 46, 55, 1);
  }

  // 组件样式  按钮
  .el-button {
    width: 216px;
    height: 48px;
    font-size: 16px;
    color: #ffffff;
  }

  // 组件样式 发送验证码按钮
  .el-form-item__content {
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

  .el-select {
    // 组件样式  form 选择框选中颜色重置
    .el-input.is-focus .el-input__inner,
    .el-input__inner:focus {
      border-color: #cfcfd4;
    }
  }

  .el-checkbox-group {
    line-height: 20px;

    .text {
      color: #44444f;

      a {
        color: #e62e37;
      }
    }
  }
}

// 会员中心认证引导
.certification-box {
  .tips {
    text-align: center;

    .red {
      color: rgba(230, 46, 55, 1);
    }
  }
}
</style>
