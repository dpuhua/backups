<template>
  <div class="header-menu">
    <el-row class="menu-wrap">
      <el-col :span="8" class="logo-wrap">
        <img
          class="logo-img"
          src="~@/assets/img/global/logo.png"
          alt="恒大宝"
        />
        <CityChooseLink></CityChooseLink>
      </el-col>
      <el-col :span="16">
        <ul class="home-menu">
          <li class="is-active menu-item">首页</li>
          <li class="menu-item">
            <nuxt-link to="/building">全部楼盘</nuxt-link>
          </li>
          <li class="qrcode-wrap menu-item">
            下载APP
            <span class="qrcode-pop">
              <img src="~@/assets/img/home/hdb_qrcode.png" alt="恒大宝二维码" />
              <div class="qrcode-pop-text">
                <p>扫码或在应用市场</p>
                <div>下载<span class="light">恒大宝APP</span></div>
              </div>
            </span>
          </li>
          <li class="menu-item">
            <nuxt-link to="/broker">会员专区</nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/appoint">意向登记</nuxt-link>
          </li>
          <li class="menu-item">
            <template v-if="isLogin">
              {{ desPhone }}
              <a href="javascript:void(0)" @click="toLogout">退出</a>
            </template>
            <template v-else>
              <a href="javascript:void(0)" @click="toLogin">登录/注册</a>
            </template>
          </li>
        </ul>
      </el-col>
    </el-row>
    <div :span="24" class="menu-border"></div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import CityChooseLink from '@/components/common/city-choose-link'
export default {
  components: {
    CityChooseLink
  },
  data() {
    return {
      showLogin: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['isLogin', 'desPhone'])
  },
  methods: {
    toLogin() {
      this.$store.commit('layout/showAccountDialog')
    },
    loginChange(val) {
      this.showLogin = val
    },
    toLogout() {
      this.$store.dispatch('modules/user/apiLogout')
    }
  }
}
</script>
<style lang="less" scoped>
@headercolor: #fdfdfd;
@border_textcolor: #e62e37;
@linkcolor: #44444f;
// 顶部菜单栏-首页
.header-menu {
  width: 100%;
  height: 98px;
  background: @headercolor;

  font-size: 22px;

  line-height: 98px;
  .menu-wrap {
    width: 1200px;
    margin: auto;
    height: 94px;
  }
  .logo-wrap {
    .logo-img {
      vertical-align: middle;
      margin-right: 24px;
    }
  }

  .home-menu {
    border: none;
    display: flex;
    .menu-item {
      cursor: pointer;
      font-size: 22px;
      height: 94px;
      line-height: 94px;
      color: @linkcolor;
      flex-grow: 1;
      text-align: center;
      a {
        color: @linkcolor;
      }
      &.is-active {
        color: @border_textcolor;
        border-bottom: 2px solid @border_textcolor;
        font-weight: bold;
      }
      &:hover:not(.is-active) {
        background: @border_textcolor;
        color: #fff;
        a {
          color: #fff;
        }
      }
    }
  }
  .qrcode-wrap {
    position: relative;
    .qrcode-pop {
      display: none;
      position: absolute;
      top: 78px;
      left: calc(50% - 120px);
      .qrcode-pop-text {
        position: absolute;
        font-size: 19px;
        bottom: 70px;
        width: 100%;
        color: @linkcolor;
        text-align: center;
        line-height: 24px;
        font-weight: 500;
        .light {
          color: @border_textcolor;
        }
      }
    }
    &:hover .qrcode-pop {
      display: block;
    }
  }
  .menu-border {
    height: 4px;
    background: @border_textcolor;
  }
}
</style>
