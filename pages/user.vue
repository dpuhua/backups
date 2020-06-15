/* 实名认证信息 */
<template>
  <div>
    <LogoBar title="个人中心">
      <a class="btn btn-recommend" href="/recommend">立即推荐</a>
    </LogoBar>

    <div class="content">
      <div class="center-layout">
        <!-- 侧边栏组件 -->
        <SideBar :menus="menuConfig"></SideBar>
        <!-- 侧边栏组件 -->
        <div class="cont-min">
          <ul class="min-tab">
            <li
              v-for="item in menus"
              :key="item.path"
              :class="{
                on: item.path.toLowerCase() === currentPath.toLowerCase()
              }"
              @click="currentPath = item.path"
            >
              <nuxt-link :to="item.path">{{ item.name }}</nuxt-link>
            </li>
          </ul>
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
      currentPath: '',
      menus: [
        {
          name: '实名认证信息',
          path: '/user/realName'
        },
        {
          name: '修改手机号',
          path: '/user/updateMobile'
        },
        {
          name: '修改密码',
          path: '/user/updatePassword'
        }
      ],
      menuConfig: [
        {
          url: '/user/realName',
          title: '个人设置'
        }
      ]
    }
  },
  mounted() {
    const path = this.$route.fullPath
    if (path === '/user' || path === '/user/') {
      this.$router.push('/user/realName')
      return
    }
    this.currentPath = this.$route.fullPath
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
  width: 842px;
  margin-left: 291px;
  min-height: 566px;
  padding: 0 32px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  .min-tab {
    display: block;
    height: 58px;
    border-bottom: 4px solid #f9f9f9;
    box-sizing: content-box;
    li {
      display: block;
      float: left;
      margin-right: 40px;
      font-size: 16px;
      color: #a9a8ae;
      line-height: 58px;
      border-bottom: 4px solid #f9f9f9;
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: #a9a8ae;
      }
      &.on {
        border-bottom: 4px solid #e62e37;
        a {
          color: #e62e37;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
