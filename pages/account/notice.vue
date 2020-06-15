<template>
  <div class="notice-pages">
    <div class="hd">
      <h2>{{ title }}</h2>
    </div>
    <privacy-policy v-if="noticeType === 0"></privacy-policy>
    <service-terms v-else-if="noticeType === 1"></service-terms>
    <sales-notice v-else-if="noticeType === 2"></sales-notice>
  </div>
</template>

<script>
import ServiceTerms from '@/components/notice/service-terms'
import PrivacyPolicy from '@/components/notice/privacy-policy'
import salesNotice from '@/components/notice/sales-notice'
export default {
  components: {
    ServiceTerms,
    PrivacyPolicy,
    salesNotice
  },
  data() {
    return {
      noticeType: 0,
      title: ''
    }
  },
  mounted() {
    this.noticeType = +this.$route.query.type
    switch (this.noticeType) {
      case 0:
        this.title = '恒大统一用户中心用户服务协议'
        break
      case 1:
        this.title = '恒大统一用户中心隐私政策'
        break
      case 2:
        this.title = '恒大宝会员推荐购房须知'
        break
    }
  }
}
</script>

<style lang="less" scoped>
.notice-pages {
  width: 1200px;
  margin: 0 auto;
  padding: 60px 0;

  h2 {
    margin-bottom: 40px;
    padding-bottom: 54px;
    font-size: 44px;
    font-weight: bold;
    color: rgba(68, 68, 79, 1);
    line-height: 44px;
    text-align: center;
    border-bottom: solid 1px rgba(226, 226, 226, 1);
  }
}
</style>
