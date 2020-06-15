<template>
  <div class="fc-footer">
    <div class="foot-top center-layout">
      <div class="dcode-wrap">
        <img
          class="dcode-img"
          src="~@/assets/img/global/fllow_hdb.png"
          alt="关注恒大宝"
        />
        <p class="dcode-title">公众号</p>
        <p>扫描二维码</p>
        <p>关注恒大宝官方公众号</p>
      </div>
      <div class="dcode-wrap">
        <img
          class="dcode-img"
          src="~@/assets/img/global/flos_decode.png"
          alt="微信扫码"
        />
        <p class="dcode-title">小程序</p>
        <p>微信扫码</p>
        <p>进入恒大宝小程序</p>
      </div>
      <div class="dcode-wrap">
        <img
          class="dcode-img"
          src="~@/assets/img/global/dcode.png"
          alt="扫码或在应用市场下载"
        />
        <p class="dcode-title">APP下载</p>
        <p>扫描二维码</p>
        <p>下载恒大宝APP</p>
      </div>
    </div>
    <div class="foot-bottom center-layout">
      <p>
        恒大集团有限公司©版权所有 Evergrande Group 备案号：粤ICP09102163号
        <a href>友情链接：恒大集团官网</a>
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
@footercolor: #f9f9f9;
@footertextcolor: #989ca3;

.center-layout {
  width: 1207px;
  margin: 0 auto;
}
.fc-footer {
  background: @footercolor;
  height: 234px;
}
.foot-top {
  height: 128px;
  padding-top: 29px;
  overflow: hidden;
  .dcode-wrap {
    width: 300px;
    float: left;
    font-size: 16px;
    margin: 0 50px;
    color: @footertextcolor;

    .dcode-img {
      display: block;
      float: left;
      margin-right: 15px;
      width: 100px;
      height: 100px;
      border-radius: 10px;
    }
    .dcode-title {
      color: rgba(68, 68, 79, 1);
      font-size: 18px;
      margin: 16px 0 2px 0;
      font-weight: 500;
    }
  }
}

.foot-bottom {
  height: 74px;
  line-height: 74px;
  text-align: center;
  color: @footertextcolor;
  border-top: 1px solid #c6c8ca;
  a {
    margin-left: 15px;
    color: rgba(68, 68, 79, 1);
  }
}
</style>
