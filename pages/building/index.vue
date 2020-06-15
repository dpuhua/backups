<template>
  <div>
    <LogoBar>
      <SearchBar></SearchBar>
    </LogoBar>
    <div class="building-list">
      <div class="bread-crumbs">
        <a href="#">恒大宝</a> &gt; <span>{{ city.cityName }}</span>
      </div>
      <div class="search-box">
        <div
          v-for="(typeName, index) in defaultTypeOrder"
          :key="index"
          class="items-box"
        >
          <div class="label">
            {{ typeName }}
          </div>
          <div class="info">
            <el-checkbox-group v-model="checkedType">
              <el-checkbox
                v-for="item in typeData[index]"
                :key="item.labelId"
                :label="item.labelId"
              >
                {{ item.labelName }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <el-collapse-transition>
          <div v-show="showMore" class="more-item-box">
            <div
              v-for="(typeName, index) in moreTypeOrder"
              :key="index"
              class="items-box"
            >
              <div class="label">
                {{ typeName }}
              </div>
              <div class="info">
                <el-checkbox-group v-model="checkedType">
                  <el-checkbox
                    v-for="item in typeData[index + 3]"
                    :key="item.labelId"
                    :label="item.labelId"
                  >
                    {{ item.labelName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-collapse-transition>
        <div class="more-box">
          <p class="more" @click="showMore = !showMore">
            <template v-if="showMore">
              收起
              <i class="el-icon-arrow-up"></i>
            </template>
            <template v-else>
              更多筛选条件
              <i class="el-icon-arrow-down"></i>
            </template>
          </p>
        </div>
      </div>

      <div class="search-result-title">
        <h2 class="title mini-title">
          为您找到<em>{{ total }}</em
          >个楼盘
          <p class="clear-options" @click="clearLabels">
            <img
              src="@/assets/img/building/icon_clear.png"
              alt=""
              class="icon"
            />
            清空条件
          </p>
        </h2>
        <div v-if="checkedTypeNames.length > 0" class="options-box">
          <div class="label">已选</div>
          <div class="option-list">
            <div
              v-for="(item, index) in checkedTypeNames"
              :key="index"
              class="option"
            >
              {{ item }}
              <i class="el-icon-close del" @click="delCheckType(index)"></i>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="buildingList.length > 0"
        v-loading="buildingLoading"
        class="list-wrap"
      >
        <template v-for="item in buildingList">
          <prod-item :key="item.prodId" :item-data="item"></prod-item>
        </template>
        <!-- 分页器 -->
        <el-pagination
          class="hd-pagination"
          align="center"
          :current-page="buildingParams.current"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="buildingParams.size"
          :total="total"
          layout="sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <div v-else v-loading="buildingLoading" class="no-data">
        <img src="@/assets/img/building/no_data.png" alt="" class="pic" />
        <p class="txt">很抱歉！没有找到您想要的楼盘，为您推荐其他类似楼盘</p>
      </div>

      <h2 class="title">为您推荐</h2>
      <div
        v-if="recommendList.length > 0 && buildingList.length === 0"
        v-loading="recommendLoading"
        class="list-wrap"
      >
        <template v-for="item in recommendList">
          <prod-item :key="item.prodId" :item-data="item"></prod-item>
        </template>
        <!-- 分页器 -->
        <el-pagination
          class="hd-pagination"
          align="center"
          :current-page="recommendParams.current"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="recommendParams.size"
          :total="recommendTotal"
          layout="sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChangeRe"
          @size-change="handleSizeChangeRe"
        >
        </el-pagination>
      </div>
      <!-- <login-box v-show="isLogin"></login-box> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoBar from '@/components/common/logo-bar'
import SearchBar from '@/components/common/search-bar'
// import loginBox from '@/components/login/index'
import ProdItem from '@/components/building/prod'

export default {
  components: {
    LogoBar,
    // loginBox,
    SearchBar,
    ProdItem
  },
  async asyncData({ store, route }) {
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    let typeList = {
      order: [],
      data: []
    }
    let checkedType = []
    // 查询条件
    let keys = route.query.key
    try {
      // 获取筛选条件
      const { data } = await store.dispatch(
        'modules/prod/apiQueryAllFilterLabel',
        {
          queryAllFilterLabel: 2
        }
      )
      // data处理
      if (data && data.length > 0) {
        typeList = data.reduce(
          (pre, item) => {
            const name = item.labelClass
            // 类型， 价格， 单价， 户型提前
            if (['类型', '价格', '单价', '户型'].includes(item.labelClass)) {
              pre.order.unshift(name)
              pre.data.unshift(item.labelInfos)
            } else {
              pre.order.push(name)
              pre.data.push(item.labelInfos)
            }
            return pre
          },
          { order: [], data: [] }
        )
      }
    } catch (error) {}
    // query查询条件处理 >>>>>>>>>>>
    try {
      if (keys) {
        keys = keys.split('_')
        checkedType = keys.map((key) => {
          try {
            if (key && key.length >= 2) {
              const letterIndex = letters.indexOf(key.substr(0, 1))
              return typeList.data[letterIndex][key.substr(1)].labelId
            } else {
              return ''
            }
          } catch {
            return ''
          }
        })
        // 去空
        checkedType = checkedType.filter((item) => item !== '')
      }
    } catch (error) {}
    // query查询条件处理 <<<<<<<<<<<

    // 获取楼盘数据 >>>>>>>>>>>>
    const params = {
      current: 1,
      currentCityCode: '',
      filterLabels: checkedType,
      size: 10
    }
    let total = 0
    let buildingList = []

    try {
      const { data } = await store.dispatch(
        'modules/prod/apiQueryAppProductListByParam',
        params
      )
      if (data) {
        total = data.total
        buildingList = data.records || []
      }
    } catch (error) {}
    // 获取楼盘数据 <<<<<<<<<<<<

    // 楼盘数据为空则获取推荐楼盘数据 >>>>>>>>>>>>
    const recommendParams = {
      current: 1,
      currentCityCode: '',
      filterLabels: checkedType,
      size: 10
    }
    let recommendTotal = 0
    let recommendList = []
    if (buildingList.length === 0) {
      try {
        const { data } = await store.dispatch(
          'modules/prod/apiRecommendBuilding',
          recommendParams
        )
        if (data) {
          recommendTotal = data.total
          recommendList = data.records || []
        }
      } catch (error) {}
    }
    // 楼盘数据为空则获取推荐楼盘数据 <<<<<<<<<<<<<<<

    return {
      typeList,
      checkedType,
      total,
      buildingList,
      recommendTotal,
      recommendList
    }
  },
  data() {
    return {
      isLogin: false,
      typeList: { order: [], data: [] },
      checkedType: [],
      buildingParams: {
        current: 1,
        currentCityCode: '',
        filterLabels: [],
        size: 10
      },
      recommendParams: {},
      buildingList: [],
      buildingLoading: false,
      recommendList: [],
      recommendLoading: false,
      total: 0,
      recommendTotal: 0,
      showMore: false,
      letters: 'abcdefghijklmnopqrstuvwxyz'
    }
  },
  computed: {
    ...mapGetters(['city']),
    typeData() {
      return this.typeList.data || []
    },
    defaultTypeOrder() {
      return this.typeList.order.slice(0, 3)
    },
    moreTypeOrder() {
      return this.typeList.order.slice(3)
    },
    // 所选择搜索条件id相对应名字
    checkedTypeNames() {
      return this.typeData
        .flat()
        .filter((item) => this.checkedType.includes(item.labelId))
        .map((item) => item.labelName)
    },
    // 浏览器中params
    urlParams() {
      return this.checkedType.reduce((pre, type) => {
        let temp = ''
        for (const i in this.typeData) {
          const index = this.typeData[i].findIndex(
            (item) => item.labelId === type
          )
          if (index >= 0) {
            temp = this.letters[i] + index.toString()
          }
        }
        return pre ? pre + '_' + temp : temp
      }, '')
    }
  },
  watch: {
    urlParams(val) {
      if (val) {
        this.$router.replace({ path: `/building`, query: { key: val } })
      } else {
        this.$router.replace({ path: '/building' })
      }
    },
    checkedType() {
      this.buildingParams.current = 1
      this.getList()
    },
    buildingList(val) {
      if (val.length === 0) {
        this.getRecommendList()
      }
    }
  },
  methods: {
    // 删除单个选择
    delCheckType(index) {
      this.checkedType.splice(index, 1)
    },
    // 清空全部选择
    clearLabels() {
      this.checkedType.splice(0)
    },
    // 切换页码
    handleCurrentChange(page) {
      this.buildingParams.current = page
      this.getList()
    },
    // 切换每页数
    handleSizeChange(size) {
      this.buildingParams.current = 1
      this.buildingParams.size = size
      this.getList()
    },
    // 切换页码-推荐列表
    handleCurrentChangeRe(page) {
      this.recommendParams.current = page
      this.getRecommendList()
    },
    // 切换每页数-推荐列表
    handleSizeChangeRe(size) {
      this.recommendParams.current = 1
      this.recommendParams.size = size
      this.getRecommendList()
    },
    // 获取楼盘列表
    async getList() {
      const params = Object.assign({}, this.buildingParams, {
        filterLabels: this.checkedType
      })
      this.buildingLoading = true
      try {
        const { data } = await this.$store.dispatch(
          'modules/prod/apiQueryAppProductListByParam',
          params
        )
        if (data) {
          this.total = data.total
          this.buildingParams.current = data.current
          this.buildingList = data.records || []
        }
      } catch {}
      this.buildingLoading = false
    },
    // 获取推荐楼盘列表
    async getRecommendList() {
      const params = Object.assign({}, this.recommendParams, {
        filterLabels: this.checkedType
      })
      this.recommendLoading = true
      try {
        const { data } = await this.$store.dispatch(
          'modules/prod/apiRecommendBuilding',
          params
        )
        if (data) {
          this.recommendTotal = data.total
          this.recommendParams.current = data.current
          this.recommendList = data.records || []
        }
      } catch {}
      this.recommendLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/global.less';

/deep/ .el-checkbox {
  margin-right: 10px;
  &__label {
    width: 80px;
    padding-left: 4px;
    font-size: 16px;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__input {
    top: -5px;
  }
}

.building-list {
  width: 1200px;
  margin: 0 auto;

  .bread-crumbs {
    margin: 16px 0;
    font-size: 16px;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;

    a {
      color: rgba(169, 168, 174, 1);
    }
  }

  .search-box {
    margin-bottom: 32px;
    padding: 16px 28px;
    background: rgba(251, 251, 251, 1);
    border: 1px solid rgba(223, 223, 223, 1);
    font-size: 16px;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;
    .more-item-box {
      margin-top: 22px;
    }
    .items-box {
      &:extend(.clearfix);

      & + .items-box {
        margin-top: 22px;
      }
    }

    .label {
      /* &:extend(.fl);*/
      &:extend(.fl);
      font-weight: bold;
      width: 72px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .info {
      margin-left: 74px;
    }

    .more-box {
      margin-top: 20px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      position: sticky;
      bottom: 0;
      background: #fbfbfb;
      z-index: 1;

      .more {
        display: inline-block;
        cursor: pointer;
        color: rgba(169, 168, 174, 1);

        &:hover,
        &:active {
          color: rgba(131, 130, 136, 1);
        }
      }

      .icon {
        position: relative;
        top: 4px;
        width: 20px;
      }
    }
  }

  h2.title {
    height: 50px;
    margin-bottom: 40px;
    padding-bottom: 8px;
    font-size: 28px;
    color: rgba(68, 68, 79, 1);
    line-height: 40px;
    font-weight: bold;
    border-bottom: 1px solid #ebebec;
  }

  .search-result-title {
    .title {
      margin-bottom: 22px;

      em {
        margin: 0 10px;
        font-weight: bold;
        color: rgba(230, 46, 55, 1);
      }
    }

    .clear-options {
      &:extend(.fr);
      font-size: 20px;
      color: rgba(68, 68, 79, 1);
      line-height: 28px;
      cursor: pointer;
      font-weight: normal;
      margin-top: 8px;
      .icon {
        position: relative;
        top: 6px;
        width: 24px;
        height: 24px;
        margin-right: 2px;
      }
    }

    .options-box {
      display: flex;
      margin-bottom: 48px;
      line-height: 38px;

      .label {
        width: 50px;
        font-size: 16px;
        color: rgba(169, 168, 174, 1);
      }
      .option-list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .option {
          position: relative;
          margin-right: 16px;
          padding: 0 40px 0 16px;
          background: #fbfbfb;
          border: 1px solid #dfdfdf;
          line-height: 36px;
          white-space: nowrap;
          margin-bottom: 15px;
          &:hover {
            background: #f4f4f4;
          }
        }
      }

      .del {
        position: absolute;
        top: 10px;
        right: 14px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: #454550;
      }
    }
  }
  .list-wrap {
    padding-bottom: 20px;
    /deep/ .el-loading-spinner {
      top: 200px;
    }
  }

  .no-data {
    margin-bottom: 40px;

    .pic {
      display: block;
      width: 142px;
      margin: 0 auto 32px;
    }

    .txt {
      font-size: 20px;
      font-weight: bold;
      color: rgba(68, 68, 79, 1);
      line-height: 28px;
      text-align: center;
    }
  }
}
</style>
