<template>
  <div>
    <LogoBar title="恒大意向房源登记">
      <SearchBar></SearchBar>
    </LogoBar>
    <div class="appoint-wrap">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <div>
          <el-form-item label="姓名" prop="cstName">
            <el-input
              v-model="ruleForm.cstName"
              placeholder="请准确填写购房者全名"
              maxlength="8"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobileNo">
            <el-input
              v-model="ruleForm.mobileNo"
              type="tel"
              maxlength="11"
              placeholder="请准确填写购房者手机号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="身份证后六位" prop="certNo">
            <el-input
              id="cerIdDom"
              v-model="ruleForm.certNo"
              type="text"
              placeholder="请准确填写"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item label="楼盘所在地区" prop="province">
            <el-input
              v-model="ruleForm.province"
              placeholder="请选择"
              readonly
              @focus="showProvince = true"
            ></el-input>
          </el-form-item>
          <el-form-item label="意向楼盘名字" prop="intentionBuildingName">
            <el-input
              v-model="ruleForm.intentionBuildingName"
              placeholder="请选择"
              readonly
              @focus="showBuilding = true"
            ></el-input>
          </el-form-item>
          <el-form-item label="预期看房日期" prop="planDate">
            <el-date-picker
              v-model="ruleForm.planDate"
              style="width:100%"
              value-format="yyyy-MM-dd"
              type="date"
              :picker-options="pickerOptions"
              placeholder="请准确选择"
              @focus="focusDate"
              @blur="blurDate"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="购房需求" prop="needDetailLabel">
            <el-input
              v-model="ruleForm.needDetailLabel"
              placeholder="可多选"
              readonly
              @focus="showNeedDetail = true"
            ></el-input>
          </el-form-item>

          <el-form-item prop="remark" label="备注">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              placeholder="请输入备注"
              maxlength="80"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item class="mb15 terms" prop="noticeCheck">
            <el-checkbox v-model="ruleForm.noticeCheck"
              >已经阅读并同意</el-checkbox
            >
            <span class="imp" @click="showProtocol">
              《恒大宝隐私保护政策》
            </span>
          </el-form-item>
          <el-form-item class="mb15">
            <el-button type="danger" class="apply-btn block" @click="submit">
              立即提交
            </el-button>
          </el-form-item>
        </div>
      </el-form>

      <p class="note">温馨提示：提交资料后，我们会第一时间联系您！</p>

      <el-dialog
        class="success-box"
        top="40vh"
        center
        :visible.sync="dialogSuccess"
      >
        <img
          class="pic"
          src="@/assets/img/form/icon_success.png"
          alt="success"
        />
        <p>提交成功！我们会第一时间与您联系！</p>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogClose">关闭</el-button>
        </span>
      </el-dialog>

      <!-- <div v-show="isDate" class="date-bg"></div> -->

      <el-dialog
        class="policy"
        title="恒大统一用户中心隐私政策"
        :visible.sync="dialogVisible"
      >
        <div class="protocol">
          <privacy-policy></privacy-policy>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button
            class="block"
            :loading="isloading"
            type="danger"
            @click="dialogVisible = false"
          >
            确定
          </el-button>
        </div>
      </el-dialog>

      <province-select
        v-model="showProvince"
        :columns="provinceList"
        :default-id="ruleForm.provinceId"
        @confirm="provinceConfirm"
      ></province-select>
      <building-select
        v-model="showBuilding"
        :columns="buildingList"
        :default-value="ruleForm.intentionBuildingId"
        @confirm="buildingConfirm"
      ></building-select>
      <need-detail
        v-model="showNeedDetail"
        :options="options"
        @confirm="onNeedConfirm"
      ></need-detail>
    </div>
    <el-dialog
      class="drag-dialog"
      title="请完成安全验证"
      :visible.sync="dragVisible"
    >
      <div ref="dragBox" class="drag-box"></div>

      <div slot="footer" class="dialog-footer">
        <el-button class="block" type="danger" @click="dragVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import provinceSelect from '~/components/common/province-select'
