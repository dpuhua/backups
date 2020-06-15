/* 我的客户 */
<template>
  <div>
    <div class="client-top">
      <div class="title-wrap">
        <h2 class="title">我的客户</h2>
      </div>
      <div class="client-select">
        <el-form
          ref="sharchForm"
          :inline="true"
          :model="formInline"
          label-width="30px"
          class="demo-form-inline"
        >
          <el-form-item class="client" label="客户" prop="keyword">
            <el-input
              v-model="formInline.keyword"
              placeholder="客户姓名/手机号"
            ></el-input>
          </el-form-item>

          <el-form-item class="recommetd" label prop="status">
            <el-select v-model="formInline.status" placeholder="推荐时间">
              <el-option label="推荐时间" value="0"></el-option>
              <el-option label="到访时间" value="1"></el-option>
              <el-option label="认购时间" value="2"></el-option>
              <el-option label="签约时间" value="3"></el-option>
              <el-option label="过期时间" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="chouse-time" label>
            <el-col :span="11">
              <el-form-item prop="effectiveTimeBegin">
                <!--  这里嵌套了一层 -->
                <el-date-picker
                  v-model="formInline.effectiveTimeBegin"
                  type="date"
                  placeholder="选择日期"
                  style="width: 45%;"
                ></el-date-picker>
              </el-form-item>
              <!--  这里嵌套了一层 -->
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="effectiveTimeEnd">
                <!--  这里嵌套了一层 -->
                <el-date-picker
                  v-model="formInline.effectiveTimeEnd"
                  type="date"
                  placeholder="选择日期"
                  style="width: 46%;"
                ></el-date-picker>
              </el-form-item>
              <!--  这里嵌套了一层 -->
            </el-col>
          </el-form-item>

          <el-form-item class="chenck-btn">
            <el-button type="danger" @click="onSubmit">查询</el-button>
            <a class="rest-btn" href="javascript: ;" @click="resetForm">
              <i class="icon-rest">
                <img src="~@/assets/img/account/vip/icon_rest.png" alt /> </i
              >重置
            </a>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="activeStatus === '4'" class="del-bar clearfix">
      <p class="fl">
        共<em>{{ list.length }}</em
        >个结果
      </p>
      <span class="btn fr" @click="delHandler(false)">批量删除</span>
    </div>
    <div class="client-info">
      <ul class="title-wrap">
        <li
          v-for="item in tabs"
          :key="item.status"
          :class="{ on: item.status === activeStatus }"
          @click.stop="onSelectHandler(item)"
        >
          <a href="javascript:;"
            >{{ item.text }}({{ recommendCount[item.key] || 0 }})</a
          >
        </li>
      </ul>
      <div class="info-data">
        <!-- 表格 -->
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column align="center" label="客户姓名" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <i class="icon-prolong">
                  <img src="~@/assets/img/account/vip/icon_prolong.png" alt />
                </i>
                {{ scope.row.clientName }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="phone"
            label="手机号码"
            width="105"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="buildingName"
            label="推荐项目"
            width="132"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zygwName"
            label="置业顾问"
            width="146"
          >
            <template slot-scope="scope">
              {{ scope.row.zygwName }} {{ scope.row.zygwPhone }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="['2', '3'].includes(activeStatus)"
            align="center"
            label="佣金说明"
            width="146"
          >
            <template slot-scope="scope">
              <el-popover
                v-if="activeStatus === '2' || +scope.row.intentionRate"
                trigger="hover"
                placement="bottom"
              >
                <p v-if="activeStatus === '2' && !+scope.row.isTranFund">
                  您可以自愿放弃佣金，转给购房者享额外折扣优惠
                </p>
                <p v-if="+scope.row.isTranFund">
                  您已放弃{{
                    item.intentionRate
                  }}%佣金，转给购房者享额外折扣优惠 外折扣优惠
                </p>
                <div slot="reference" class="name-wrapper">
                  <el-button type="text" size="small">
                    查看
                  </el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            v-if="['0', '1'].includes(activeStatus)"
            align="center"
            prop="daysNum"
            label="保护期剩余天数"
            width="108"
          ></el-table-column>
          <!-- <el-table-column
            align="center"
            prop="overduetime"
            label="过期时间"
            width="92"
          ></el-table-column>-->
          <el-table-column
            v-if="['4'].includes(activeStatus)"
            label="是否已到访"
          >
            <template slot-scope="scope">
              <span v-if="[20, 60].includes(scope.row.clientStatus)">{{
                scope.row.clientStatus === 20 ? '未到访' : '已到访'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="267">
            <!-- 原宽度 175 -->
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="onDetail(scope.row)">
                查看
              </el-button>
              <template v-if="activeStatus !== '4'">
                <el-button
                  v-if="activeStatus === '1' && extendDays(scope.row)"
                  type="text"
                  size="small"
                  @click="onActivate(scope.row)"
                >
                  延长保护期
                </el-button>
                <el-button
                  v-if="activeStatus === '2'"
                  type="text"
                  size="small"
                  @click="transferHandler(scope.row)"
                >
                  转让佣金
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="toRecommend(2, scope.row)"
                >
                  推荐至其他项目
                </el-button>
              </template>
              <el-popover v-else trigger="hover" placement="bottom">
                <el-button
                  v-if="activeStatus === '4'"
                  type="text"
                  size="small"
                  @click="delHandler(scope.row.recommendId)"
                >
                  删除
                </el-button>
                <br />
                <el-button
                  v-if="activeStatus === '4'"
                  type="text"
                  size="small"
                  @click="toRecommend(1, scope.row)"
                >
                  重新推荐至本项目
                </el-button>
                <br />
                <el-button
                  type="text"
                  size="small"
                  @click="toRecommend(2, scope.row)"
                >
                  推荐至其他项目
                </el-button>
                <div slot="reference" class="btn-reference">
                  <el-button type="text" size="small">
                    更多操作
                  </el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-if="list.length"
          background
          align="center"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="formInline.pageSize"
          layout="  prev, pager, next, sizes,jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 弹窗区域 客户信息-->
    <el-dialog
      title="客户信息"
      :visible.sync="detailDialogVisible"
      width="764px"
    >
      <div class="boxclient-infowrap">
        <h3 class="boxclient-title">
          <span class="clientname">{{ detail.clientName }}</span>
          <span class="clientphone">{{ detail.phone }}</span>
          <span class="clientimg">
            <img
              v-if="activeStatus === '0'"
              src="~@/assets/img/account/vip/icon_customer_status0.png"
            />
            <img
              v-if="activeStatus === '1'"
              src="~@/assets/img/account/vip/icon_customer_status1.png"
            />
            <img
              v-if="activeStatus === '2'"
              src="~@/assets/img/account/vip/icon_customer_status2.png"
            />
            <img
              v-if="activeStatus === '3'"
              src="~@/assets/img/account/vip/icon_customer_status3.png"
            />
            <img
              v-if="activeStatus === '4'"
              src="~@/assets/img/account/vip/icon_customer_status4.png"
            />
          </span>
        </h3>
        <ul class="boxclient-info">
          <li>
            <span class="label-left">身份证后六位</span>
            <span>{{ detail.clientIdCard }}</span>
          </li>
          <li>
            <span class="label-left">推荐项目</span>
            <span>{{ detail.buildingName }}</span>
          </li>
          <li v-if="['0', '1'].includes(activeStatus)">
            <span class="label-left">有效期剩余天数</span>
            <span>{{ detail.daysNum }}天</span>
          </li>
          <li
            v-if="
              ['4'].includes(activeStatus) &&
                [20, 60].includes(detail.clientStatus)
            "
          >
            <span class="label-left">到访情况</span>
            <span>{{ detail.clientStatus === 20 ? '未到访' : '已到访' }}</span>
          </li>
          <li v-if="['1', '2', '3', '4'].includes(activeStatus)">
            <span class="label-left justify">到访项目</span>
            <span>{{ detail.visitePlace }}</span>
          </li>
          <li v-if="['1', '2', '3', '4'].includes(activeStatus)">
            <span class="label-left">置业顾问</span>
            <span>{{ detail.zygwName }} {{ detail.zygwPhone }}</span>
          </li>
        </ul>
        <!-- 交互说明，通过切换下面的class one two three four来实现切换状态 -->
        <div
          v-loading="detailLoading"
          class="boxclient-flow"
          :class="['one', 'two', 'three', 'four'][stepActive]"
        >
          <ul class="boxflow-wrap">
            <li
              v-for="(item, index) in stepList"
              :key="index"
              :class="['one', 'two', 'three', 'four'][index]"
            ></li>
          </ul>
          <ul class="boxflow-info">
            <li
              v-for="(item, index) in stepList"
              :key="index"
              :class="['first', 'second', 'third', 'fouth'][index]"
            >
              <p class="info-title">{{ item.status }}</p>
              <p class="info-time">{{ item.date }}</p>
              <p class="info-remark">(备注)</p>
              <p class="remark">
                {{ item.remark }}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div class="boxclient-foot">
        <span class="left-tips"
          >* 您可以自愿放弃佣金，转给购房者享额外折扣优惠</span
        >
        <el-button
          v-if="activeStatus === '4'"
          size="small"
          @click="toRecommend(1, detail)"
        >
          重新推荐至本项目
        </el-button>
        <el-button
          :type="['0', '3', '4'].includes(activeStatus) ? 'danger' : ''"
          @click="toRecommend(2, detail)"
        >
          推荐至其它项目
        </el-button>
        <el-button
          v-if="activeStatus === '2'"
          type="danger"
          size="small"
          @click="transferHandler(item)"
        >
          转让佣金
        </el-button>

        <el-button
          v-if="activeStatus === '1' && extendDays(detail)"
          type="danger"
          @click="onActivate(detail)"
        >
          延长保护期
        </el-button>
      </div>
    </el-dialog>

    <!-- 弹窗区域 转让佣金 -->
    <el-dialog
      :title="title"
      :visible.sync="transferDialogVisible"
      :close-on-click-modal="false"
      width="560px"
    >
      <transfer-brokerage
        v-model="transferDialogVisible"
        :title.sync="title"
        :recommend-id="detail.recommendId"
      ></transfer-brokerage>
    </el-dialog>
  </div>
</template>

<script>
import transferBrokerage from '~/components/broker/transferBrokerage'

const stepList = [
  {
    date: '',
    active: 0,
    statusCode: '0',
    status: '推荐成功',
    remark: ''
  },
  {
    date: '',
    active: 0,
    statusCode: '1',
    status: '已到访',
    remark: ''
  },
  {
    date: '',
    active: 0,
    statusCode: '2',
    status: '已认购',
    remark: ''
  },
  {
    date: '',
    active: 0,
    statusCode: '3',
    status: '已签约',
    remark: ''
  }
]

export default {
  components: {
    transferBrokerage
  },
  data() {
    return {
      // 弹窗控制 测试用
      detailDialogVisible: false,
      detail: {},
      title: '',
      detailLoading: false,
      transferDialogVisible: false,
      formInline: {
        keyword: '',
        status: '0',
        effectiveTimeBegin: '',
        effectiveTimeEnd: '',
        page: 1,
        pageSize: 10
      },
      activeStatus: '0',
      total: 0,
      list: [],
      tabs: [
        { status: '0', text: '未到访', key: 'notVisited' },
        { status: '1', text: '已到访', key: 'visited' },
        { status: '2', text: '已认购', key: 'saled' },
        { status: '3', text: '已签约', key: 'signed' },
        { status: '4', text: '已过期', key: 'expired' }
      ],
      recommendCount: {},
      loading: false,
      stepList
    }
  },
  computed: {
    stepActive() {
      return this.stepList.filter((item) => item.active === 1).length - 1
    }
  },
  mounted() {
    this.getList()
    this.getCount()
  },
  methods: {
    onSelectHandler(item) {
      this.activeStatus = item.status
      this.getList()
    },
    handleSizeChange(size) {
      this.formInline.pageSize = size
    },
    handleCurrentChange(page) {
      this.formInline.page = page
      this.getList()
    },
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
    },
    extendDays(item) {
      //  延长保护期条件
      return this.status === '1' && item.daysNum <= 2 && item.daysNum >= -3
    },
    getList() {
      const current = this.formInline.page
      const params = {
        currentPage: current,
        pageSize: this.formInline.pageSize,
        status: this.activeStatus,
        effectiveTimeBegin: this.formInline.effectiveTimeBegin,
        effectiveTimeEnd: this.formInline.effectiveTimeEnd
      }

      this.loading = true

      this.$store
        .dispatch('modules/broker/apiRecommendList', params)
        .then((res) => {
          const data = res.data || {}
          this.list = data.recommendLists || []
          this.total = data.total || 0
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSubmit() {
      this.activeStatus = this.formInline.status
      this.getList()
    },
    resetForm() {
      this.$refs.sharchForm.resetFields()
      this.activeStatus = '0'
      this.$nextTick(() => {
        this.getList()
      })
    },
    onDetail(item) {
      this.detailDialogVisible = true
      this.detail = item
      this.detailLoading = true
      this.$store
        .dispatch('modules/broker/apiRecommendProgress', {
          recommendId: item.recommendId
        })
        .then((res) => {
          const items = (res.data && res.data.rows) || []
          this.stepList = stepList
          if (this.activeStatus !== '4') {
            this.stepList.map((item, index) => {
              const fItem = items.find((l) => l.statusCode === item.statusCode)
              if (fItem) {
                item.active = 1
                item.date = fItem.date
                item.remark = fItem.remark
              }
            })
          } else {
            this.stepList = items.map((item) => {
              item.active = 1
              return item
            })
          }
        })
        .catch(() => {
          this.stepList = stepList
        })
        .finally(() => {
          this.detailLoading = false
        })
    },
    onActivate(item) {
      this.$store
        .dispatch('modules/broker/apiActivate', {
          recommendId: item.recommendId
        })
        .then((res) => {
          item.daysNum = parseInt(item.daysNum) + 30

          this.$confirm(
            '延长保护期操作成功!请提醒客户30天内及时到访相应楼盘过期将会失效。',
            '操作成功',
            {
              confirmButtonText: '确认',
              cancelButtonText: '继续推荐至其他楼盘',
              type: 'warning'
            }
          ).catch(() => {
            this.toRecommend(2, item)
          })
        })
    },
    toRecommend(type, item) {
      const query = {
        cstName: item.clientName,
        mobileNo: item.phone,
        certNo: item.clientIdCard
      }
      // type: 1本楼盘 2其他楼盘
      if (type === 1) {
        query.city = item.cityId
        query.intentionBuilding = item.clientBuildingId
      }
      this.$router.push({
        name: 'recommend',
        query
      })
    },
    transferHandler(item) {
      this.transferDialogVisible = true
      this.detail = item
    },
    delHandler(id) {
      let ids = []
      if (id) {
        ids = [id]
      } else {
        ids = this.list.map((item) => item.recommendId)
      }
      const tips = !id ? '确定要清空推荐列表记录？' : '确定要删除该条推荐记录？'
      this.$confirm(tips, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store
          .dispatch('modules/broker/apiDelRecommend', { recommendId: ids })
          .then((res) => {
            if (id) {
              const index = this.list.findIndex(
                (item) => item.recommendId === id
              )
              this.list.splice(index, 1)
            } else {
              this.list = []
            }
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.client-top {
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
  .title-wrap {
    padding: 0 29px 0 29px;
    height: 63px;
    line-height: 63px;
    border-bottom: 1px #ebebec solid;
    .title {
      font-size: 20px;
    }
  }
  .client-select {
    height: 82px;
    padding: 0 0 0 32px;
    line-height: 82px;
    overflow: hidden;
    font-size: 0;
  }
}

.del-bar {
  color: #44444f;
  padding: 10px 0 20px;
  em {
    color: #e62e37;
  }
  .btn {
    cursor: pointer;
    background-color: initial;
    color: #e62e37;
  }
}

.client-info {
  background: #ffffff;
  min-height: 361px;
  padding: 0 32px 26px;
  border-radius: 8px;
  overflow: hidden;
  .title-wrap {
    display: block;
    margin-bottom: 14px;
    border-bottom: 4px #f9f9f9 solid;
    height: 54px;
    line-height: 54px;
    font-size: 16px;
    color: #afafaf;
    box-sizing: content-box;

    li {
      display: block;
      float: left;
      margin-right: 58px;
      border-bottom: 4px #f9f9f9 solid;
      a {
        line-height: 54px;
        width: 100%;
        height: 100%;
        display: inline-block;
        color: #afafaf;
      }
      &.on {
        border-bottom: 4px #e62e37 solid;
        a {
          color: #e62e37;
        }
      }
    }
  }
  .info-data {
    .el-table {
      min-height: 245px;
      margin-bottom: 26px;
    }
  }
}

// 客户信息弹窗
.boxclient-infowrap {
  padding: 0 32px;
  .boxclient-title {
    height: 32px;
    margin: 16px 0 24px;
    font-size: 20px;
    color: rgba(68, 68, 79, 1);
    line-height: 34px;
  }
  .clientname {
    font-size: 24px;
    margin-right: 8px;
  }
  .clientimg {
    width: 86px;
    height: 22px;
    margin-left: 16px;
  }

  .boxclient-info {
    display: block;
    overflow: hidden;
    margin-bottom: 24px;
    li {
      display: block;
      margin-bottom: 14px;
      margin-right: 22px;
      float: left;
      width: 210px;
      height: 22px;
      overflow: hidden;
      font-size: 16px;
      font-weight: 400;
      color: #44444f;
      line-height: 22px;

      .label-left {
        color: #838288;
        margin-right: 12px;
        display: inline-block;
        &.justify {
          min-width: 96px;
          text-align-last: justify;
          text-align: justify;
          text-justify: distribute-all-lines;
        }
      }
    }
  }

  .boxclient-flow {
    width: 100%;
    height: 224px;
    background: #fdfdfd;
    border-radius: 8px;
    border: 1px solid #ebebec;
    .boxflow-wrap {
      margin-left: 60px;
      margin-top: 16px;
      height: 24px;
      display: block;
      margin-bottom: 5px;
      li {
        display: block;
        width: 184px;
        height: 24px;
        float: left;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          position: absolute;
          right: 0;
          top: 50%;
          background: #dfdee3;
        }
        &::after {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          position: absolute;
          right: -12px;
          top: 6px;
          border: 2px #bebdc4 solid;
          background: #ffffff;
          border-radius: 50%;
          z-index: 5;
        }

        &.one {
          width: 24px;
          &::before {
            content: none;
          }
        }
      }
    }

    .boxflow-info {
      display: block;
      overflow: hidden;
      padding-left: 32px;
      li {
        display: block;
        float: left;
        width: 140px;
        font-size: 14px;
        font-weight: 400;
        color: #44444f;
        line-height: 20px;
        &.first {
          margin-right: 66px;
        }
        &.second {
          margin-right: 50px;
        }
        &.third {
          margin-right: 44px;
        }
        &.fouth {
          width: 75px;
          margin-right: 0;
        }
        .info-title {
          font-size: 20px;
          height: 28px;
          line-height: 28px;
          margin-bottom: 16px;
          color: #838288;
        }
        .info-time {
          margin-bottom: 4px;
        }
        .info-remark {
          color: #838288;
          margin-bottom: 4px;
        }
        .remark {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    // 流程交互
    &.one {
      li.one {
        &::before {
          background: #e62e37;
        }
        &::after {
          content: '';
          display: block;
          width: 24px;
          height: 24px;
          right: -12px;
          top: 0;
          background: url(~@/assets/img/account/vip/icon_setp.png) transparent;
          border: none;
          border-radius: 50%;
          z-index: 5;
        }
      }
      .first {
        .info-title {
          color: #e62e37;
        }
      }
    }
    &.two {
      li.one,
      li.two {
        &::before {
          background: #e62e37;
        }
        &::after {
          content: '';
          display: block;
          width: 24px;
          height: 24px;
          right: -12px;
          top: 0;
          background: url(~@/assets/img/account/vip/icon_setp.png) transparent;
          border: none;
          border-radius: 50%;
          z-index: 5;
        }
      }
      .first,
      .second {
        .info-title {
          color: #e62e37;
        }
      }
    }
    &.three {
      li.one,
      li.two,
      li.three {
        &::before {
          background: #e62e37;
        }
        &::after {
          content: '';
          display: block;
          width: 24px;
          height: 24px;
          right: -12px;
          top: 0;
          background: url(~@/assets/img/account/vip/icon_setp.png) transparent;
          border: none;
          border-radius: 50%;
          z-index: 5;
        }
        .info-title {
          color: #e62e37;
          &::after {
            content: none;
          }
        }
      }
      .first,
      .second,
      .third {
        .info-title {
          color: #e62e37;
        }
      }
    }
    &.four {
      li.one,
      li.two,
      li.three,
      li.four {
        &::before {
          background: #e62e37;
        }
        &::after {
          content: '';
          display: block;
          width: 24px;
          height: 24px;
          right: -12px;
          top: 0;
          background: url(~@/assets/img/account/vip/icon_setp.png) transparent;
          border: none;
          border-radius: 50%;
          z-index: 5;
        }
      }
      .first,
      .second,
      .third,
      .fouth {
        .info-title {
          color: #e62e37;
        }
      }
    }
  }
}
.boxclient-foot {
  padding: 24px 32px;
  text-align: right;
  box-sizing: border-box;
  .left-tips {
    float: left;
    line-height: 44px;
    font-size: 14px;

    color: rgba(169, 168, 174, 1);
  }
  .el-button {
    min-width: 96px;
    height: 44px;
    border-radius: 6px;
    border: 1px solid rgba(169, 168, 174, 1);
    &:hover {
      color: #606266;
    }
    &.el-button--danger {
      width: 130px;
      height: 44px;
      border-color: #e62e37;
      &:hover {
        color: #ffffff;
      }
    }
  }
}

// 组件样式调整
/deep/.el-form--inline .el-form-item__content {
  vertical-align: middle;
}

// 表格组件样式
/deep/.el-table td {
  padding: 8px 0;
  border: none;
  font-size: 14px;
  color: #44444f;
  white-space: nowrap;
  .cell {
    white-space: nowrap;
    overflow: visible;
  }
}
/deep/.el-table th.is-leaf {
  padding: 8px 0;
  border: none;
  background: #f9f9f9;
  color: #44444f;
  font-weight: bold;
  white-space: nowrap;
  .cell {
    white-space: nowrap;
    overflow: visible;
  }
}
/deep/.el-table__header-wrapper {
  margin-bottom: 14px;
}

/deep/.el-table::before {
  content: '';
  border: none;
  background: transparent;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #e62e37;
  border: 1px solid #e62e37;
  color: #ffffff;
}
/deep/.el-pagination.is-background .el-pager li:hover {
  color: #e62e37;
}
/deep/.el-pagination.is-background .el-pager li,
/deep/.el-pagination.is-background .btn-next,
/deep/.el-pagination.is-background .btn-prev {
  margin: 0 5px;
  background-color: #ffffff;
  color: #606266;
  min-width: 30px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 100;
  border: 1px solid #d9d9d9;
}

/deep/.el-pagination .el-input--mini .el-input__inner,
/deep/.el-pagination button,
/deep/.el-pagination span:not([class*='suffix']),
/deep/.el-pagination__editor.el-input .el-input__inner,
/deep/.el-pagination__editor {
  height: 32px;
  line-height: 32px;
}
/deep/.el-select .el-input.is-focus .el-input__inner {
  border: 1px solid #cfcfd4;
}
/deep/.el-pagination__sizes .el-input .el-input__inner:hover {
  border: 1px solid #cfcfd4;
}
/deep/.el-input.is-active .el-input__inner,
/deep/.el-input__inner {
  border: 1px solid #cfcfd4;
}
/deep/.el-input__inner:focus {
  border: 1px solid #cfcfd4;
}

// 组件样式  form 定位
/deep/.demo-ruleForm {
  margin-bottom: 32px;
}

.btn-reference {
  display: inline-block;
}
</style>

<style lang="less">
// 组件 弹窗头部样式重置
.el-dialog__header {
  padding: 0 0 0 32px;
  height: 64px;
  color: #44444f;
  border-bottom: 1px solid #ebebec;
  .el-dialog__title {
    font-size: 24px;
    line-height: 64px;
  }
}
.client {
  margin-right: 28px !important;
  .el-form-item__content {
    width: 200px;
    height: 40px;
    line-height: 40px;
  }
  .el-form-item__label {
    padding: 0;
    white-space: nowrap;
    margin-right: 10px;
  }
}
.recommetd {
  margin-right: 12px !important;
  .el-form-item__content {
    width: 112px;
  }
}
.chouse-time {
  margin-right: 18px !important;
  .el-form-item__content {
    width: 260px;
  }
  .line {
    text-align: center;
  }
}
.chenck-btn {
  font-size: 0;

  .el-form-item__content {
    .el-button {
      width: 112px;
    }
    .rest-btn {
      margin-left: 20px;

      font-size: 14px;
      color: #a8a9ae;
      i {
        width: 12px;
        height: 12px;
        margin-right: 3px;
        vertical-align: -13px;
      }
    }
  }
}
.el-button--text {
  color: #2660b1;
}
.el-table_1_column_1 {
  .el-button--text {
    text-decoration: underline;
  }
  .icon-prolong {
    width: 16px;
    height: 17px;
    vertical-align: 3px;
    margin-right: 3px;
  }
}
</style>
