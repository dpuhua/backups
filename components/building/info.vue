<template>
  <section class="house-info">
    <table>
      <tbody>
        <tr>
          <td>开盘日期</td>
          <td>{{ buildDetail.buildOpenDate }}</td>
        </tr>
        <tr>
          <td>产品类型</td>

          <td>
            <span v-for="(item, index) in buildDetail.buildTypes" :key="index">
              {{ item }}
            </span>
          </td>
        </tr>
        <tr>
          <td>装修状况</td>
          <td>{{ buildDetail.buildFixtures }}</td>
        </tr>
        <tr>
          <td>占地面积</td>
          <td>{{ buildDetail.buildArea }}</td>
        </tr>
        <tr>
          <td>产 权</td>
          <td>{{ buildDetail.buildOpenDate }}</td>
        </tr>
        <tr>
          <td>绿 化 率</td>
          <td>{{ buildDetail.buildOpenDate }}</td>
        </tr>
        <tr>
          <td>容 积 率</td>
          <td>{{ buildDetail.buildGreeningRate }}</td>
        </tr>
        <tr>
          <td>总 户 数</td>
          <td>{{ buildDetail.buildHouseholds }}</td>
        </tr>
        <tr>
          <td>物业公司</td>
          <td>{{ buildDetail.buildEstateCompany }}</td>
        </tr>

        <tr>
          <td>楼盘特色</td>
          <td>
            {{ buildDetail.buildFeatures }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="info-aside">
      <article>楼盘相册 <span>查看全部楼盘照片 &#62;</span></article>
      <template v-for="(item, index) in this.buildAlbum">
        <div
          v-if="albumMap.includes(item.type)"
          :key="index"
          class="img-top"
          :class="{ 'img-bot': albumMap.slice(1).includes(item.type) }"
        >
          <img :src="item.picItems[0].coverPisUrl" alt="" />
          <span>{{ item.typeName }}</span>
        </div>
      </template>
    </div>
  </section></template
>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 首页轮播图1
      // 楼盘相册2
      // 封面图3
      // 效果图4
      // 实景图5
      // 户型图6
      // 平面图7
      // 视频 8
      // VR 9
      // 楼盘海报 10
      albumMap: ['4', '5', '7']
    }
  },
  computed: {
    ...mapState(['buildDetail', 'buildAlbum'])
  },

  mounted() {
    console.log('相册', this.buildDetail)
  }
}
</script>

<style scoped lang="less">
@import 'assets/css/mixin';
.house-info {
  .fs(16px);
  position: relative;

  table {
    width: 740px;
    border-collapse: separate;
    border-spacing: 10px;

    tr {
      line-height: 24px;

      td:first-child {
        vertical-align: top;
        width: 80px;
        color: @globalGrey;
      }
    }
  }

  .info-aside {
    img {
      background: @globalNull;
      display: inline-block;
    }

    position: absolute;
    right: 0;
    top: 0;

    article {
      .wh(330px, 28px);
      margin-bottom: 20px;
      position: relative;
      .fs(20px);
      span {
        .pbr();
        .sc(16px, @globalGrey);
      }
    }

    .img-top {
      cursor: pointer;
      .wh(330px, 166px);

      margin-bottom: 5px;
      position: relative;
      img {
        .wh(330px, 166px);
      }

      span {
        color: #ffffff;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 29px;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
      }
    }

    .img-bot {
      .fixLastMargin(6px);
      .wh(162px, 164px);
      display: inline-block;
      img {
        .wh(162px, 164px);
      }
    }
  }
}
</style>
