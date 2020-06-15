<template>
  <div>
    <LogoBar title="推荐客户">
      <SearchBar></SearchBar>
    </LogoBar>
    <div class="recommend">
      <div class="steps-box">
        <el-steps>
          <el-step title="一键推荐">
            <div slot="icon" class="step1">
              <img src="~@/assets/img/recommend/recommend.png" alt="" />
            </div>
          </el-step>
          <el-step title="客户到访">
            <div slot="icon" class="step">
              <img src="~@/assets/img/recommend/arrive.png" alt="" />
            </div>
          </el-step>
          <el-step title="客户签约">
            <div slot="icon" class="step">
              <img src="~@/assets/img/recommend/signing.png" alt="" />
            </div>
          </el-step>
          <el-step title="获得佣金">
            <div slot="icon" class="step">
              <img src="~@/assets/img/recommend/commission.png" alt="" />
            </div>
          </el-step>
        </el-steps>
      </div>
      <div class="recommend-form">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="客户信息" prop="cstName">
            <el-input
              v-model="ruleForm.cstName"
              maxlength="15"
              placeholder="请输入客户姓名"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="mobileNo">
            <el-input
              v-model="ruleForm.mobileNo"
              maxlength="11"
              type="tel"
              placeholder="请输入客户手机号"
            ></el-input>
          </el-form-item>

          <el-form-item
            :rules="[
              {
                required: certNoIsRequired,
                message: '请输入客户身份证号后六位',
                trigger: 'blur'
              },
              {
                validator: validateCertNo,
                trigger: 'change'
              }
            ]"
            prop="certNo"
          >
            <el-input
              v-model="ruleForm.certNo"
              placeholder="请输入客户身份证号后六位"
              maxlength="6"
            ></el-input>
          </el-form-item>

          <el-form-item label="意向楼盘" prop="province">
            <el-input
              v-model="ruleForm.province"
              placeholder="省份"
              class="icon-drop"
              readonly
              @focus="choiceProvince"
            ></el-input>
          </el-form-item>

          <el-form-item prop="intentionBuildingName">
            <el-input
              v-model="ruleForm.intentionBuildingName"
              placeholder="意向楼盘"
              class="icon-drop"
              readonly
              @focus="showBuilding = true"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="arriveProvinceIsRequired"
            :rules="{
              required: true,
              message: '请选择到访地区',
              trigger: 'change'
            }"
            prop="arriveProvinceName"
          >
            <el-input
              v-model="ruleForm.arriveProvinceName"
              placeholder="到访地区"
              class="icon-drop"
              readonly
              @focus="showArriveProvince = true"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="arriveProvinceIsRequired"
            :rules="{
              required: true,
              message: '请选择到访地区',
              trigger: 'change'
            }"
            prop="arriveBuildingName"
          >
            <el-input
              v-model="ruleForm.arriveBuildingName"
              placeholder="到访楼盘"
              class="icon-drop"
              readonly
              @focus="showArriveBuilding = true"
            ></el-input>
          </el-form-item>

          <el-form-item prop="planDate">
            <el-date-picker
              v-model="ruleForm.planDate"
              type="date"
              :picker-options="pickerOptions"
              placeholder="预约看房时间"
              class="icon-date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="客户需求" prop="needDetailLabel">
            <el-input
              v-model="ruleForm.needDetailLabel"
              placeholder="购房客户需求"
              class="icon-drop"
              readonly
              @focus="showNeedDetail = true"
            ></el-input>
          </el-form-item>

          <el-form-item prop="remark">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              placeholder="备注"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item class="mb20 terms" prop="noticeCheck">
            <el-checkbox v-model="ruleForm.noticeCheck">我已知悉</el-checkbox>
            <span class="imp" @click="showProtocol"
              >《推荐购房相关温馨提示》</span
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="warning"
              :loading="isloading"
              class="submit-btn block"
              @click="submitForm('ruleForm')"
            >
              马上推荐
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="note">
        温馨提示：<br />
        1.您或您的亲朋好友必须在首次到访楼盘现场
        <span>前30分钟</span>
        ，已在“恒房通”平台上自荐或被推荐，才可享受平台佣金及优惠政策。<br />
        2.请准确填写被推荐客户手机号码及身份证号后六位，如填写错误，认购后将视为无效推荐。
      </div>
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
      <province-select
        v-model="showArriveProvince"
        :columns="cityColumns"
        @confirm="cityConfirm"
      ></province-select>
      <building-select
        v-model="showArriveBuilding"
        :columns="cloupanList"
        @confirm="arriveBuildingConfirm"
      ></building-select>
      <need-detail
        v-model="showNeedDetail"
        :options="options"
        @confirm="onNeedConfirm"
      ></need-detail>
    </div>

    <el-dialog
      class="policy"
      title="推荐购房相关温馨提示"
      :visible.sync="dialogVisible"
    >
      <div class="protocol">
        &emsp;&emsp;根据最新个人所得税法相关规定，个人取得工资薪金、劳务报酬、稿酬和特许权使用费时，应由扣缴义务人按月或按次根据规定税率预缴税款，并于次年3月1日-6月30日将上述四项所得合并为综合所得，扣除基本减除费用、社保、住房公积金、子女教育、继续教育、大病医疗、住房贷款利息、住房租金、赡养老人等一系列支出后，进行个人所得税汇算清缴，税款多退少补。
      </div>
      <div class="protocol">
        &emsp;&emsp;恒大宝会员在恒大宝平台的实得佣金，已由公司按税法规定预缴税款。根据现行税法要求，恒大宝会员应于次年办理汇算清缴，并将佣金收入计入年度综合所得进行个人年度申报。因个人综合所得及扣除事项存在个体差异且涉及隐私，需由恒大宝会员自行申报处理，如产生汇缴税率差异公司不再予以调整。
      </div>
      <div class="protocol">
        &emsp;&emsp;部分楼盘不享受相关优惠政策，具体情况详询各售楼处。
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button class="block" type="danger" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </el-dialog>
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
import provinceSelect from '~/components/common/province-select'
import buildingSelect from '~/components/common/building-select'
import needDetail from '~/components/common/need-detail'
import LogoBar from '@/components/common/logo-bar'
import SearchBar from '@/components/common/search-bar'
import { dataLetterSort, load163DunScript } from '@/utils/utils'
const WyCaptchaid = '185403fe7eca457a964b8daa4960b55c'

