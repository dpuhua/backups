/* 我的佣金 */
<template>
  <div>
    <!-- 头部区域 -->
    <div class="vip-info-wrap">
      <div class="title-wrap">
        <h3 class="title">我的佣金</h3>
        <a class="r-link" href>查看明细 &gt;</a>
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

    <!-- 佣金明细部分 -->
    <div class="client-info">
      <ul class="title-wrap">
        <li
          v-for="item in tabs"
          :key="item.status"
          :class="{ on: item.status === status }"
          @click="onSelect(item.status)"
        >
          <span>{{ item.text }}</span>
        </li>
      </ul>
      <div class="info-data">
        <!-- 表格 -->
        <el-table
          v-loading="loading"
          :data="list"
          style="width: 100%"
          empty-text="暂无佣金数据，快去推荐赚佣金吧"
        >
          <el-table-column
            align="center"
            prop="clientName"
            label="被推荐人"
            width="108"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="buildingName"
            label="认购项目"
            width="162"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="subscribeTime"
            label="认购时间"
            width="160"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="amount"
            label="成交金额(元)"
            width="150"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="propertyVoucher"
            label="赠送物业券码"
            width="158"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="brokerageAmount"
            label="佣金奖励"
            width="106"
          ></el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
          v-if="list.length"
          background
          align="center"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="  prev, pager, next, sizes,jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      brokerageNum: {},
      status: 0,
      tabs: [
        { status: 0, text: '待发佣金明细' },
        { status: 1, text: '已发佣金明细' }
      ],
      list: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      loading: false
    }
  },
  mounted() {
    this.getCount()
    this.getList()
  },
  methods: {
    getCount() {
      this.$store.dispatch('modules/broker/apiBrokerageNum').then((res) => {
        if (res.data) {
          this.brokerageNum = res.data
        }
      })
    },
    getList() {
      const params = {
        type: this.status,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      this.loading = true
      this.$store
        .dispatch('modules/broker/apiBrokeragePage', params)
        .then((res) => {
          const data = res.data || {}
          if (data) {
            this.list = data.records || []
            this.total = data.total || 0
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getList()
    },
    onSelect(status) {
      this.status = status
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
// 会员中心部分

.vip-info-wrap {
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
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

// 佣金明细
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
      span {
        line-height: 54px;
        width: 100%;
        height: 100%;
        display: inline-block;
        color: #afafaf;
        cursor: pointer;
      }
      &.on {
        border-bottom: 4px #e62e37 solid;
        span {
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
  // background: #f9f9f9;
  color: #44444f;
  font-weight: bold;
  white-space: nowrap;
  .cell {
    white-space: nowrap;
    overflow: visible;
  }
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
</style>
<style lang="less">
// 分页器 样式
.el-select-dropdown__item.selected {
  color: #44444f;
  font-weight: 700;
}
.el-date-table td.today span,
.el-date-table td.available:hover {
  color: #44444f;
}
.el-date-table td.current:not(.disabled) span {
  background-color: #e62e37;
}
.el-date-table th {
  text-align: center;
}
</style>
