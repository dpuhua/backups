<template>
  <div class="list-box">
    <div class="view">
      <img
        :src="itemData.prodDetailPicUrl"
        :alt="itemData.prodName"
        class="pic"
      />
      <!-- <img src="@/assets/img/building/default_pic.png" alt="" class="pic" /> -->
    </div>
    <div class="info">
      <div class="hd">
        <h3 class="title">{{ itemData.prodName || '--' }}</h3>
        <div v-if="itemData.isHot == 1" class="hot">热销楼盘</div>
        <!-- <div v-if="itemData.isNew == 1" class="hot">新盘</div> -->
      </div>
      <div class="bd">
        <div class="text">
          <div class="label">产品类型</div>
          <div class="txt">
            {{ itemData.buildTypes ? itemData.buildTypes.join('、') : '--' }}
          </div>
        </div>
        <div class="text">
          <div class="label">楼盘地址</div>
          <div class="txt">{{ itemData.prodAddress || '--' }}</div>
        </div>
        <div class="text">
          <div class="label">楼盘户型</div>
          <div class="txt">{{ itemData.houseNames || '--' }}</div>
        </div>
        <div class="text">
          <div class="label">面&emsp;&emsp;积</div>
          <div class="txt">{{ itemData.areaScope || '--' }}</div>
        </div>
      </div>
      <div class="tags">
        <span v-if="itemData.prodSellPoint" class="tag">{{
          itemData.prodSellPoint
        }}</span>

        <span v-for="(label, index) in labels" :key="index" class="tag">{{
          label
        }}</span>
      </div>

      <div class="right-top">
        <p class="price-box">
          参考均价
          <span class="price"
            ><strong>{{ price[0] }}</strong
            >{{ price[1] }}</span
          >
        </p>
        <p class="tel">售楼热线 0755-88888888</p>
      </div>

      <a class="btn subscribe-btn">网上认购</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Prod',
  props: {
    itemData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    labels() {
      return this.itemData.labels || []
    },
    price() {
      const price = this.itemData.prodPrice
      if (price) {
        const unit = price.replace(/^\d*\.*\d*/, '')
        const count = price.replace(unit, '')
        return [count || '--', unit || '元/㎡起']
      } else {
        return ['--', '元/㎡起']
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import '@/assets/css/global.less';
.list-box {
  height: 192px;
  margin-bottom: 48px;

  .view {
    &:extend(.fl);
    width: 256px;
    height: 192px;
    border-radius: 6px;
    overflow: hidden;

    .pic {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .info {
    position: relative;
    margin-left: 284px;
    padding-right: 270px;
  }

  .hd {
    height: 32px;
    margin-bottom: 12px;
  }

  .title {
    &:extend(.fl);
    margin-right: 8px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(68, 68, 79, 1);
    line-height: 32px;
  }

  .hot {
    &:extend(.fl);
    display: block;
    margin-top: 4px;
    padding: 0 8px;
    background: linear-gradient(
      45deg,
      rgba(255, 130, 78, 1) 0%,
      rgba(223, 8, 18, 1) 100%
    );
    color: #fff;
    font-size: 14px;
    line-height: 24px;
    border-radius: 2px;
  }

  .bd {
    height: 124px;
  }

  .text {
    margin-bottom: 12px;
    font-size: 14px;
    color: rgba(68, 68, 79, 1);
    line-height: 20px;
  }

  .label {
    &:extend(.fl);
    color: rgba(168, 169, 174, 1);
  }

  .txt {
    margin-left: 68px;
  }

  .tags {
    font-size: 12px;
    color: rgba(141, 130, 125, 1);
    line-height: 24px;
  }

  .tag {
    display: inline-block;
    padding: 0 12px;
    background: rgba(133, 122, 107, 0.08);
    border-radius: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    & + .tag {
      margin-left: 10px;
    }
  }
}

.right-top {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  line-height: 22px;
  color: rgba(169, 168, 174, 1);
  text-align: right;

  .price-box {
    color: rgba(68, 68, 79, 1);
    line-height: 44px;

    .price {
      color: rgba(230, 46, 55, 1);
    }

    strong {
      font-size: 36px;
      font-weight: bold;
    }
  }
}

.subscribe-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 216px;
  height: 54px;
  border-radius: 6px;
  font-size: 16px;
  line-height: 54px;
  text-align: center;
}
</style>
