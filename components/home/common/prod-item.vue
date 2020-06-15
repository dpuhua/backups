<template>
  <div class="prod-item">
    <div class="pic">
      <img
        :src="itemData.buildDetailPicUrl"
        :alt="itemData.buildName"
        class="image"
      />
      <div class="hot-tag">热销楼盘</div>
    </div>
    <div>
      <div class="title">{{ itemData.buildName }}</div>
      <div class="currency pmt-10">
        <span class="price">
          {{ itemData.buildPrice }}
        </span>
        <!-- <span class="unit">元/㎡ 起</span> -->
        <nuxt-link to="/" class="pay-btn btn fr">网上认购</nuxt-link>
      </div>
      <div class="local pmt-10">
        <span class="area">建面 {{ itemData.buildArea }}㎡</span>
        <span class="city fr"
          ><i class="el-icon-location-outline"></i>{{ itemData.city }}</span
        >
      </div>
      <div class="sell-point">{{ itemData.buildSellPoint }}</div>
      <div class="tags pmt-10">
        <span class="prod-tag">公园旁</span>
        <span class="prod-tag">大型社区</span>
        <span class="prod-tag">综合体</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    itemData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="less" scoped>
.prod-item {
  .pmt-10 {
    margin-top: 10px;
  }
  .pic {
    position: relative;
    width: 100%;
    height: 192px;
    border-radius: 4px;
    overflow: hidden;
    .hot-tag {
      position: absolute;
      width: 72px;
      height: 24px;
      top: 12px;
      left: 0;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 24px;
      background: linear-gradient(
        45deg,
        rgba(255, 130, 78, 1) 0%,
        rgba(223, 8, 18, 1) 100%
      );
      border-radius: 1px;
    }
    .image {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
    }
  }

  .title {
    font-size: 20px;
    color: #44444f;
    font-weight: 600;
    margin-top: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .currency {
    .price {
      font-size: 20px;
      font-weight: bold;
      color: rgba(221, 0, 15, 1);
      white-space: nowrap;
      display: inline-block;
      max-width: 140px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .unit {
      font-size: 12px;
      font-weight: 400;
      color: rgba(221, 0, 15, 1);
    }
    .pay-btn {
      width: 78px;
      height: 27px;
      background: rgba(230, 46, 55, 1);
      border-radius: 4px;
      text-align: center;
      line-height: 27px;
      &:hover {
        background: #d31c25;
      }
    }
  }
  .local {
    .area {
      font-size: 12px;
      font-weight: 400;
      color: rgba(68, 68, 79, 1);
    }
    .city {
      font-size: 12px;
      font-weight: 400;
      color: rgba(168, 169, 174, 1);
    }
  }
  .sell-point {
    font-size: 12px;
    font-weight: 400;
    color: rgba(168, 169, 174, 1);
    margin-top: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .tags {
    display: flex;
    justify-content: space-between;
    .prod-tag {
      display: inline-block;
      width: 78px;
      height: 22px;
      background: rgba(133, 122, 107, 0.08);
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(141, 130, 125, 1);
      text-align: center;
      line-height: 22px;
    }
    overflow: hidden;
  }
  &:hover {
    .pic {
      .image {
        transform: scale(1.1);
        transition: all 0.2s linear;
      }
    }
  }
}
</style>
