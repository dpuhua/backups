<template>
  <section class="house-type">
    <article>{{ this.buildDetail.buildName }}相册</article>
    <ul class="shape">
      <li
        v-for="(item, index) in this.structureType"
        :key="index"
        @click="toggleSort(index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <ul class="sort">
      <li v-if="len('hdPics')">图片 ({{ len('hdPics') }})</li>
      <li v-if="len('videosUrls')">视频 ({{ len('videosUrls') }})</li>
      <li v-if="len('vrUrls')">VR ({{ len('vrUrls') }})</li>
    </ul>
    <div class="slider-box">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="(item, index) in this.structureType[this.houseType][
            this.albumType
          ]"
          :key="index"
        >
          <img :src="item" class="img-box" alt="" />
        </swiper-slide>
      </swiper>
      <div class="view-prev swiper-button-prev"></div>
      <div class="view-next swiper-button-next"></div>
    </div>

    <div class="slider-box-thum">
      <swiper ref="mySwiperThum" :options="swiperOptionsThum">
        <swiper-slide
          v-for="(item, index) in this.structureType[this.houseType][
            this.albumType
          ]"
          :key="index"
        >
          <div class="img-box">
            <img :src="item" alt="" />
          </div>
        </swiper-slide>
      </swiper>
      <div class="thum-prev swiper-button-prev"></div>
      <div class="thum-next swiper-button-next"></div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      houseType: '1', // 户型切换标识
      albumType: 'hdPics', // 相册切换标识
      swiperOptions: {
        loop: false,
        navigation: {
          prevEl: '.view-prev',
          nextEl: '.view-next'
        }
      },
      swiperOptionsThum: {
        loop: false,
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
          prevEl: '.thum-prev',
          nextEl: '.thum-next'
        }
      }
    }
  },
  computed: {
    len() {
      return function(type) {
        const selectType = this.structureType[this.houseType][type]
        return selectType !== null && selectType.length > 0
          ? selectType.length
          : 0
      }
    },
    ...mapState(['buildDetail', 'structureType', 'buildAlbum'])
  },
  mounted() {},
  methods: {
    toggleSort(index) {
      this.houseType = index
    }
  }
}
</script>

<style scoped lang="less">
@import 'assets/css/mixin';
.house-type {
  width: 935px;
  margin: 24px auto 50px;
  article {
    .sc(20px, @globalBlack);
  }
  ul {
    text-align: center;
    margin-bottom: 24px;
    &.shape {
      li {
        .sc(20px, @globalGrey);
        .fixLastMargin(44px);

        display: inline-block;
        &.cur,
        &:hover {
          cursor: pointer;
          color: @globalBlack;
        }
      }
    }
    &.sort {
      li {
        .fixLastMargin(24px);
        .sc(16px, @globalGrey);
        line-height: 34px;
        width: 121px;
        /*height: 38px;*/
        border-radius: 6px;
        border: 1px solid rgba(169, 168, 174, 1);

        display: inline-block;
        &.cur,
        &:hover {
          cursor: pointer;
          color: #ffffff;
          background: rgba(230, 46, 55, 1);
          border: 1px solid rgba(230, 46, 55, 1);
        }
      }
    }
  }
}

.slider-box {
  .wh(935px, 570px);

  margin: 0 auto 10px;
  position: relative;
  .img-box {
    .wh(935px, 570px);
  }
}

.slider-box-thum {
  .wh(935px, 127px);
  margin: 0 auto;
  position: relative;
  .img-box {
    .wh(170px, 127px);
    border: 1px solid rgba(169, 168, 174, 1);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    img {
      .wh(109px, 109px);
    }
  }
}

.swiper-button-prev:after,
.swiper-button-next:after {
  width: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  z-index: 4;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
}

.swiper-button-prev:focus,
.swiper-button-next:focus {
  outline: 0;
}
.swiper-button-next {
  right: -3px;
}
.swiper-button-prev {
  left: -3px;
}
</style>
