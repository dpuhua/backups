<template>
  <div class="home-wrap">
    <div class="banner">
      <video src="~@/assets/video/banner.mp4" autoplay loop muted></video>
    </div>
    <div class="main">
      <search-bar
        ref="searchBar"
        class="home-search"
        bar-size="large"
      ></search-bar>
      <transition name="el-zoom-in-top">
        <quick-navbar v-show="quickNav" class="transition-box"></quick-navbar>
      </transition>
      <ul class="brand-wrap">
        <li class="brand-item">
          <span class="brand-img-box">
            <img
              class="img-default"
              src="~@/assets/img/home/kanfang.png"
              alt="VR实景看房"
            />
            <img
              class="img-checked"
              src="~@/assets/img/home/kanfang_checked.png"
              alt="VR实景看房"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">VR实景看房</div>
            <span class="brand-text">全景视野，足不出户，品鉴好房</span>
          </div>
        </li>
        <li class="brand-item">
          <span class="brand-img-box">
            <img
              class="img-default"
              src="~@/assets/img/home/xuanfang.png"
              alt="在线选房"
            />
            <img
              class="img-checked"
              src="~@/assets/img/home/xuanfang_checked.png"
              alt="在线选房"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">在线选房</div>
            <span class="brand-text">全国海量房源任意挑选</span>
          </div>
        </li>
        <li class="brand-item">
          <span class="brand-img-box">
            <img
              class="img-default"
              src="~@/assets/img/home/yifangyijia.png"
              alt="一房一价"
            />
            <img
              class="img-checked"
              src="~@/assets/img/home/yifangyijia_checked.png"
              alt="一房一价"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">一房一价</div>
            <span class="brand-text">房源透明，价格透明，保障客户权益</span>
          </div>
        </li>
        <li class="brand-item">
          <span class="brand-img-box">
            <img
              class="img-default"
              src="~@/assets/img/home/yijianrengou.png"
              alt="一键认购"
            />
            <img
              class="img-checked"
              src="~@/assets/img/home/yijianrengou_checked.png"
              alt="一键认购"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">一键认购</div>
            <span class="brand-text">网上买房，一键下单，轻松锁定好房源</span>
          </div>
        </li>
        <li class="brand-item">
          <span class="brand-img-box">
            <img
              class="img-default"
              src="~@/assets/img/home/fuwu.png"
              alt="专属服务"
            />
            <img
              class="img-checked"
              src="~@/assets/img/home/fuwu_checked.png"
              alt="专属服务"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">专属服务</div>
            <span class="brand-text">专属销售人员在线服务</span>
          </div>
        </li>
      </ul>
      <el-row class="prod-list" :gutter="58">
        <el-col :span="24" class="prod-item-head">
          <span class="prod-list-title">楼盘</span>
          <nuxt-link class="prod-list-more" to="/">更多</nuxt-link>
        </el-col>
        <el-col
          v-for="(item, index) in buildingList"
          :key="index"
          :span="6"
          class="prod-item-box"
        >
          <prod-item :item-data="item"></prod-item>
        </el-col>
      </el-row>
      <ul class="brand-wrap">
        <li class="brand-item brand-footer">
          <span class="brand-img-box">
            <img
              src="~@/assets/img/home/protect_icon.png"
              alt="世界500强 实力保障"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">世界500强 实力保障</div>
            <span class="brand-text"
              >恒大23年地产匠心运营<br />
              回归人们美好生活的诉求</span
            >
          </div>
        </li>
        <li class="brand-item brand-footer">
          <span class="brand-img-box">
            <img
              src="~@/assets/img/home/garden_icon.png"
              alt="园林环境 优美舒适"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">园林环境 优美舒适</div>
            <span class="brand-text">推窗见景，尽享自然风光</span>
          </div>
        </li>
        <li class="brand-item brand-footer">
          <span class="brand-img-box">
            <img
              src="~@/assets/img/home/brand_icon.png"
              alt="精装品质 满屋名牌"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">精装品质 满屋名牌</div>
            <span class="brand-text">精装满屋名牌荟萃，成就悦居生活美学</span>
          </div>
        </li>
        <li class="brand-item brand-footer">
          <span class="brand-img-box">
            <img
              src="~@/assets/img/home/accessory_icon.png"
              alt="配套设施 全能便捷"
            />
          </span>
          <div class="brand-cont">
            <div class="brand-title">配套设施 全能便捷</div>
            <span class="brand-text"
              >全能配套，满足您的精致生活和休闲惬意时光；全能便捷，一站式满足您的多重生活需求</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SearchBar from '~/components/common/search-bar'
