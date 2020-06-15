<template>
  <div class="notice">
    <div class="notice-cover"></div>
    <div class="container">
      <i class="el-icon-close" @click="close"></i>
      <p class="title">公告</p>
      <div class="font">
        优惠说明<br />
        一、房屋价格在4月30日24时前，可同时享受一下优惠，优惠后的价格请自行计算。<br />
        1、特大优惠81折； <br />
        2、恒房通推荐98折；<br />
        3、付款优惠：一次性93折、按揭95折、一年分期98折；<br />
        4、楼栋去化70%以上清尾优惠：94折或97折或99折；<br />
        二、网上认购后可换房，同样享受《商品房优惠网上认购书》的权益，须在7日内签署《商品房认购书》，最终成交价以双方签署《商品房买卖合同》为准。
        <br />
        <br />
        温馨提示
        一、写字楼价格在4月30日24时前，可同时享受一下优惠，优惠后的价格请自行计算。<br />
        1、特大优惠81折；<br />
        2、恒房通推荐98折；<br />
        二、网上认购后可换房，同样享受《商品房优惠网上认购书》的权益，须在7日内签署《商品房认购书》，最终成交价以双方签署《商品房买卖合同》为准。<br />
        网上认购说明<br />
        一、写字楼价格在4月30日24时前，可同时享受一下优惠，优惠后的价格请自行计算。<br />
        1、特大优惠81折；<br />
        2、恒房通推荐98折；<br />
      </div>
      <p class="iknew" @click="close">知道了</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {}
  },
  mounted() {
    console.log('1111')
    this.apiGetBuildingNotice()
    console.log('2222')
  },
  methods: {
    close() {
      this.$emit('closeNotice')
    },
    apiGetBuildingNotice() {
      try {
        const params = {
          buildingId: '1268730060601376770'
        }
        this.$store
          .dispatch('modules/prod/apiGetBuildingNotice', params)
          .then((res) => {
            console.log(res)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-icon-close {
  position: absolute;
  top: 29px;
  right: 42px;
}
.notice-cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990 !important;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.container {
  position: absolute;
  top: 465px;
  width: 892px;
  height: 672px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  z-index: 9999;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  .title {
    margin-top: 35px;
    margin-bottom: 32px;
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(68, 68, 79, 1);
  }
  .font {
    margin-left: 57px;
    width: 788px;
    height: 438px;
    font-size: 16px;
    text-align: left;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;
  }
  .iknew {
    margin-left: 45px;
    width: 800px;
    height: 54px;
    line-height: 54px;
    background: rgba(230, 46, 55, 1);
    border-radius: 6px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
