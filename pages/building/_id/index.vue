<template>
  <div class="buildDetail-container">
    <section class="build-detail">
      <nav>
        恒房通 &#62; {{ this.$store.state.city.cityName }} &#62;
        <span class="cur">{{ this.buildDetail.buildName }}</span>
      </nav>
      <header>
        {{ this.buildDetail.buildName }}
        <em v-if="this.buildDetail.isPopular">热销楼盘</em>
        <span>
          售楼电话：
          <b>{{ this.buildDetail.buildTel }}</b>
        </span>
      </header>
      <div class="build-preview">
        <div class="prev-view">
          <div class="slider-box">
            <swiper ref="detailSwiper" :options="swiperOptions">
              <swiper-slide
                v-for="(item, index) in this.buildAlbum[this.albumType]
                  .picItems"
                :key="index"
              >
                <img :src="item.coverPisUrl" class="img-box" alt="" />
              </swiper-slide>
            </swiper>
            <div class="view-prev swiper-button-prev"></div>
            <div class="view-next swiper-button-next"></div>
            <div class="goAlbum">查看相册</div>
          </div>
        </div>

        <div class="slider-box-thum">
          <swiper ref="detailSwiperThum" :options="swiperOptionsThum">
            <swiper-slide
              v-for="(item, index) in this.buildAlbum"
              :key="index"
              @click="toggleAlbum(index)"
            >
              <img :src="item.picItems[0].coverPisUrl" class="img-box" alt />
              <span>{{ item.typeName }}({{ item.picItems.length }})</span>
            </swiper-slide>
          </swiper>
          <!--          <div class="swiper-button-prev thum-prev"></div>-->
          <!--          <div class="swiper-button-next thum-next"></div>-->
        </div>

        <div class="build-introduce">
          <div class="intro-price">
            <b>{{ this.buildDetail.buildPrice | matchNum }}</b>
            <em>元/m²</em> 参考{{ this.buildDetail.buildPriceTypeName }}
            <!--            <span>-->
            <!--              <img src="@/assets/img/house/icon_share.png" alt />分享-->
            <!--            </span>-->
          </div>
          <div class="intro-type">
            <ul>
              <li
                v-for="(item, index) in this.buildDetail.buildLabelNames"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="intro-info">
            <ul>
              <li>
                <span>产品类型</span>
                <em
                  v-for="(item, index) in this.buildDetail.buildTypes"
                  :key="index"
                >
                  {{ item }}
                </em>
              </li>
              <li><span>楼盘地址</span> {{ this.buildDetail.buildAddr }}</li>
              <li>
                <span>楼盘户型</span>
                <em
                  v-for="(item, index) in this.buildDetail.houseNames"
                  :key="index"
                >
                  {{ item }}
                </em>
                <a href="/">查看全部户型 &#62;</a>
              </li>
            </ul>
          </div>
          <div class="intro-more">
            <a href="/">查看更多楼盘详情 &#62;</a>
          </div>

          <div class="hr"></div>
          <div class="intro-code">
            <div v-if="false">
              <img src alt />
              扫码在线咨询
            </div>
            <div>
              <img
                :src="`${imgBaseUrl}${this.buildDetail.buildWeixinPic}`"
                alt
              />
              关注楼盘公众号
            </div>
          </div>
          <div class="intro-btn">
            <span class="sub">
              <a href>网上认购</a>
            </span>
            <span class="recommend">
              <a href>立即推荐</a>
            </span>
          </div>
        </div>
      </div>
    </section>
    <Tab
      :fixed="tabFixed"
      :lists="tabList"
      :active="active"
      :tel="this.buildDetail.buildTel"
      @handelToggle="handelSelectTab"
    ></Tab>
    <section class="build-detail house-show">
      <Aside :fixed="tabFixed"></Aside>
      <div class="house-main">
        <div id="wrap" class="house-warp">
          <div class="house-plane tab-content">
            <header>总规划平面示意图</header>
            <div>
              <img :src="this.buildDetail.buildCoverUrl" alt />
            </div>
          </div>
          <div class="house-type tab-content">
            <header>户型介绍</header>
            <ul>
              <li
                v-for="(item, index) in this.structureType.slice(0, 3)"
                :key="index"
              >
                <a href>
                  <img :src="item.pic" alt />
                  <span class="house-type-title">户型：{{ item.name }}</span>
                  <span>建筑面积：{{ item.area }}</span>
                  <span> {{ item.descript }}</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="house-type house-source tab-content">
            <header>
              {{ specialDatas.buildDiscountName }}
              <!-- <span><a href="">查看更多 &#62;</a></span> -->
            </header>
            <nav>
              {{ specialDatas.discountDes }}
            </nav>
            <ul>
              <li v-for="item in specialDatas.rooms" :key="item.id">
                <a href>
                  <img :src="item.picUrl" alt />
                  <span class="house-type-title">{{ item.roomNo }}</span>
                  <span>{{ item.structureType }} {{ item.house }}</span>
                  <span class="prev">原价：{{ item.originalPrice }}</span>
                  <span class="sale">
                    特价：
                    <em>{{ item.specialPrice }}</em>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="house-news tab-content">
            <header>楼盘动态</header>
            <News :building-list="buildingList"></News>
          </div>
          <div class="house-location tab-content">
            <header>楼盘位置</header>
            <div class="map">
              <Map v-if="mapData.isOk" :map-data="mapData"></Map>
            </div>
          </div>
          <div class="house-around tab-content">
            <header>周边配套</header>
            <ul>
              <li>
                <span>教育资源</span>
                {{ supportDatas.buildEdu }}
              </li>
              <li>
                <span>交通配套</span>
                {{ supportDatas.buildTransportation }}
              </li>
              <li>
                <span>医疗资源</span>
                {{ supportDatas.buildMedical }}
              </li>
              <li>
                <span>商业购物</span>
                {{ supportDatas.buildShop }}
              </li>
              <li>
                <span>其他</span>
                {{ supportDatas.buildOtherInfo }}
              </li>
            </ul>
          </div>
          <div class="adviser-list tab-content">
            <header>优选顾问</header>
            <div class="slider-box">
              <swiper ref="zygwSwiper" :options="zygwSwiperOptions">
                <swiper-slide
                  v-for="(item, index) in this.zygwList.records"
                  :key="index"
                >
                  <img :src="item.photoUrl" alt />
                  <span> {{ item.zygwName }}</span>
                  <footer class="pop">
                    <em>向TA咨询</em>
                    <span>
                      联系电话
                      <h5>{{ item.zygwPhone }}</h5>
                    </span>
                  </footer>
                </swiper-slide>
              </swiper>
              <div class="zygw-prev swiper-button-prev"></div>
              <div class="zygw-next swiper-button-next"></div>
            </div>
            <!--            -->
            <!--            <ul>-->
            <!--              <li-->
            <!--                v-for="(item, index) in this.zygwList.records.slice(0, 4)"-->
            <!--                :key="index"-->
            <!--              >-->
            <!--                <img :src="item.photoUrl" alt />-->
            <!--                <span> {{ item.zygwName }}</span>-->
            <!--                <footer class="pop">-->
            <!--                  <em>向TA咨询</em>-->
            <!--                  <span>-->
            <!--                    联系电话-->
            <!--                    <h5>{{ item.zygwPhone }}</h5>-->
            <!--                  </span>-->
            <!--                </footer>-->
            <!--              </li>-->
            <!--            </ul>-->
          </div>
        </div>
        <div class="house-relevant tab-content">
          <header>猜你喜欢</header>
          <ul>
            <li
              v-for="item in guessBuilding.records.slice(0, 4)"
              :key="item.prodId"
            >
              <a href="javasceipt:">
                <img :src="item.prodDetailPicUrl" alt />
                <article>{{ item.prodName }}</article>
                <div class="label-box">
                  <span v-for="(lab, key) in item.labels" :key="key">{{
                    lab
                  }}</span>
                </div>
                <footer>
                  {{ item.provinceName }} {{ item.buildArea }}
                  <span class="price">
                    <em>{{ item.prodPrice }}</em></span
                  >
                </footer>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="find-more">
        <a href>查看更多楼盘</a>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Aside from '@/components/building/aside'