import ProdItem from '~/components/home/common/prod-item.vue'
import quickNavbar from '~/components/home/common/quick-navbar.vue'

export default {
  components: { SearchBar, ProdItem, quickNavbar },
  props: {
    scrollChange: {
      type: Number,
      default: 0
    },
    buildingList: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      quickNav: false // 显示简易导航
    }
  },
  computed: {
    visibleBulidingList: () => this.buildingList.slice(0, 8)
  },
  watch: {
    scrollChange() {
      const el = this.$refs.searchBar.$el
      if (el && el.getBoundingClientRect) {
        this.quickNav = el.getBoundingClientRect().top <= 0
      }
    }
  }
}
</script>
<style lang="less" scoped>
// 首页
.home-wrap {
  width: 100%;
  .banner {
    width: 100%;
    background: url(~@/assets/img/home/banner.png) no-repeat center;
    background-size: cover;
    // height: 460px;
    video {
      width: 100%;
    }
  }
  .main {
    width: 1207px;
    margin: auto;
    margin-top: -30px;
    .brand-wrap {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .brand-item {
        width: 226px;
        height: 114px;
        display: flex;
        cursor: pointer;
        padding-left: 8px;
        &.brand-footer {
          width: 290px;
          height: 100px;
          .brand-img-box {
            width: 64px;
          }
          .brand-cont {
            .brand-title {
              margin-top: 30px;
            }
          }
          &:hover {
            .brand-cont {
              .brand-title {
                margin-top: 20px;
                transition: all 0.2s linear;
              }
            }
          }
        }
        .brand-img-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 72px;
          .img-checked {
            width: 240px;
            opacity: 0;
            display: none;
            transition: all 0.2s linear;
          }
        }
        .brand-cont {
          padding-right: 10px;
          padding-left: 5px;
          .brand-title {
            font-size: 19px;
            font-weight: bold;
            color: rgba(68, 68, 79, 1);
            margin-top: 40px;
            transition: all 0.2s linear;
          }
          .brand-text {
            display: block;
            margin-top: 5px;
            font-size: 11px;
            color: rgba(119, 117, 135, 1);
            opacity: 0;
            transition: all 0.2s linear;
          }
        }
        &:hover {
          box-shadow: 0px 7px 7px 0px rgba(230, 230, 230, 0.8);
          border-radius: 8px;
          .brand-img-box {
            // .img-default {
            // display: none;
            // }
            .img-checked {
              opacity: 1;
              transition: all 0.2s linear;
            }
          }

          .brand-text {
            opacity: 1;
            transition: all 0.2s linear;
          }
          .brand-title {
            margin-top: 20px;
            transition: all 0.2s linear;
          }
          transition: all 0.2s linear;
        }
      }
    }
    .prod-list {
      margin-top: 27px;
      .prod-item-head {
        .prod-list-title {
          font-size: 24px;
          font-weight: 500;
          color: rgba(68, 68, 79, 1);
        }
        .prod-list-more {
          float: right;
          font-size: 14px;
          font-weight: 400;
          color: rgba(168, 169, 174, 1);
        }
      }
      .prod-item-box {
        padding: 25px 0;
        .prod-item {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
