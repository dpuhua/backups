<template>
  <div class="header-menu">
    <div class="center-layout">
      <p class="head-left-wrap">
        <a href="/">首页</a>
        <a href="/building">全部楼盘</a>
      </p>
      <p class="head-right-wrap">
        <a href="javascript:void(0)">下载APP</a>
        <a href="/broker">会员专区</a>
        <a href="/appoint">意向登记</a>
        <a href="/user/realName">个人中心</a>
        <span v-if="isLogin" class="on-login">
          <i> <img :src="avatar" alt /> </i> {{ desPhone
          }}<a href="javascript:void(0)" @click="handleLogout">退出</a>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['isLogin', 'desPhone', 'avatar'])
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('modules/user/apiLogout')
    }
  }
}
</script>

<style lang="less" scoped>
//头部颜色抽离
@headercolor: #f7f7f7;
@bordercolor: #e4e4e4;
@headertextcolor: #44444f;
@headertexthover: #e62e37;

// 顶部菜单栏
.header-menu {
  width: 100%;
  height: 52px;
  background-color: @headercolor;
  border-bottom: 1px solid @bordercolor;
  box-sizing: content-box;
  font-size: 16px;

  line-height: 52px;
  a {
    display: inline-block;
    height: 52px;
    line-height: 52px;
    color: @headertextcolor;
    &:hover {
      color: @headertexthover;
    }
  }
  .head-left-wrap {
    float: left;
    a {
      margin-right: 40px;
    }
  }
  .head-right-wrap {
    float: right;
    a {
      margin-left: 40px;
    }
    .on-login {
      vertical-align: middle;
      margin-left: 35px;
      color: #44444f;
      i {
        display: inline-block;
        width: 22px;
        height: 22px;
        vertical-align: -14px;
        margin-right: 6px;
        img {
          width: 100%;
          vertical-align: top;
        }
      }
      a {
        margin-left: 8px;
      }
    }
  }
}
</style>
