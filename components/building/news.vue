<template>
  <section class="house-news">
    <div v-if="buildingList.records && buildingList.records.length === 0">
      暂无数据
    </div>
    <ul v-else class="news-list">
      <li v-for="(item, key) in buildingList.records" :key="key">
        <header>
          <span>{{ item.updateTime }}<i></i></span> {{ item.title }}
        </header>
        <span>
          {{ item.content }}
        </span>
        <footer>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </footer>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    buildingList: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    // 获取楼盘资讯
    async getGetAppList() {
      try {
        const { data } = await this.$store.dispatch(
          'modules/prod/apiGetAppList',
          this.buildPrams
        )
        if (data) {
          this.buildingList = data.records
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import 'assets/css/mixin';

.news-list {
  margin-top: 28px;
  width: 740px;
  li {
    position: relative;
    margin-left: 105px;
    padding-left: 20px;
    padding-bottom: 32px;

    &::before {
      display: block;
      background-color: #dcdbe1;
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      z-index: 0;
      width: 1px;
      height: 100%;
    }

    &:last-child {
      margin-bottom: 0;

      &::before {
        content: '';
        position: absolute;
        left: 5px;
        top: 0;
        z-index: 0;
        width: 0;
        height: 100%;
      }
    }

    header {
      .fs(16px);
      padding: 0;
      margin-bottom: 12px;

      i {
        margin-left: 10px;
        .borderRadius(3px);
        display: inline-block;
        width: 8px;
        height: 8px;
        background: rgba(220, 219, 225, 1);
        vertical-align: 2px;
      }

      span {
        left: -100px;
        position: absolute;
        .sc(16px, @globalBlack);
      }
    }

    span {
      .sc(14px, @globalGrey);
      line-height: 20px;
    }

    footer {
      height: 98px;

      margin-top: 24px;

      img {
        display: inline-block;
        .fixLastMargin(24px);
        background: @globalNull;
        .wh(130px, 98px);
      }
    }
  }
}
</style>