const nameRegex = /^[a-zA-Z\u4E00-\u9FA5]+$/
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
const carid_6 = /^(0[1-9]|([1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/
const remarkReg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.\,\?\<\>\。\，\-\——\=\;\@\！\!\+\$]/g
const emojiregStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi
export default {
  components: {
    provinceSelect,
    LogoBar,
    SearchBar,
    buildingSelect,
    needDetail
  },
  data() {
    return {
      isloading: false,
      dialogVisible: false,
      showProvince: false,
      showBuilding: false,
      showArriveProvince: false,
      showArriveBuilding: false,
      showNeedDetail: false,
      dragVisible: false,
      captchaIns: null,
      ruleForm: {
        cstName: '',
        mobileNo: '',
        certNo: '',
        province: '', // 省份id
        provinceId: '', // 省份
        intentionBuildingId: '', // 楼盘id
        intentionBuildingName: '', // 楼盘名称
        prodGUID: '', // 楼盘项目id
        arriveProvinceId: '', // 联销盘到访地id
        arriveProvinceName: '', // 联销盘到访地名称
        arriveBuildingName: '', // 联销盘名称
        arriveBuildingId: '', // 联销盘id
        needDetailLabel: '',
        // noteDetail: '',
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
      provinceList: [],
      buildingList: [],
      certNoIsRequired: false,
      arriveProvinceIsRequired: false,
      cityColumns: [],
      cloupanList: [],
      jointMarketInfo: [],
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
        province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        intentionBuildingName: [
          { required: true, message: '请选择意向楼盘', trigger: 'change' }
        ],
        noticeCheck: { validator: this.noticeCheck, trigger: 'change' }
      },
      options: {
        product: [],
        area: [],
        roomType: [],
        focus: []
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  watch: {
    'ruleForm.cstName'(val) {
      this.ruleForm.cstName = val.replace(emojiregStr, '')
    },
    'ruleForm.remark'(val) {
      const str = val.replace(emojiregStr, '')
      this.ruleForm.remark = str.replace(remarkReg, '')
    }
  },
  mounted() {
    this.getUrlQuery()
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
        callback(new Error('请仔细阅读推荐购房相关温馨提示并勾选我已悉知'))
      } else {
        callback()
      }
    },
    showProtocol() {
      this.dialogVisible = true
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dragVisible = true
          this.initDragVerify()
        }
      })
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
                    // this.nextStep(0)
                    this.dragVisible = false
                    this.setParams()
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
    setParams() {
      const params = {
        cstName: this.ruleForm.cstName,
        mobileNo: this.ruleForm.mobileNo,
        certNo: this.ruleForm.certNo,
        province: this.ruleForm.province,
        provinceId: this.ruleForm.provinceId,
        intentionBuildingId: this.ruleForm.intentionBuildingId,
        prodGUID: this.ruleForm.prodGUID,
        arriveProvinceId: this.ruleForm.arriveProvinceId,
        arriveProvinceName: this.ruleForm.arriveProvinceName,
        arriveBuildingName: this.ruleForm.arriveBuildingName,
        arriveBuildingId: this.ruleForm.arriveBuildingId,
        needDetail: this.ruleForm.needDetail,
        planDate: this.ruleForm.planDate,
        remark: this.ruleForm.remark
      }
      this.recommendCustomer(params)
    },
    recommendCustomer(params) {
      this.isloading = true
      this.$store
        .dispatch('modules/broker/apiRecommendCustomer', params)
        .then(({ message }) => {
          this.isloading = false
          this.$confirm(message, '推荐成功', {
            confirmButtonText: '查看详情',
            cancelButtonText: '推荐至其他楼盘',
            type: 'success',
            center: true,
            customClass: 're-message-box'
          })
            .then(() => {
              console.log('查看详情')
            })
            .catch(() => {
              console.log('推荐至其他楼盘')
              this.ruleForm.province = ''
              this.ruleForm.provinceId = ''
              this.ruleForm.intentionBuildingId = ''
              this.ruleForm.intentionBuildingName = ''
              this.ruleForm.prodGUID = ''
              this.ruleForm.arriveProvinceId = ''
              this.ruleForm.arriveBuildingName = ''
              this.ruleForm.arriveProvinceName = ''
              this.certNoIsRequired = false
              this.arriveProvinceIsRequired = false
              this.ruleForm.arriveBuildingId = '' // 联销盘id
              this.cityColumns = []
              this.cloupanList = []
              this.jointMarketInfo = []
            })
        })
        .catch(({ code, message }) => {
          this.isloading = false
          if (code === '000002') {
            this.$confirm(message, '温馨提示', {
              confirmButtonText: '立即完善',
              showCancelButton: false,
              center: true,
              customClass: 're-message-box'
            }).then(() => {
              console.log('去认证')
              // this.$router.push({
              //   path: '/my/certification',
              //   isBack: '1' // 认证完成需要返回
              // })
            })
          } else {
            this.$confirm(message, '推荐失败', {
              confirmButtonText: '确定',
              showCancelButton: false,
              center: true,
              customClass: 're-message-box'
            }).then(() => {
              // todo
            })
          }
        })
    },
    choiceProvince() {
      this.showProvince = true
    },
    provinceConfirm(item) {
      if (item) {
        if (String(this.ruleForm.provinceId) !== String(item.id)) {
          console.log(item)
          this.ruleForm.intentionBuildingId = ''
          this.ruleForm.intentionBuildingName = ''
          this.ruleForm.prodGUID = '' // 楼盘项目id
          this.ruleForm.arriveProvinceId = '' // 联销盘到访地id
          this.ruleForm.arriveProvinceName = '' // 联销盘到访地名称
          this.ruleForm.arriveBuildingName = '' // 联销盘名称
          this.ruleForm.arriveBuildingId = '' // 联销盘id
          this.cityColumns = []
          this.cloupanList = []
          this.jointMarketInfo = []
          this.certNoIsRequired = false
          this.arriveProvinceIsRequired = false
        }
        this.ruleForm.province = item.province
        this.ruleForm.provinceId = item.id
        this.queryProductBaseInfo(item.id)
      } else {
        this.ruleForm.province = ''
        this.ruleForm.provinceId = ''
        this.ruleForm.intentionBuildingId = ''
        this.ruleForm.intentionBuildingName = ''
        this.ruleForm.prodGUID = '' // 楼盘项目id
        this.ruleForm.arriveProvinceId = '' // 联销盘到访地id
        this.ruleForm.arriveProvinceName = '' // 联销盘到访地名称
        this.ruleForm.arriveBuildingName = '' // 联销盘名称
        this.ruleForm.arriveBuildingId = '' // 联销盘id
        this.cityColumns = []
        this.cloupanList = []
        this.jointMarketInfo = []
        this.certNoIsRequired = false
        this.arriveProvinceIsRequired = false
      }
    },
    buildingConfirm(item) {
      if (item.isRecommend !== 1) {
        // this.$message.error('该楼盘不支持推荐')
        this.$confirm('该楼盘不支持推荐', '温馨提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          center: true,
          customClass: 're-message-box'
        })
        return
      }
      this.certNoIsRequired = false
      this.arriveProvinceIsRequired = false
      this.ruleForm.arriveProvinceId = '' // 联销盘到访地id
      this.ruleForm.arriveProvinceName = '' // 联销盘到访地名称
      this.ruleForm.arriveBuildingName = '' // 联销盘名称
      this.ruleForm.arriveBuildingId = '' // 联销盘id
      this.cityColumns = []
      this.cloupanList = []
      this.jointMarketInfo = []
      // 下面为假造数据
      // item.jointMarketCityCode = ['430200', '110100', '320500']
      // item.jointMarketCity = ['苏州市', '北京市', '株洲市']
      // item.jointMarketInfo = [
      //   {
      //     onlineId: '1269178786566406145',
      //     cityCode: '110100',
      //     buildName: '天津恒大绿洲',
      //     id: null,
      //     buildId: '1267703143844601857',
      //     sort: null,
      //     cityName: '北京市',
      //     pinYin: 'tian'
      //   },
      //   {
      //     onlineId: '1269178786566406145',
      //     cityCode: '430200',
      //     buildName: '株洲恒大林溪郡',
      //     id: null,
      //     buildId: '1267701951584329730',
      //     sort: null,
      //     cityName: '株洲市',
      //     pinYin: 'zhu'
      //   },
      //   {
      //     onlineId: '1269178786566406145',
      //     cityCode: '320500',
      //     buildName: '苏州恒大苏纶场',
      //     id: null,
      //     buildId: '1267703194125918209',
      //     sort: null,
      //     cityName: '苏州市',
      //     pinYin: 'su'
      //   }
      // ]
      // 上面未假造数据
      this.ruleForm.intentionBuildingName = item.buildName
      this.ruleForm.intentionBuildingId = item.id
      this.ruleForm.prodGUID = item.projGuid
      if (item.isRequiredByPerson === 1) {
        this.certNoIsRequired = true
      }
      if (item.isJointMarketing === 1) {
        this.arriveProvinceIsRequired = true
        if (item.jointMarketInfo && item.jointMarketInfo.length) {
          this.setJointMarketInfo(
            item.jointMarketInfo,
            item.jointMarketCity,
            item.jointMarketCityCode
          )
        }
      }
    },
    setJointMarketInfo(jointMarketInfo, jointMarketCity, jointMarketCityCode) {
      jointMarketInfo.forEach((item) => {
        item.id = item.buildId
      })
      this.jointMarketInfo = jointMarketInfo
      jointMarketCity.forEach((item, index) => {
        this.cityColumns.push({
          province: item,
          id: jointMarketCityCode[index]
        })
      })
    },
    cityConfirm(item) {
      this.ruleForm.arriveProvinceId = ''
      this.ruleForm.arriveBuildingName = '' // 联销盘名称
      this.ruleForm.arriveBuildingId = '' // 联销盘id
      this.cloupanList = []
      this.ruleForm.arriveProvinceName = item.province
      // this.cloupanList = []
      this.cloupanList = this.jointMarketInfo.filter((el) => {
        return el.cityName === item.province
      })
      this.cloupanList = dataLetterSort(this.cloupanList, 'pinYin')
    },
    arriveBuildingConfirm(item) {
      this.ruleForm.arriveProvinceId = item.cityCode // 联销盘到访地id
      this.ruleForm.arriveBuildingName = item.buildName // 联销盘名称
      this.ruleForm.arriveBuildingId = item.id // 联销盘id
    },
    onNeedConfirm(obj, text) {
      this.ruleForm.needDetail = obj
      this.ruleForm.needDetailLabel = text
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
    getUrlQuery() {
      const query = this.$route.query
      this.ruleForm.cstName = query.cstName ? query.cstName : ''
      this.ruleForm.mobileNo = query.mobileNo ? query.mobileNo : ''
      this.ruleForm.certNo = query.certNo ? query.certNo : ''
      this.ruleForm.provinceId = query.city ? query.city : ''
      this.ruleForm.intentionBuildingId = query.intentionBuilding
        ? query.intentionBuilding
        : ''
    }
  }
}
</script>
<style lang="less" scoped>
.recommend {
  width: 800px;
  margin: 0 auto 80px;

  .steps-box {
    padding: 57px 34px 44px;

    .step1 {
      width: 72px;
      height: 72px;
      background: #fff;
      img {
        display: block;
        width: 72px;
        height: 72px;
      }
    }

    .step {
      width: 72px;
      height: 72px;
      img {
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
      }
    }
  }

  .terms span {
    color: rgba(255, 50, 60, 1);
    cursor: pointer;
  }

  .submit-btn {
    height: 54px;
    border-radius: 6px;
    font-size: 16px;
  }

  .note {
    margin-top: 40px;
    font-size: 14px;
    color: rgba(168, 169, 174, 1);
    line-height: 20px;
    text-align: left;

    span {
      color: rgba(255, 50, 60, 1);
    }
  }

  .icon-drop,
  .icon-date {
    &::after {
      content: '';
      position: absolute;
      top: 15px;
      right: 22px;
      width: 22px;
      height: 22px;
      background-repeat: no-repeat;
      background-size: 22px;
      background-position: center;
    }
  }

  .icon-drop::after {
    background-image: url('~@/assets/img/form/icon_drop.png');
  }

  .icon-date::after {
    background-image: url('~@/assets/img/form/icon_date.png');
  }
}

/deep/ .el-steps {
  .el-step__icon {
    // width: auto;
    border: none;
  }

  .el-step__head {
    left: 38px;
  }

  .el-step__main {
    margin-top: 8px;
  }

  .el-step__line {
    height: 1px;
    background-color: #e62e37;
  }

  .el-step__title.is-wait {
    color: #c0c4cc;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(68, 68, 79, 1);
  }
}

/deep/ .el-form-item {
  position: relative;
  margin-bottom: 24px;

  .el-date-editor {
    .el-input__suffix {
      right: 50px;
    }
  }

  &.is-required {
    // 1

    .el-input::before {
      content: '*';
      position: absolute;
      top: 20px;
      right: -30px;
      font-weight: bold;
      font-size: 24px;
      color: rgba(221, 0, 15, 1);
    }
  }

  &.is-error {
    margin-bottom: 16px;

    .el-input__inner {
      border-color: rgba(255, 50, 60, 1);
    }
  }

  &.mb0 {
    margin-bottom: 0;
  }

  &.mb20 {
    margin-bottom: 20px;
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
      display: none;
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
    position: relative;
    font-size: 14px;
    color: rgba(68, 68, 79, 1);
    line-height: 20px;
    text-align: center;
  }

  .el-input__inner,
  .el-textarea__inner {
    height: 52px;
    padding: 0 20px;
    line-height: 52px;
    border-color: rgba(207, 207, 212, 1);
    border-radius: 4px;
    font-size: 16px;

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

.policy /deep/ .el-dialog {
  width: 600px;
  border-radius: 8px;
  color: rgba(68, 68, 79, 1);

  .protocol {
    line-height: 20px;
    margin-bottom: 10px;
  }

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

    .el-button {
      font-size: 16px;
    }

    .el-button--danger.block {
      width: 400px;
      height: 54px;
      margin: 0 auto;
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
</style>
<style lang="less">
.re-message-box.el-message-box {
  .el-button--default {
    width: 130px;
    height: 44px;
    border-radius: 6px;
    border: 1px solid rgba(169, 168, 174, 1);
    font-size: 16px;

    &:hover {
      color: rgba(230, 46, 55, 1);
      border-color: rgba(230, 46, 55, 1);
      background-color: rgba(230, 46, 55, 0.1);
    }
  }

  .el-button--primary {
    width: 130px;
    height: 44px;
    background: rgba(230, 46, 55, 1);
    border-radius: 6px;
    border: 1px solid rgba(230, 46, 55, 1);
    font-size: 16px;

    &:hover {
      color: #fff;
      border-color: rgba(230, 46, 55, 1);
      background-color: rgba(230, 46, 55, 1);
    }
  }
}
</style>
