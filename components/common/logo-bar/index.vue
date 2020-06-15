<template>
  <div class="header-nav">
    <div class="center-layout">
      <h2 class="logo-wrap">
        <img
          class="logo-img"
          src="~@/assets/img/global/logo.png"
          alt="恒大宝"
        />
        <span v-if="title" class="logo-text">{{ title }}</span>
        <CityChooseLink v-else></CityChooseLink>
      </h2>
      <div class="right-wrap">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CityChooseLink from '@/components/common/city-choose-link'

export default {
  components: {
    CityChooseLink
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    // isCityChoose: {
    //   type: Boolean,
    //   default: false
    // },
    cityChooseRedirect: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
// 顶部导航
.header-nav {
  width: 100%;
  height: 116px;
  border-bottom: 1px #f2f2f2 solid;
  .center-layout {
    overflow: initial;
  }
  .logo-wrap {
    float: left;
    margin: 30px 24px 0 0;
    .logo-img {
      // display: block;
      // float: left;
      width: 180px;
      height: 56px;
      vertical-align: middle;
      margin-right: 24px;
    }
    .logo-text {
      // display: block;
      // float: left;
      height: 32px;
      margin-top: 27px;
      line-height: 32px;
      font-size: 24px;
      color: rgba(68, 68, 79, 1);
    }
  }
  .right-wrap {
    float: right;
    margin: 31px 0 0 0;
    .btn-recommend {
      display: inline-block;
      width: 162px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      background-color: #ff9131;
    }
  }
}
</style>
