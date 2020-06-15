<template>
  <div>
    <LogoBar>
      <SearchBar></SearchBar>
    </LogoBar>
    <div class="sale">
      <div class="center-layout">
        <p class="border-bottom"></p>
        <section class="sale_cur">
          <nav>恒大宝 &#62;<span class="cur">深圳</span></nav>
        </section>
        <div class="sale-container">
          <div class="houseType">
            <el-tabs type="border-card" @tab-click="changeProduceType">
              <el-tab-pane
                v-for="(item, index) in tabList"
                :key="index"
                :label="item"
              ></el-tab-pane>
            </el-tabs>
            <div class="sale-phone">
              <p class="sale-tips" @click="showNotice">公告</p>
              <p>咨询热线：0755-88888888</p>
            </div>
          </div>
          <div class="screening">
            <div class="screening-top">
              <p
                class="scr-default"
                :class="[tarbarData.sortType == 10 ? 'iconRed' : '']"
                @click="otherChange({ sortType: 10 })"
              >
                默认排序
              </p>
              <div class="store-select" @click="floorSort">
                <div class="updown">
                  <i
                    class="el-icon-caret-top"
                    :class="{ iconRed: tarbarData.sortType == 30 }"
                  ></i>
                  <i
                    class="el-icon-caret-bottom"
                    :class="{ iconRed: tarbarData.sortType == 31 }"
                  ></i>
                </div>
                <p
                  class="sale-floor"
                  :class="[
                    tarbarData.sortType == 30 || tarbarData.sortType == 31
                      ? 'iconRed'
                      : ''
                  ]"
                >
                  楼层
                </p>
              </div>
              <div class="store-select" @click="saleTotalSort">
                <div class="updown">
                  <i
                    class="el-icon-caret-top"
                    :class="[tarbarData.sortType == 34 ? 'iconRed' : '']"
                  ></i>
                  <i
                    class="el-icon-caret-bottom"
                    :class="[tarbarData.sortType == 35 ? 'iconRed' : '']"
                  ></i>
                </div>
                <p
                  class="sale-total"
                  :class="[
                    tarbarData.sortType == 34 || tarbarData.sortType == 35
                      ? 'iconRed'
                      : ''
                  ]"
                >
                  总价
                </p>
              </div>
              <div class="store-select" @click="saleUnitSort">
                <div class="updown">
                  <i
                    class="el-icon-caret-top"
                    :class="[tarbarData.sortType == 32 ? 'iconRed' : '']"
                  ></i>
                  <i
                    class="el-icon-caret-bottom"
                    :class="[tarbarData.sortType == 33 ? 'iconRed' : '']"
                  ></i>
                </div>
                <p
                  class="sale-unit"
                  :class="[
                    tarbarData.sortType == 32 || tarbarData.sortType == 33
                      ? 'iconRed'
                      : ''
                  ]"
                >
                  单价
                </p>
              </div>
              <p
                class="src-total"
                :class="{
                  iconRed: beginTotal.length != '' || endTotal.length != ''
                }"
              >
                总价
              </p>
              <div
                class="comfire"
                @mouseenter="comfireEnter()"
                @mouseleave="comfireLeave()"
              >
                <input type="number" class="range-total" />
                <i class="el-icon-minus"></i>
                <input type="number" class="range-total" />
                <!-- 弹出输入框 -->
                <div v-if="comfireRange" class="comfireToast">
                  <input
                    v-model="beginTotal"
                    type="number"
                    class="range-total"
                  />
                  <i class="el-icon-minus"></i>
                  <input v-model="endTotal" type="number" class="range-total" />
                  <span class="qingkong" @click="qingKong">清空</span>
                  <span class="comfireRed" @click="Csearch">确认</span>
                </div>
              </div>

              <el-checkbox v-model="tarbarData.stockStatus"
                >只看在售</el-checkbox
              >
            </div>
            <!-- 房屋类型 几房几厅 -->
            <div class="screening-bottom">
              <div class="htitle-bar">
                <span
                  :class="[tarbarData.houseTypes == '' ? 'iconRed' : '']"
                  @click="otherChange({ houseTypes: '' })"
                  >全部({{ totalCount }})</span
                >
                <span
                  v-for="(item, index) in tabHouseList"
                  :key="index"
                  :class="[tarbarData.houseTypes == item ? 'iconRed' : '']"
                  @click="otherChange({ houseTypes: item })"
                  >{{ item }}</span
                >
              </div>
            </div>
          </div>
          <!-- 无筛选数据 -->
          <div v-if="houseList.length == 0" class="no-data">
            <img src="@/assets/img/building/no_data.png" alt="" class="pic" />
            <p class="txt">
              很抱歉！没有找到您想要的楼盘，为您推荐其他类似楼盘
            </p>
          </div>
          <!-- 房子列表 -->
          <div v-else class="sale-list">
            <div class="list-left">
              <div
                v-for="(item, index) in houseList"
                :key="index"
                style="display:flex;margin-bottom:40px"
              >
                <img class="house-img" :src="item.picUrl" />
                <div class="listL-detail">
                  <div class="detail-frist detail">
                    <p class="Sdetail-title">
                      {{ item.name }}
                    </p>
                    <p class="Sdetail-square">建面约{{ item.floorArea }}㎡</p>
                  </div>
                  <div class="detail-second detail">
                    <p class="Sdetail-total">
                      <span>总价</span>
                      <span class="num-red">{{
                        item.totalPrice | NumFormat
                      }}</span>
                      <span class="font-red">万元</span>
                    </p>
                    <p class="Sdetail-price">
                      <span class="unitprice">单价</span>
                      <span class="num-red">{{ item.unitPrice }}</span>
                      <span class="font-red">元/㎡</span>
                    </p>
                  </div>
                  <div class="detail-third detail">
                    <p class="Sdetail-houseT">
                      <span class="font-gray">户型</span>
                      <span>{{ item.houseType }}</span>
                    </p>
                    <p class="Sdetail-fitment">
                      <span class="font-gray">装修</span>
                      <span>豪装</span>
                    </p>
                  </div>
                  <p
                    :class="[item.stockStatus == 1 ? 'notBuy' : 'goBuy']"
                    @click="goBuy(item.name, item.stockStatus)"
                  >
                    立即抢购
                  </p>
                </div>
              </div>
            </div>
            <!-- 热门楼盘 -->
            <Aside v-if="houseList.length != 0"></Aside>
          </div>
        </div>
        <!-- 分页器 -->
        <div v-if="houseList.length != 0" class="pages">
          <el-pagination
            :current-page="currentPage4"
            :page-sizes="[10]"
            background
            :page-size="10"
            layout="  prev, pager, sizes,jumper"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
      <!-- 公告弹框 -->
      <notice v-if="isShow" @closeNotice="closeNotice"></notice>
      <!-- 网上认购弹框 -->
      <el-dialog :visible.sync="dialogTableVisible" class="saoma-toast" center>
        <div class="saoma-content">
          <p class="saoma-title">恒大城</p>
          <p class="saoma-detail">{{ rtitle }}</p>
          <img src="~@/assets/img/global/flos_decode.png" />
          <p class="saoma-text">请使用微信扫描小程序码 <br />认购房源</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import notice from './notice/notice'