import Tab from '@/components/building/tab'
import News from '@/components/building/news'
import Map from '@/components/common/baidu-map'

export default {
  components: {
    Aside,
    News,
    Map,
    Tab
  },
  filters: {
    matchNum(value) {
      const reg = /[1-9][0-9]*/g
      return value.match(reg)[0]
    }
  },
  async asyncData({ store }) {
    // 详情
    try {
      const { data } = await store.dispatch(
        'modules/prod/apiGetDetailsBaseInfo',
        {
          prodId: '1269906653470265345'
        }
      )
      store.commit('BUILD_DETAIL', data)
    } catch (error) {
      console.error(error)
    }

    // 户型
    try {
      const { data } = await store.dispatch(
        'modules/prod/apiGetDetailsHotLayout',
        {
          prodId: '1269906653470265345'
        }
      )
      store.commit('STRUCTURE_TYPE', data)
    } catch (error) {
      console.error(error)
    }
    // 相册
    try {
      const { data } = await store.dispatch('modules/prod/apiGetDetailsSpics', {
        prodId: '1269906674613751809'
      })
      store.commit('BUILD_ALBUM', data)
    } catch (error) {
      console.error(error)
    }
    // 顾问
    try {
      const { data } = await store.dispatch('modules/prod/apiZygwList', {
        prodId: '1270150630089969665',
        current: 1,
        size: 10
      })
      store.commit('ZYGW_LIST', data)
    } catch (error) {
      console.error(error)
    }
    // 特价房源
    try {
      const { data } = await store.dispatch(
        'modules/prod/apiGetDetailsSpecial',
        {
          prodId: '1269906653470265345'
        }
      )
      store.commit('SPECIAL_LIST', data)
    } catch (error) {
      console.error(error)
    }
    // 周边配套
    try {
      const { data } = await store.dispatch('modules/prod/apiGetSupporting', {
        prodId: '1269906653470265345'
      })
      store.commit('BUILD_LATOUT', data)
    } catch (error) {
      console.error(error)
    }
    // 猜你喜欢
    try {
      const { data } = await store.dispatch(
        'modules/prod/apiGetGuessBuilding',
        {
          prodId: '1269906653470265345'
        }
      )
      store.commit('GUESS_BUILD', data)
    } catch (error) {
      console.log(error)
    }
    // 楼盘资讯
    try {
      const { data } = await store.dispatch('modules/prod/apiGetAppList', {
        size: 20,
        current: 1,
        projectId: 1,
        releasePort: 1 // 1恒大宝app，2好盘小程序，4恒大宝小程序，8机构部小程序
      })
      store.commit('APP_LIST', data)
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      imgBaseUrl: 'https://files.evergrande.com/',
      prodId: this.$route.params.id, // 楼盘id
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
        spaceBetween: 10,
        // navigation: {
        //   prevEl: '.thum-prev',
        //   nextEl: '.thum-next'
        // },
        on: {
          click: () =>
            (this.albumType = this.$refs.detailSwiperThum.swiperInstance.clickedIndex)
        }
      },
      zygwSwiperOptions: {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          prevEl: '.zygw-prev',
          nextEl: '.zygw-next'
        }
      },
      albumType: '0', // 切换相册预览分类
      mapData: {
        // 百度地图配置
        longitude: '',
        latitude: '',
        title: '',
        description: '',
        address: '',
        tel: '',
        isOk: false
      },
      // tab
      tabFixed: false,
      tabOffsetTop: 0,
      active: 1,
      arrDom: '',
      tabList: [
        {
          id: 1,
          name: '总规图'
        },
        {
          id: 2,
          name: '户型介绍'
        },
        {
          id: 3,
          name: '特价房源'
        },
        {
          id: 4,
          name: '楼盘动态'
        },
        {
          id: 5,
          name: '楼盘位置'
        },
        {
          id: 6,
          name: '周边配套'
        },
        {
          id: 7,
          name: '优选顾问'
        },
        {
          id: 8,
          name: '猜你喜欢'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'buildDetail',
      'structureType',
      'buildAlbum',
      'zygwList',
      'specialDatas',
      'supportDatas',
      'guessBuilding',
      'buildingList'
    ])
  },
  mounted() {
    console.log('id', this.$route.params.id)
    this.ceiling()
    this.reqApiGetSupporting()
    console.log('顾问', this.zygwList)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations([
      'BUILD_DETAIL',
      'STRUCTURE_TYPE',
      'BUILD_ALBUM',
      'ZYGW_LIST',
      'SPECIAL_LIST',
      'BUILD_LATOUT',
      'GUESS_BUILD',
      'APP_LIST'
    ]),

    // 吸顶
    ceiling() {
      this.arrDom = document.getElementsByClassName('tab-content')
      window.addEventListener('scroll', this.handleScroll)
      this.$nextTick(() => {
        this.tabOffsetTop = document.querySelector('#tabFixed').offsetTop
      })
    },
    toggleAlbum(index) {
      console.log(index)
      this.albumType = index
    },
    // 赋值给地图组件
    reqApiGetSupporting() {
      this.mapData.isOk = true
      this.mapData.longitude = this.supportDatas.longitude
      this.mapData.latitude = this.supportDatas.latitude
      this.mapData.title = this.buildDetail.buildName
      this.mapData.description = '暂无简介字段'
      this.mapData.address = this.buildDetail.buildAddr
      this.mapData.tel = this.buildDetail.buildTel
    },
    // 楼盘详情-二维码
    /*    async reqApiGetHPWxacodeByScene() {
      try {
        const { data } = await this.$store.dispatch(
          'modules/prod/apiGetHPWxacodeByScene',
          {
            prodId: this.prodId
          }
        )
        if (data) {
          this.guessBuilding = data.records
        }
      } catch (error) {
        console.error(error)
      }
    }, */

    // 导航栏定位-滚动触发
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        window.documentElement.scrollTop ||
        document.body.scrollTop

      this.tabFixed = scrollTop > this.tabOffsetTop && scrollTop < 2800

      for (let i = 0; i < this.arrDom.length; i++) {
        if (this.arrDom[this.arrDom.length - 1].offsetTop - scrollTop > 10) {
          if (
            this.arrDom[i].offsetTop - scrollTop <= 10 &&
            this.arrDom[i + 1].offsetTop - scrollTop > 10
          ) {
            this.active = i
          }
        } else {
          this.active = this.arrDom.length
        }
      }
    },

    // 导航栏定位-点击触发
    handelSelectTab(item) {
      window.scroll(0, this.arrDom[item.id - 1].offsetTop + 600)
    }
  }
}
</script>
<style scoped lang="less">
@import 'assets/css/mixin';
@import 'assets/css/global';

