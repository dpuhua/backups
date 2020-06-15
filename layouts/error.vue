<template>
  <div class="container">
    <div class="error-img">
      <img src="~@/assets/img/global/404.png" alt="" />
    </div>
    <p class="error-title">很抱歉</p>
    <p class="error-des">您访问的页面不存在！</p>

    <p><a href="/" class="errorbtn btn">返回首页</a></p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  head() {
    return {
      title: '404'
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  padding-bottom: 80px;
  text-align: center;
  .error-img {
    width: 254px;
    height: 254px;
    margin: 184px auto 24px;
  }
  .error-title {
    height: 50px;
    font-size: 36px;
    color: rgba(68, 68, 79, 1);
    line-height: 50px;
    margin-bottom: 10px;
  }
  .error-des {
    font-size: 28px;
    height: 64px;
    font-weight: 400;
    color: rgba(167, 167, 167, 1);
    line-height: 48px;
    margin-bottom: 4px;
  }
  .errorbtn {
    display: block;
    margin: 0 auto;
    width: 162px;
    height: 40px;
    line-height: 40px;
    background: rgba(230, 46, 55, 1);
    border-radius: 6px;
    a {
      display: block;
      width: 100%;
      font-size: 16px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
    }
  }
}
</style>