import buildingSelect from '~/components/common/building-select'
import needDetail from '~/components/common/need-detail'
import LogoBar from '@/components/common/logo-bar'
import SearchBar from '@/components/common/search-bar'
import PrivacyPolicy from '@/components/notice/privacy-policy'
import { dataLetterSort, load163DunScript } from '@/utils/utils'
const WyCaptchaid = '185403fe7eca457a964b8daa4960b55c'
const nameRegex = /^[a-zA-Z\u4E00-\u9FA5]+$/
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
const carid_6 = /^(0[1-9]|([1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/
const remarkReg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.\,\?\<\>\。\，\-\——\=\;\@\！\!\+\$]/g
const emojiregStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi

export default {
  components: {
    LogoBar,
    SearchBar,
    PrivacyPolicy,
    provinceSelect,
    buildingSelect,
    needDetail
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      isloading: false,
      showProvince: false,
      showBuilding: false,
      showNeedDetail: false,
      dialogCode: false,
      dialogSuccess: false,
      dialogVisible: false,
      protocolCheck: false,
      autofill: false,
      dragVisible: false,
      captchaIns: null,
      provinceList: [],
      buildingList: [],
      options: {
        product: [],
        area: [],
        roomType: [],
        focus: []
      },
      ruleForm: {
        cstName: '',
        mobileNo: '',
        certNo: '',
        province: '', // 省份id
        provinceId: '', // 省份
        intentionBuildingId: '', // 楼盘id
        intentionBuildingName: '', // 楼盘名称
        // prodGUID: '', // 楼盘项目id
        needDetailLabel: '',
        needDetail: {
          product: null,
          area: null,
          roomType: null,
          focus: null
        },
        planDate: '',
        remark: '',
        noticeCheck: false
      },
      rules: {
        cstName: [
          {
            required: true,
            message: '请输入客户姓名',
            trigger: 'blur'
          },
          { validator: this.validateName, trigger: 'change' }
        ],
        mobileNo: [
          {
            required: true,
            message: '请输入客户手机号',
            trigger: 'blur'
          },
          { validator: this.validatePhone, trigger: 'change' }
        ],
        certNo: [
          {
            required: true,
            message: '请输入客户身份证号后六位',
            trigger: 'blur'
          },
          {
            validator: this.validateCertNo,
            trigger: 'change'
          }
        ],
        province: [
          {
            required: true,
            message: '请选择意向楼盘所在地区',
            trigger: 'change'
          }
        ],
        intentionBuildingName: [
          { required: true, message: '请选择意向楼盘', trigger: 'change' }
        ],
        noticeCheck: { validator: this.noticeCheck, trigger: 'change' },
        planDate: {
          required: true,
          message: '请输入选择日期',
          trigger: 'change'
        }
      },
      isDate: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    'ruleForm.cstName'(val) {
      if (val) this.ruleForm.cstName = val.replace(emojiregStr, '')
    },
    'ruleForm.remark'(val) {
      const str = val.replace(emojiregStr, '')
      this.ruleForm.remark = str.replace(remarkReg, '')
    }
  },
  mounted() {
    if (this.userInfo.name) this.ruleForm.cstName = this.userInfo.name
    if (this.userInfo.phone) this.ruleForm.mobileNo = this.userInfo.phone

    this.getProvPcMapperDto()
    this.queryProductByTypes()
  },
  methods: {
    validateName(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入客户姓名'))
      } else if (!nameRegex.test(value)) {
        callback(new Error('请输入中文或者英文姓名'))
      } else {
        callback()
      }
    },
    validatePhone(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入客户手机号'))
      } else if (!phoneReg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    },
    validateCertNo(rule, value, callback) {
      if (value && !carid_6.test(value)) {
        callback(new Error('请输入正确的身份证后6位'))
      } else {
        callback()
      }
    },
    noticeCheck(rule, value, callback) {
      if (!value) {
        callback(new Error('请先阅读并同意《恒大恒房通官网隐私保护政策》'))
      } else {
        callback()
      }
    },
    queryProductBaseInfo(code) {
      this.$store
        .dispatch('modules/prod/queryProductBaseInfo', {
          provinceCode: code,
          buildOnlineStatus: 1
        })
        .then(({ data }) => {
          this.buildingList = dataLetterSort(data, 'buildNamePinYin')
        })
    },
    getProvPcMapperDto() {
      this.$store
        .dispatch('modules/prod/getProvPcMapperDto')
        .then(({ data }) => {
          this.provinceList = data
        })
    },
    queryProductByTypes() {
      const params = {
        productType: [
          'Customer_Demand_PropertyType', // 产品
          'Customer_Demand_Bedroom', // 户型
          'Customer_Demand_PropertySize', // 面积
          'Customer_Demand_Priority' // 重点关注
        ]
      }
      this.$store
        .dispatch('modules/broker/apiQueryProductByTypes', params)
        .then(({ data }) => {
          if (data.length) this.setOptions(data)
        })
    },
    setOptions(options) {
      const obj = {}
      options.map((item) => {
        if (item.productType === 'Customer_Demand_PropertyType') {
          obj.product = item.typeDto
        } else if (item.productType === 'Customer_Demand_PropertySize') {
          obj.area = item.typeDto
        } else if (item.productType === 'Customer_Demand_Bedroom') {
          obj.roomType = item.typeDto
        } else if (item.productType === 'Customer_Demand_Priority') {
          obj.focus = item.typeDto
        }
      })
      this.options = obj
    },
    provinceConfirm(item) {
      if (item) {
        if (String(this.ruleForm.provinceId) !== String(item.id)) {
          this.ruleForm.intentionBuildingId = ''
          this.ruleForm.intentionBuildingName = ''
          // this.ruleForm.prodGUID = '' // 楼盘项目id
        }
        this.ruleForm.province = item.province
        this.ruleForm.provinceId = item.id
        this.queryProductBaseInfo(item.id)
      } else {
        this.ruleForm.province = ''
        this.ruleForm.provinceId = ''
        this.ruleForm.intentionBuildingId = ''
        this.ruleForm.intentionBuildingName = ''
        // this.ruleForm.prodGUID = '' // 楼盘项目id
      }
    },
    buildingConfirm(item) {
      this.ruleForm.intentionBuildingName = item.buildName
      this.ruleForm.intentionBuildingId = item.id
      // this.ruleForm.prodGUID = item.projGuid
    },
    onNeedConfirm(obj, text) {
      this.ruleForm.needDetail = obj
      this.ruleForm.needDetailLabel = text
    },
    dialogClose() {
      this.dialogSuccess = false
      window.location.href = '/'
    },
    showCode() {
      this.dialogCode = true
    },
    showProtocol() {
      this.dialogVisible = true
    },
    submit() {
      if (this.isloading === true) return
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dragVisible = true
          this.initDragVerify()
        }
      })
    },
    async create() {
      this.isloading = true
      const params = {
        userName: this.ruleForm.cstName,
        phoneNo: this.ruleForm.mobileNo,
        idType: '',
        idCardSix: this.ruleForm.certNo,
        provinceId: this.ruleForm.provinceId,
        provinceName: this.ruleForm.province,
        buildingId: this.ruleForm.intentionBuildingId,
        buildingName: this.ruleForm.intentionBuildingName,
        orderDate: this.ruleForm.planDate,
        purchaseDemand: this.ruleForm.needDetail,
        remark: this.ruleForm.remark
      }
      console.log(params)
      try {
        await this.$store.dispatch('modules/broker/create', params)
        this.dialogSuccess = true
      } catch (error) {
        console.log(error)
      }
      this.isloading = false
    },
    initDragVerify() {
      load163DunScript().then((initNECaptcha) => {
        const el = this.$refs.dragBox
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
                    this.dragVisible = false
                    this.create()
                    this.captchaIns.destroy()
                  })
                  .catch((err) => {
                    // alert('校验失败')
                    console.log(err)
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
    focusDate() {
      this.isDate = true
    },
    blurDate() {
      this.isDate = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item {
  position: relative;
  margin-bottom: 24px;

  &.is-error {
    margin-bottom: 16px;

    .el-input__inner {
      border-color: rgba(255, 50, 60, 1);
    }
  }

  &.mb0 {
    margin-bottom: 0;
  }

  &.mb15 {
    margin-bottom: 15px;
  }

  &__label {
    margin-bottom: 16px;
    position: relative;
    padding-right: 24px;
    font-size: 20px;
    font-weight: bold;
    color: rgba(68, 68, 79, 1);
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

    /*&::before {
      content: '';
      position: absolute;
      top: 11px;
      left: 0;
      width: 14px;
      height: 14px;
      background-image: url('~@/assets/img/form/icon_error.png');
      background-repeat: no-repeat;
      background-size: 14px 14px;
      background-position: left center;
    }*/
  }

  &__content {
    position: relative;
    font-size: 14px;
    color: rgba(68, 68, 79, 1);
    line-height: 20px;
    text-align: center;
  }

  .el-input__inner {
    height: 52px;
    padding: 0 20px;
    line-height: 52px;
    border-color: rgba(207, 207, 212, 1);
    border-radius: 4px;

    &:focus {
      border-color: rgba(0, 130, 248, 1);
    }
  }

  .el-textarea__inner {
    height: 128px;
    padding: 10px 20px;
    line-height: 30px;
  }

  .el-icon-date {
    display: none;
  }
}

.el-date-table td {
  &.today span {
    color: #dd000f;
  }

  &.current:not(.disabled) span {
    background-color: #dd000f;
  }
}

.el-input__icon.el-icon-circle-close {
  position: absolute;
  right: -99px;
  z-index: -1;
}

.policy /deep/ .el-dialog {
  width: 1200px;
  border-radius: 8px;
  color: rgba(68, 68, 79, 1);

  &__header {
    text-align: center;
    padding: 48px 64px 28px;
  }

  &__headerbtn .el-dialog__close {
    color: rgba(169, 168, 174, 1);

    &:hover {
      color: rgba(131, 130, 136, 1);
    }
  }

  &__title {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  &__headerbtn .el-dialog__close {
    color: #000;
    line-height: 22px;
  }

  &__body {
    padding: 0 64px 24px;
  }

  .date {
    margin-bottom: 12px;
    font-size: 12px;
    line-height: 17px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
  }

  .txt {
    text-indent: 2em;
  }

  b {
    font-weight: bold;
  }

  .dialog-footer {
    padding-bottom: 44px;

    .el-button--danger.block {
      width: 800px;
      height: 54px;
      margin: 0 auto;
      font-size: 16px;
    }
  }
}

.drag-dialog /deep/ .el-dialog {
  width: 400px;
  border-radius: 8px;
  color: rgba(68, 68, 79, 1);

  &__header {
    text-align: center;
    padding: 22px 64px 28px;
  }

  &__headerbtn .el-dialog__close {
    color: rgba(169, 168, 174, 1);

    &:hover {
      color: rgba(131, 130, 136, 1);
    }
  }

  &__title {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  &__headerbtn .el-dialog__close {
    color: #000;
    line-height: 22px;
  }

  &__body {
    padding: 0 15px;

    // 滑块
    .drag-box {
      width: 100%;
      height: 240px;
    }
  }

  .dialog-footer {
    .el-button {
      font-size: 16px;
    }

    .el-button--danger.block {
      height: 54px;
      margin: 0 auto;
    }
  }
}

.success-box {
  /deep/ .el-dialog {
    width: 432px;
    padding: 40px 0;

    &__header {
      display: none;
    }

    &__body {
      font-size: 16px;
      color: #5b616c;
      line-height: 22px;
      text-align: center;
    }

    &__footer {
      padding: 36px 0 0;
    }

    .el-button {
      width: 130px;
      height: 44px;
      background: #e62e37;
      border-radius: 6px;
      border: 1px solid #e62e37;
      font-size: 16px;
    }
  }

  .pic {
    display: block;
    width: 80px;
    margin: 0 auto 16px;
  }
}

.appoint-wrap {
  width: 800px;
  margin: 35px auto 70px;

  input {
    box-shadow: inset 0 0 0 1000px #fff !important;
  }

  .terms span {
    color: rgba(255, 50, 60, 1);
    cursor: pointer;
  }

  .apply-btn {
    height: 54px;
    border-radius: 6px;
    font-size: 16px;
  }

  .note {
    font-size: 14px;
    color: rgba(168, 169, 174, 1);
    line-height: 20px;
    text-align: center;
  }
}
</style>
