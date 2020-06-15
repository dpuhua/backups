<template>
  <div class="container" @scroll="onScroll">
    <el-backtop
      target=".container"
      class="home-backtop"
      :visibility-height="530"
      :right="25"
      :bottom="100"
    ></el-backtop>
    <div class="dowload-qrcode">
      <span class="dowload-title">下载恒大宝APP</span>
      <div class="qrcode-pop">
        <img src="~@/assets/img/home/hdb_qrcode_left.png" alt="恒大宝二维码" />
        <div class="qrcode-pop-text">
          <p>扫码或在应用市场</p>
          <div>
            下载
            <span class="light">恒大宝APP</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 顶部菜单 -->
    <home-navbar></home-navbar>
    <!-- 主体内容 -->
    <home-index
      :scroll-change="scrollTop"
      :building-list="buildingList"
    ></home-index>
    <!-- 底部 -->
    <hdb-footer></hdb-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeIndex from '~/components/home/index.vue'
import HomeNavbar from '~/components/home/common/navbar.vue'
import HdbFooter from '~/components/common/hdb-footer'

export default {
  layout: 'index',
  components: { HomeNavbar, HdbFooter, HomeIndex },
  async asyncData({ store }) {
    // 获取热门楼盘
    try {
      const { data } = await store.dispatch(
        'modules/prod/apiGetPopularBuildings',
        {
          cityId: store.getters.city.cityCode
        }
      )
      return {
        buildingList: data
      }
    } catch (error) {
      console.error(error)
      return {
        buildingList: []
      }
    }
  },
  data() {
    return {
      scrollTop: 0,
      debounce: null // 滚动防抖标记
    }
  },
  computed: {
    ...mapGetters({
      city: 'city'
    })
  },
  watch: {
    city() {
      this.getPopularBuildings()
    }
  },
  methods: {
    onScroll(e) {
      // 滚动时记录顶部距离，用于控制快捷导航的显示隐藏
      if (!this.debounce) {
        this.debounce = setTimeout(() => {
          this.scrollTop = e.target.scrollTop
          this.debounce = null
        }, 50)
      }
    },
    // 获取热门楼盘
    async getPopularBuildings() {
      try {
        const { data } = await this.$store.dispatch(
          'modules/prod/apiGetPopularBuildings',
          {
            cityId: this.city.cityCode
          }
        )
        if (data) {
          this.buildingList = data
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  head() {
    return {
      title: '恒大宝'
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  min-width: 1200px;
  height: 100vh;
  overflow: auto;
  .home-backtop {
    color: #44444f;
    width: 46px;
    height: 31px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(192, dsadsa 192, 192, 0.5);
    border-radius: 4px;
  }
}
.dowload-qrcode {
  position: fixed;
  top: calc(50% - 150px);
  left: 0;
  z-index: 100;
  cursor: pointer;
  .dowload-title {
    display: inline-block;
    width: 20px;
    font-size: 19px;
    font-weight: bold;
    color: #44444f;
    word-break: break-all;
    padding: 16px;
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(232, 232, 232, 1);
    margin-right: -18px;
    vertical-align: top;
    margin-top: 9px;
  }
  .qrcode-pop {
    display: none;
    position: relative;
  }
  .qrcode-pop-text {
    position: absolute;
    font-size: 19px;
    bottom: 25px;
    width: 100%;
    color: #44444f;
    text-align: center;
    line-height: 24px;
    font-weight: 500;
    .light {
      color: #e62e37;
    }
  }
  &:hover {
    .qrcode-pop {
      display: inline-block;
    }
  }
}
</style>