[v-cloak] {
  display: none;
}
.label-box {
  height: 18px;
}
.buildDetail-container {
  padding-top: 18px;
}

nav {
  .sc(16px, #a2a0b4);

  .cur {
    .sc(16px, #44444f);
  }
}

.build-detail {
  width: 1200px;
  margin: 0 auto 50px;

  header {
    height: 52px;
    position: relative;
    .sc(40px, #44444f);
    margin: 15px 0 20px;

    em {
      margin-left: 10px;
      text-align: center;
      .sc(14px, #fff);
      line-height: 24px;
      .wh(72px, 24px);
      display: inline-block;
      background: linear-gradient(
        315deg,
        rgba(223, 8, 18, 1) 0%,
        rgba(255, 130, 78, 1) 100%
      );
      border-radius: 1px;
    }

    span {
      position: absolute;
      right: 0;
      bottom: 0;
      .sc(24px, #44444f);

      b {
        color: #0082f8;
        font-weight: bold;
        width: 174px;
        display: inline-block;
      }
    }
  }

  .build-preview {
    height: 464px;
    position: relative;
    .prev-view {
      background: #f1f1f1;
      .wh(580px, 358px);
      margin-bottom: 15px;
    }
  }

  .build-introduce {
    position: absolute;
    right: 0;
    top: 0;
    .fs(16px);
    vertical-align: bottom;
    .wh(596px, 464px);
    box-shadow: 0 4px 22px -4px rgba(227, 227, 227, 1);
    .borderRadius(8px);

    .intro-price {
      position: relative;
      height: 40px;
      padding: 18px 40px 0 40px;
      margin-bottom: 18px;

      b {
        .sc(36px, #e62e37);
      }

      em {
        margin-right: 10px;
        color: #e62e37;
        font-weight: bold;
      }

      span {
        .pbr();
        right: 40px;
        cursor: pointer;

        img {
          vertical-align: -3px;
          margin-right: 5px;
        }
      }
    }

    .intro-type {
      height: 24px;
      padding: 0 40px;

      ul {
        li {
          display: inline-block;
          .sc(12px, #857a6b);
          line-height: 24px;
          text-align: center;
          .wh(70px, 24px);
          background: rgba(133, 122, 107, 0.08);
          margin-right: 5px;
          border-radius: 2px;
        }
      }
    }

    .intro-info {
      padding: 18px 40px 0 40px;
      .sc(14px, @globalBlack);
      position: relative;

      ul {
        li {
          span {
            color: @globalGrey;
            width: 70px;
            display: inline-block;
            padding-bottom: 12px;
          }
          em {
            margin-right: 10px;
          }
        }
      }

      a {
        margin-left: 20px;
        color: @globalGrey;
      }
    }

    .intro-more {
      padding: 0 40px 12px 40px;

      a {
        .sc(14px, #2660b1);
      }
    }

    .hr {
      margin: 0 40px;
      height: 1px;
      background: rgba(216, 216, 216, 1);
    }

    .intro-code {
      padding: 18px 40px 0 40px;

      div {
        .sc(14px, @globalBlack);
        display: inline-block;
        margin-right: 10px;
        .wh(100px, 100px);
        text-align: center;

        img {
          margin: 0 auto;
          display: block;
          .wh(80px, 80px);
          background: @globalNull;
          margin-bottom: 6px;
        }
      }
    }

    .intro-btn {
      span {
        display: inline-block;
        text-align: center;
        line-height: 54px;

        .wh(216px, 54px);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 4px 22px -4px rgba(227, 227, 227, 1);
        border-radius: 8px;
        margin-right: 28px;

        &:last-child {
          margin-right: 0;
        }

        a {
          color: #fff;
        }

        cursor: pointer;
      }

      padding: 18px 40px 0 40px;

      .sub {
        background: #e62e37;
      }

      .recommend {
        background: #ff9131;
      }
    }
  }
}

.house-show {
  position: relative;

  .house-main {
    header {
      .sc(28px, @globalBlack);
      margin: 50px 0 24px 0;
    }

    .house-warp {
      width: 718px;
    }

    .house-plane {
      div {
        .wh(718px, 290px);
        background: @globalNull;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }

    .house-type {
      ul {
        li {
          vertical-align: top;
          display: inline-block;
          width: 203px;
          margin-right: 50px;

          &:last-child {
            margin-right: 0;
          }

          img {
            display: inline-block;
            background: @globalNull;
            .wh(203px, 152px);
          }

          span {
            color: @globalBlack;
            padding-bottom: 8px;
            display: block;
            .fs(16px);

            &.house-type-title {
              height: 34px;
              margin-top: 24px;
              .fs(20px);
            }

            &.prev {
              text-decoration: line-through;
              .sc(14px, #a8a9ae);
            }

            &.sale {
              em {
                color: #e62e37;
              }
            }
          }
        }
      }
    }

    .house-source {
      header {
        span {
          a {
            .sc(14px, @globalGrey);
            line-height: 50px;
          }
        }
      }
      nav {
        .sc(14px, @globalBlack);
        margin-bottom: 24px;
      }
    }

    .house-location {
      .map {
        .wh(718px, 309px);
        background: @globalNull;
      }
    }

    .house-around {
      ul {
        li {
          margin-bottom: 20px;

          span {
            margin-bottom: 8px;
            display: block;
            .fs(20px);
          }
        }
      }
    }

    .adviser-list {
      .slider-box {
        .swiper-container {
          height: 260px;
          padding: 10px 15px;
        }
        .wh(643px, 214px);
        .swiper-slide {
          display: inline-block;
          &:last-child {
            margin-right: 0;
          }

          padding-top: 30px;
          text-align: center;
          width: 144px;
          height: 154px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 4px 12px -4px rgba(227, 227, 227, 1);

          &:last-child {
            margin-right: 0;
          }

          img {
            margin: 0 auto;
            background: @globalNull;
            .borderRadius(34px);
            .wh(68px, 68px);
            display: block;
          }
          span {
            color: #a9a8ae;
            width: 70px;
            display: inline-block;
            padding: 12px 0;
          }

          .pop {
            position: relative;
            em {
              cursor: pointer;
              .sc(12px, #2660b1);
              width: 64px;
              height: 24px;
              background: rgba(244, 249, 255, 1);
              border-radius: 2px;
              border: 1px solid rgba(201, 223, 255, 1);
              padding: 2px 4px;
            }
            &:hover {
              span {
                display: inline-block;
              }
            }
            span {
              display: none;
              .fs(20px);
              text-align: center;
              padding: 10px 10px;
              line-height: 30px;
              width: 125px;

              position: absolute;
              color: @globalBlack;
              bottom: -95px;
              left: -6px;
              box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
              border-radius: 6px;
              background: #ffffff;
              h5 {
                .sc(18px, #2660b1);
              }
              &:before {
                content: '';
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #ffffff;
                position: absolute;
                top: -10px;
                left: 60px;
              }
            }
          }
        }
      }
    }

    .house-relevant {
      ul {
        li {
          width: 256px;
          display: inline-block;
          margin-bottom: 19px;
          margin-right: 54px;
          // .fixLastMargin(54px);
          &:nth-child(4n) {
            margin-right: 0;
          }
          a {
            color: @globalBlack;

            img {
              display: inline-block;
              .wh(256px, 192px);
              background: @globalNull;
            }

            article {
              margin: 16px 0 8px 0;
              .fs(20px);
            }

            span {
              display: inline-block;
              .wh(65px, 18px);
              font-size: 12px;
              color: #857a6b;
              line-height: 18px;
              text-align: center;

              background: rgba(133, 122, 107, 0.08);
              margin-right: 5px;
              border-radius: 2px;
            }

            footer {
              position: relative;
              margin-top: 22px;
              color: @globalGrey;

              span {
                position: absolute;
                right: 0;
                text-align: right;
                width: 100%;

                &.price {
                  .sc(12px, #dd000f);
                  background: none;
                }

                em {
                  .fs(20px);
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }

  .find-more {
    margin: 40px 0 50px;
    a {
      .sc(16px, @globalBlack);
      display: block;
      text-align: center;
      line-height: 46px;
      border: 1px solid rgba(235, 235, 236, 1);
    }
  }
}

.slider-box {
  .wh(580px, 358px);

  position: relative;
  .img-box {
    .wh(580px, 358px);
    cursor: pointer;
  }
  .goAlbum {
    .wh(84px, 36px);
    position: absolute;
    right: 24px;
    bottom: 18px;
    z-index: 1;
    background: #ffffff;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
    border-radius: 4px;
    cursor: pointer;
  }
}

.slider-box-thum {
  .wh(580px, 90px);
  position: relative;
  .img-box {
    .wh(108px, 90px);
    cursor: pointer;
  }
  .swiper-slide {
    height: 90px;
    position: relative;

    span {
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      line-height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      .sc(14px, #fff);
    }
    &:hover {
      span {
        opacity: 1;
        background: rgba(230, 46, 55, 1);
      }
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

.thum-prev:after,
.thum-next:after {
  width: 12px;
  height: 90px;
  line-height: 90px;
  font-size: 12px;
}

.thum-prev {
  left: -19px;
}
.thum-next {
  right: -19px;
}

.zygw-prev {
  left: -30px;
}

.zygw-next {
  right: -30px;
}

.swiper-button-disabled {
  display: none;
}

.zygw-prev:after,
.zygw-next:after {
  width: 24px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  z-index: 4;
  cursor: pointer;
  font-size: 0;
}

.zygw-prev:after {
  background: url(~@/assets/img/building/icon_prev.png) no-repeat center;
}

.zygw-next:after {
  background: url(~@/assets/img/building/icon_next.png) no-repeat center;
}
</style>
