/* 实名认证信息 */
<template>
  <div>
    <LogoBar title="会员中心">
      <a class="btn btn-recommend" href="/recommend">立即推荐</a>
    </LogoBar>
    <div class="content">
      <div class="center-layout">
        <!-- 侧边栏组件 -->
        <SideBar :menus="menuConfig"></SideBar>
        <!-- 侧边栏组件 -->
        <div class="cont-min">
          <nuxt-child></nuxt-child>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoBar from '@/components/common/logo-bar'
import SideBar from '@/components/common/sidebar'
export default {
  components: {
    LogoBar,
    SideBar
  },
  data() {
    return {
      menuConfig: [
        {
          url: '/broker',
          title: '首页'
        },
        {
          url: '/broker/rights',
          title: '我的权益'
        },
        {
          url: '/broker/brokerage',
          title: '我的佣金'
        },
        {
          url: '/broker/customer',
          title: '我的客户'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
// 页面中部内容
.content {
  width: 100%;
  padding-top: 32px;
  padding-bottom: 104px;
  background: #f6f6f6;
  overflow: hidden;
}

.cont-min {
  float: left;
  margin-left: 291px;
  width: 908px;
  min-height: 566px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
