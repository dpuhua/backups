<template>
  <div class="pages">
    <h2 class="title">账号升级</h2>
    <p class="sub-title">
      点击“同意升级账号”前，您需要通过勾选“我已阅读并同意”的形式在线签署《恒大统一用户中心用户服务协议》和《恒大统一用户中心隐私政策》，请您务必仔细阅读、充分理解条款内容后再进行账号升级。
    </p>

    <div class="nav-tabs">
      <div
        v-for="(item, index) in navList"
        :key="index"
        :class="{ active: selectIndex === index }"
        class="nav"
        @click="selectIndex = index"
      >
        {{ item.name }}
      </div>
    </div>

    <service-terms v-if="selectIndex === 0"></service-terms>
    <privacy-policy v-else></privacy-policy>

    <div class="btn-box">
      <div class="note">
        <el-checkbox v-model="agree">
          我已阅读并同意
          <span class="link">《恒大统一用户中心用户服务协议》</span>
          和
          <span class="link">《恒大统一用户中心隐私政策》</span>
        </el-checkbox>
      </div>
      <el-button class="submit-btn" type="danger">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import ServiceTerms from '@/components/notice/service-terms'
import PrivacyPolicy from '@/components/notice/privacy-policy'

export default {
  components: {
    ServiceTerms,
    PrivacyPolicy
  },
  data() {
    return {
      selectIndex: 0,
      navList: [
        { name: '恒大统一用户中心用户服务协议' },
        { name: '恒大统一用户中心隐私政策' }
      ],
      agree: false
    }
  },
  methods: {
    selectUser(index) {
      this.selectIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/global.less';

.pages {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
  font-size: 16px;
  line-height: 22px;
  color: rgba(68, 68, 79, 1);

  .title {
    margin-bottom: 28px;
    font-size: 28px;
    font-weight: bold;
    color: rgba(230, 46, 55, 1);
    line-height: 32px;
  }

  .sub-title {
    margin-bottom: 45px;
  }

  .nav-tabs {
    height: 46px;
    margin-bottom: 30px;
    border-bottom: solid 1px #ebebec;
    font-size: 20px;
    font-weight: bold;
    line-height: 28px;
  }

  .nav {
    position: relative;
    height: 46px;
    &:extend(.fl);
    margin-right: 52px;
    color: rgba(169, 168, 174, 1);
    cursor: pointer;

    &:hover {
      color: rgba(131, 130, 136, 1);
    }

    &.active {
      color: rgba(68, 68, 79, 1);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 5px;
        background-color: rgba(230, 46, 55, 1);
      }
    }
  }

  .notice-box {
    .blod {
      font-weight: bold;
    }

    .content-text,
    .art,
    footer,
    .mt20 {
      margin-top: 20px;
    }
  }

  .btn-box {
    margin-top: 30px;

    .note {
      margin-bottom: 16px;
      text-align: center;
    }

    .link {
      color: rgba(230, 46, 55, 1);
    }

    .submit-btn {
      display: block;
      width: 390px;
      height: 64px;
      margin: 0 auto;
      box-shadow: 0px 9px 12px -4px rgba(255, 210, 212, 1);
      border-radius: 6px;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
