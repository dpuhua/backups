<template>
  <div id="asideFixed" class="house-aside" :class="{ 'aside-fixed': fixed }">
    <header>
      {{ this.buildDetail.buildName }}
      <em v-if="this.buildDetail.isPopular">热销楼盘</em>
    </header>
    <ul>
      <li>
        <span>产品类型</span>
        <em v-for="(item, index) in this.buildDetail.buildTypes" :key="index">
          {{ item }}
        </em>
      </li>
      <li><span>楼盘地址</span>{{ this.buildDetail.buildAddr }}</li>
      <li>
        <span>楼盘户型</span>
        <em v-for="(item, index) in this.buildDetail.houseNames" :key="index">
          {{ item }}
        </em>
        <a href="/">全部户型</a>
      </li>
    </ul>
    <div class="aside-more">
      <a href="/">
        查看更多楼盘详情
        <span></span>
      </a>
    </div>
    <div class="hr"></div>
    <div class="adviser">
      <header>
        优选顾问
        <span @click="changeZygw">
          <img alt="换一换" src="@/assets/img/house/icon_toggle.png" />换一换
        </span>
      </header>
      <ul>
        <li v-for="(item, index) in this.zygwList" :key="index">
          <img alt :src="item.photoUrl" />
          <span> {{ item.zygwName }}</span>
          <footer class="pop">
            <em>向TA咨询</em>
            <span>
              联系电话
              <h5>{{ item.zygwPhone }}</h5>
            </span>
          </footer>
        </li>
      </ul>
    </div>
    <!--    <div class="hr"></div>-->
    <!--    <div class="aside-footer">-->
    <!--      <a> <img src="@/assets/img/house/icon_share.png" alt />分享 </a>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      zygwList: [],
      current: 1, // 当前页数
      pages: 0, // 总页数
      size: 3 // 每页条数
    }
  },
  computed: {
    ...mapState(['buildDetail', 'structureType'])
  },
  mounted() {
    this.reqApiGetZygw()
  },
  methods: {
    // 切换置业顾问
    changeZygw() {
      if (++this.current > this.pages) {
        this.current = 1
      }
      this.reqApiGetZygw()
    },
    // 置业顾问
    async reqApiGetZygw() {
      try {
        const { data } = await this.$store.dispatch(
          'modules/prod/apiZygwList',
          {
            prodId: '1270150630089969665',
            current: this.current,
            size: this.size
          }
        )
        if (data) {
          this.zygwList = data.records
          this.pages = data.pages
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
.house-aside {
  width: 325px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 22px -4px rgba(227, 227, 227, 1);
  border-radius: 8px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 24px 22px 22px;

  header {
    .sc(24px, @globalBlack);
    margin: 0 0 20px 0;
    height: 30px;
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
  }

  ul {
    li {
      margin: 0 3px;

      span {
        color: @globalGrey;
        width: 70px;
        display: inline-block;
        padding-bottom: 12px;
      }

      a {
        margin-left: 20px;
        color: @globalGrey;
        text-decoration: underline;
      }
    }
  }

  .hr {
    margin: 16px 0 18px 0;
    height: 1px;
    background: rgba(216, 216, 216, 1);
  }

  .adviser {
    header {
      .fs(20px);
      position: relative;

      span {
        cursor: pointer;
        .sc(14px, #a9a8ae);
        position: absolute;
        right: 0;

        img {
          margin-right: 5px;
          vertical-align: -3px;
        }
      }
    }

    ul {
      li {
        display: inline-block;
        margin-right: 48px;

        &:last-child {
          margin-right: 0;
        }

        text-align: center;
        .wh(68px, 124px);

        img {
          display: inline-block;
          .wh(68px, 68px);
          background: @globalNull;
          .borderRadius(34px);
        }
        span {
          padding: 12px 0;
        }

        .pop {
          z-index: 1;
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
            width: 160px;

            position: absolute;
            color: @globalBlack;
            bottom: -95px;
            left: -60px;
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
              left: 85px;
            }
          }
        }
      }
    }
  }

  .aside-footer {
    text-align: center;

    a {
      .sc(16px, @globalBlack);

      img {
        vertical-align: -3px;
        margin-right: 5px;
      }
    }
  }
}

.aside-fixed {
  position: fixed;
  top: 100px;
  left: 50%;
  margin-left: 230px;
}
.aside-more {
  margin-top: 10px;
}
</style>
