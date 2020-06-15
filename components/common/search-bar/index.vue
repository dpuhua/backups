<template>
  <div ref="searchBar" class="search-bar" :class="'search-bar-' + barSize">
    <el-input
      v-model="keyword"
      class="search-input"
      placeholder="请输入楼盘名或城市名开始找房"
      prefix-icon="el-icon-search"
      @focus="getFocus"
      @keypress.enter.native="search"
    >
      <el-button slot="append" class="search-btn" @click="search"
        >开始找房</el-button
      >
      <div v-show="showList" slot="prepend" class="search-list-wrap">
        <div v-if="historyList.length > 0" class="history-wrap search-wrap">
          <div class="h-title">
            历史搜索
            <span class="right-tip" @click="clearHistory">清除</span>
          </div>
          <ul class="history-list list-wrap">
            <li
              v-for="(item, index) in historyList"
              :key="index"
              class="list-item"
            >
              {{ item }}
            </li>
            <li v-show="hotList.length > 0" class="wrap-gap"></li>
          </ul>
        </div>
        <div v-if="hotList.length > 0" class="hot-wrap search-wrap">
          <div class="h-title">
            热门搜索
            <el-button
              class="right-tip"
              :loading="hotLoading"
              @click="changeLabels"
              ><i class="el-icon-refresh-left"></i>换一换</el-button
            >
          </div>
          <ul class="hot-list list-wrap">
            <li v-for="item in hotList" :key="item.labelId" class="list-item">
              {{ item.labelName }}
            </li>
          </ul>
        </div>
      </div>
    </el-input>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    barSize: {
      type: String,
      default: 'medium' // large大，medium中等
    }
  },
  data() {
    return {
      keyword: '', // 关键字
      hotLoading: false,
      hotList: [], // 热门搜索
      historyList: [], // 历史搜索
      showList: false,
      historyKey: 'hdb-history-key',
      current: 0, // 当前页数
      pages: 0, // 总页数
      size: 5 // 每页条数
    }
  },
  watch: {
    showList(val) {
      if (val && this.hotList.length === 0) {
        this.initLabels()
      }
    }
  },
  mounted() {
    // 获取localStorage里的历史搜索数据
    const localHistorys = localStorage.getItem(this.historyKey)
    if (localHistorys) {
      this.historyList = JSON.parse(localHistorys)
    }
  },
  methods: {
    // 热门标签
    renderHotLabels(data) {
      this.pages = data.pages || 0
      this.current = data.current || 0
      if (data.records && data.records.length > 0) {
        this.hotList = data.records
      }
    },
    initLabels() {
      this.current = 0
      this.getHotLabes()
    },
    // 换一换
    changeLabels() {
      if (++this.current > this.pages) {
        this.current = 0
      }
      this.getHotLabes()
    },
    getFocus() {
      this.showList = true
      document.removeEventListener('click', this.closeListWrap)
      document.addEventListener('click', this.closeListWrap)
    },
    closeListWrap(e) {
      if (this.$refs.searchBar && !this.$refs.searchBar.contains(e.target)) {
        this.showList = false
        document.removeEventListener('click', this.closeListWrap)
      }
    },
    search() {
      if (!this.historyList.includes(this.keyword)) {
        if (this.historyList.length >= 5) {
          this.historyList.shift()
        }
        this.historyList.push(this.keyword)
        // 存入localStorage
        localStorage.setItem(this.historyKey, JSON.stringify(this.historyList))
      }
      // 前往搜索
    },
    // 清除历史搜索
    clearHistory() {
      setTimeout(() => {
        this.historyList = []
        localStorage.removeItem(this.historyKey)
      })
    },
    // 获取热门搜索标签
    async getHotLabes() {
      try {
        const params = {
          size: this.size,
          current: this.current
        }
        this.hotLoading = true
        const { data } = await this.$store.dispatch(
          'modules/prod/apiGetHotLabels',
          params
        )
        if (data && data.records) {
          this.renderHotLabels(data)
        }
      } catch {}
      this.hotLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.search-bar {
  &.search-bar-large {
    width: 1200px;
    box-shadow: 0px 7px 7px 0px rgba(230, 230, 230, 0.5);
  }
  &.search-bar-medium {
    width: 615px;
    box-shadow: none;
    height: 54px;
    line-height: 54px;
    /deep/ .search-input {
      .el-input__inner {
        height: 54px;
        line-height: 54px;
        background: #f2f2f2;
      }
      .el-input-group__prepend {
        top: 54px;
        width: calc(100% - 192px);
      }
      .el-input-group__append {
        width: 192px;
      }
    }
  }
  border-radius: 8px;
  .search-input {
    /deep/ .el-input__inner {
      height: 64px;
      line-height: 64px;
      font-size: 16px;
      padding-left: 50px;
      border: none;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    /deep/ .el-input__prefix {
      margin-left: 20px;
      transform: none !important;
    }
    /deep/ .el-input-group__append {
      width: 270px;
      font-size: 20px;
      background: #e62e37;
      border-radius: 0px 6px 6px 0px;
      color: rgba(255, 255, 255, 1);
      line-height: 28px;
      text-align: center;
      padding: 0;
      .search-btn {
        width: 100%;
        height: 64px;
        line-height: 44px;
      }
      &:hover,
      &:active {
        background-color: #d31c25;
      }
    }
    /deep/ .el-input-group__prepend {
      position: absolute;
      width: calc(100% - 270px);
      top: 64px;
      background: #fff;
      border: none;
      padding: 0;
      z-index: 99;
    }
    .h-title {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(168, 169, 174, 1);
      padding: 0 18px 0 20px;
      .right-tip {
        float: right;
        cursor: pointer;
        &.el-button {
          margin: 2px -25px 0 0;
        }
        .el-icon-refresh-left {
          margin-right: 2px;
        }
      }
    }
    .search-list-wrap {
      border: 1px solid #eee;
    }
    .hot-wrap {
      .hot-list {
        color: #e62e37;
      }
    }
    .list-wrap {
      font-size: 16px;
      font-weight: 500;
      padding: 0 14px;
      color: rgba(68, 68, 79, 1);
      .list-item {
        padding: 6px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          background-color: #fbfbfb;
        }
      }
    }
    .wrap-gap {
      height: 2px;
      background-color: #f4f7f9;
    }
    .search-wrap {
      &:first-of-type {
        .h-title {
          background: rgba(244, 247, 249, 1);
        }
      }
      &:last-of-type {
        padding-bottom: 10px;
      }
    }
  }
}
</style>