import LogoBar from '@/components/common/logo-bar'
import SearchBar from '@/components/common/search-bar'
import Aside from '@/components/building/aside'
export default {
  components: {
    notice,
    LogoBar,
    SearchBar,
    Aside
  },
  // 金额过滤器转换为万为单位
  filters: {
    NumFormat(value) {
      value = value / 10000 + '万'
      return value
    }
  },
  data() {
    return {
      totalCount: '', // 总数据
      currentPage4: 1,
      isShow: false,
      dialogTableVisible: false,
      houseStatus: '', // 是否在售
      isRed: false,
      tabList: ['高层', '洋房', '低密度产品', '公寓 | 商铺 | 写字楼'],
      tabHouseList: [
        '四房二厅一卫',
        '三房两厅两卫',
        '四房两厅两卫',
        '四房一厅两卫',
        '四房二厅两卫'
      ],
      tarbarData: {
        productType: 1, // 产品类型
        houseTypes: '', // 房屋类型几房几厅
        totalPriceRange: '', // 总价价格范围
        unitPriceRange: '', // 单价
        sortType: '', // 排序
        stockStatus: '', // 是否在售
        pageNo: 1,
        pageSize: 10,
        storeId: '230000000028'
      },
      houseList: [],
      beginTotal: '', // 总价的开始价格
      endTotal: '', // 总价的结束价格
      isActive: 0, // 默认选择的房屋类型
      saleFloor: false, // 楼层排序
      saleTotal: false, // 总价排序
      saleUnit: false, // 单价排序
      comfireRange: false, // 总价输入框
      rtitle: ''
    }
  },
  watch: {
    tarbarData: {
      handler(newValue, oldValue) {
        // console.log(newValue)

        this.getHouselist(newValue)
      },
      deep: true
    }
  },
  mounted() {
    this.getBuilding()
    this.getHouselist(this.tarbarData)
  },
  methods: {
    goBuy(item, status) {
      if (status == 0) {
        this.dialogTableVisible = true
        this.rtitle = item
      }
      if (status == 1) {
        this.dialogTableVisible = false
      }
    },
    // 总价鼠标移入移出
    comfireEnter() {
      this.comfireRange = true
      console.log(this.comfireRange)
    },
    comfireLeave() {
      this.comfireRange = false
      console.log(this.comfireRange)
    },
    // 楼层
    floorSort() {
      this.saleFloor = !this.saleFloor
      if (this.saleFloor == true) {
        this.otherChange({
          sortType: 30
        })
      } else {
        this.otherChange({
          sortType: 31
        })
      }
    },
    // 总价排序
    saleTotalSort() {
      this.saleTotal = !this.saleTotal
      if (this.saleTotal == true) {
        this.otherChange({
          sortType: 34
        })
      } else {
        this.otherChange({
          sortType: 35
        })
      }
    },
    // 单价排序
    saleUnitSort() {
      this.saleUnit = !this.saleUnit
      if (this.saleUnit == true) {
        this.otherChange({
          sortType: 32
        })
      } else {
        this.otherChange({
          sortType: 33
        })
      }
    },
    // 总价范围搜索
    Csearch() {
      if (this.endTotal.length == 0) {
        this.endTotal = ''
        this.otherChange({
          totalPriceRange: `${this.beginTotal * 10000},${-1}`
        })
      } else if (this.endTotal < this.beginTotal) {
        this.otherChange({
          totalPriceRange: `${this.beginTotal * 10000},${this.endTotal * 10000}`
        })
      } else if (this.beginTotal.length == 0) {
        this.beginTotal = ''
        this.otherChange({
          totalPriceRange: `${-1},${this.endTotal * 10000}`
        })
      } else {
        this.otherChange({
          totalPriceRange: `${this.beginTotal * 10000},${this.endTotal * 10000}`
        })
      }
    },
    qingKong() {
      this.beginTotal = ''
      this.endTotal = ''
      this.otherChange({
        totalPriceRange: ''
      })
    },
    handleSizeChange() {},
    handleCurrentChange(pageNow) {
      this.otherChange({
        pageNo: pageNow
      })
    },
    // 公告弹出层
    showNotice() {
      this.isShow = true
    },
    closeNotice() {
      this.isShow = false
    },
    // 洋房高楼低密度写字楼切换
    changeProduceType(el) {
      this.tarbarData.productType = parseInt(el.index) + 1
    },
    // 其他控制项
    otherChange(obj) {
      Object.assign(this.tarbarData, obj)
      console.log(this.tarbarData)
    },
    // 房屋列表
    getHouselist(data) {
      try {
        const params = JSON.parse(JSON.stringify(data))
        params.stockStatus = params.stockStatus ? 0 : ''
        this.$store
          .dispatch('modules/sale/queryHouseList', params)
          .then((res) => {
            this.houseList = res.data.productList
            this.totalCount = parseInt(res.data.totalCount)
          })
      } catch (error) {
        console.error(error)
      }
    },
    getBuilding() {
      try {
        const paramss = { projectGuid: '', modeType: 1 }
        this.$store
          .dispatch('modules/sale/getBuildingOpenTime', paramss)
          .then((res) => {
            // this.tabHouseList = res.data.houseTypes
            console.log(res)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '@/assets/css/global.less';
.iconRed {
  color: rgba(230, 46, 55, 1) !important;
}
.saoma-toast {
  .saoma-title {
    text-align: center;
    font-size: 28px;
    font-weight: 500;
    color: rgba(230, 46, 55, 1);
    line-height: 32px;
    margin-bottom: 8px;
  }
  .saoma-detail {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: rgba(68, 68, 79, 1);
    line-height: 28px;
    margin-bottom: 15px;
  }
  img {
    width: 278px;
    height: 261px;
  }
  .saoma-text {
    margin-top: 12px;
    margin-bottom: 9px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: rgba(68, 68, 79, 1);
    line-height: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  /deep/ .el-dialog {
    width: 460px;
    height: 506px;
    border-radius: 8px;
    padding: 0 60px;
  }
}
.no-data {
  margin-top: 105px;
  margin-bottom: 125px;
  text-align: center;
  .pic {
    display: block;
    margin: 0 auto;
    width: 142px;
  }
  .txt {
    font-size: 20px;
    font-weight: 500;
    color: rgba(68, 68, 79, 1);
    line-height: 28px;
    margin-top: 32px;
  }
}
.pages {
  padding: 69px 0px 86px 0px;
  text-align: center;
  /deep/ .el-pagination.is-background .el-pager li {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
    margin: 0 8px;
    background-color: rgba(255, 255, 255, 1);
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #e62e37 !important;
  }
  /deep/ .el-pagination__sizes .el-input .el-input__inner {
    font-size: 14px;
    height: 32px;
    line-height: 32px;
  }
  /deep/ .el-pagination__editor.el-input .el-input__inner {
    height: 32px;
  }

  /deep/ .el-pagination__jump {
    margin-left: -7px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
  /deep/ .el-pager li:hover,
  /deep/ .el-pagination button:hover {
    color: #fff !important;
    background: rgba(230, 46, 55, 1) !important;
  }
}
.border-bottom {
  width: 100%;
  height: 1px;
  background-color: #f2f2f2;
}
.sale-container {
  .comfire {
    position: relative;
  }
  .comfireToast {
    position: absolute;
    top: -14px;
    left: -12px;
    width: 203px;
    height: 87px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 22px -4px rgba(227, 227, 227, 1);
    border-radius: 6px;
    padding-top: 14px;
    padding-left: 11px;
    .comfireRed {
      margin-top: 16px;
      display: inline-block;
      width: 125px;
      height: 33px;
      background: rgba(230, 46, 55, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 33px;
      text-align: center;
    }
    .qingkong {
      margin-left: 8px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(68, 68, 79, 1);
      line-height: 20px;
      margin-right: 28px;
    }
  }
  .el-icon-caret-top {
    color: #fff;
  }
  .el-icon-caret-bottom {
    color: #fff;
  }
  .store-select:hover i {
    color: #a9a8ae;
  }
  .sale-list {
    position: relative;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    .list-left {
      // display: flex;
      .house-img {
        width: 253px;
        height: 190px;
        margin-right: 40px;
      }
      .detail {
        display: flex;
      }
      .detail-frist {
        font-size: 24px;
        font-weight: bold;
        color: rgba(68, 68, 79, 1);
        margin-bottom: 18px;
        .Sdetail-title {
          margin-right: 25px;
        }
      }
      .detail-second {
        font-weight: 400;
        color: rgba(68, 68, 79, 1);
        .Sdetail-total {
          margin-right: 31px;
        }
        span {
          font-size: 16px;
        }
        .num-red {
          font-size: 28px;
          font-weight: bold;
          font-family: Verdana-Bold, Verdana;
          color: rgba(230, 46, 55, 1);
          padding: 0 8px 0 12px;
        }
        .font-red {
          color: rgba(230, 46, 55, 1);
          font-size: 16px;
        }
      }
      .detail-third {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #44444f;
        margin-top: 8px;
        margin-bottom: 33px;
        .Sdetail-houseT {
          margin-right: 52px;
        }
        .font-gray {
          color: #a8a9ae;
          padding-right: 11px;
        }
      }
      .notBuy {
        width: 163px;
        height: 40px;
        background: #a9a8ae;
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 40px;
      }
      .goBuy {
        width: 163px;
        height: 40px;
        background: rgba(230, 46, 55, 1);
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 40px;
      }
      .goBuy:hover {
        background: rgba(211, 28, 37, 1);
      }
    }
  }
  .screening {
    height: 138px;
    background: rgba(251, 251, 251, 1);
    border: 1px solid rgba(223, 223, 223, 1);
    .screening-bottom {
      margin-left: 30px;
      height: 65px;
      display: flex;
      align-items: center;
      .num-actived {
        color: #e62e37;
      }
      span {
        margin-right: 32px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(68, 68, 79, 1);
      }
    }
    .screening-top {
      margin-left: 32px;
      display: flex;
      align-items: center;
      color: #44444f;
      font-size: 16px;
      width: 1133px;
      height: 70px;
      border-bottom: 1px solid #ebebec;
      /deep/.el-checkbox__inner {
        border: 1px solid rgba(151, 151, 151, 1);
        margin-left: 20px;
      }
      /deep/.el-checkbox__input {
        vertical-align: text-top;
        margin-top: 2px;
      }
      /deep/.el-checkbox__label {
        font-size: 16px;
        padding-left: 5px;
      }
      /deep/.el-checkbox {
        color: #44444f;
      }
      /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
        border: 1px solid #e62e37;
      }
      .scr-default {
        margin-right: 31px;
      }
      .src-total {
        margin: 0px 17px 0px 30px;
      }
      .el-icon-minus {
        font-size: 17px;
        margin: 0 5px;
      }
    }
    .range-total {
      width: 79px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(169, 168, 174, 1);
    }
    .store-select {
      margin-right: 12px;
      display: flex;
      align-items: center;
      width: 76px;
      height: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(235, 235, 236, 1);
      .updown {
        margin: 0px 8px;
        display: flex;
        flex-direction: column;
        .el-icon-caret-top {
          line-height: 0.5;
        }
        .el-icon-caret-bottom {
          line-height: 0.5;
        }
      }
    }
  }
  margin-top: 33px;
  .houseType {
    display: flex;
    justify-content: space-between;
    padding-right: 37px;
    height: 61px;
    background-color: #fbfbfb;
    border-bottom: 2px solid #e62e37;
    margin-bottom: 17px;
    .sale-phone {
      height: 62px;
      display: flex;
      align-items: center;
      color: #44444f;
      font-size: 16px;
      .sale-tips {
        text-align: center;
        text-decoration: underline;
        width: 72px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(38, 96, 177, 1);
        line-height: 22px;
      }
    }
    /deep/ .el-tabs .is-top:hover {
      color: #44444f;
    }
  }

  /deep/ .el-tabs__item {
    padding: 0 51px;
    height: 62px;
    line-height: 62px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(68, 68, 79, 1);
    background-color: #fbfbfb;
  }
  /deep/
    .el-tabs--top.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:nth-child(2) {
    padding-left: 52px;
  }
  /deep/
    .el-tabs--top.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:nth-child(3) {
    padding-left: 38px;
    padding-right: 38px;
  }
  /deep/ .el-tabs--border-card > .el-tabs__header {
    border-bottom: none;
  }
  /deep/
    .el-tabs--top.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:last-child {
    padding-right: 35px;
    padding-left: 35px;
  }
  /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #fff;
    background: rgba(230, 46, 55, 1);
    border-right-color: none;
    border-left-color: none;
  }
  .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }
}
.sale_cur {
  margin-top: 16px;
  nav {
    .sc(16px, #a2a0b4);

    .cur {
      .sc(16px, #44444f);
    }
  }
}
</style>
