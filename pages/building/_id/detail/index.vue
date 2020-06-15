<template>
  <div class="buildDetail-container">
    <section class="build-detail">
      <nav>
        恒房通 &#62; &#62;
        <span class="cur">{{ this.buildDetail.buildName }}</span>
      </nav>
      <header>
        {{ this.buildDetail.buildName }}
        <em v-if="this.buildDetail.isPopular">热销楼盘</em>
      </header>
    </section>
    <Tab
      :lists="tabList"
      :active="active"
      :tel="this.buildDetail.buildTel"
      @handelToggle="tabToggleAsync"
    ></Tab>
    <section class="build-detail house-show">
      <div class="house-main">
        <div class="house-warp">
          <Aside v-show="hasAside" :build-detail="this.buildDetail"></Aside>
          <keep-alive>
            <component :is="curComp"></component>
          </keep-alive>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import News from '@/components/building/news'
import Album from '@/components/building/album'
import Info from '@/components/building/info'
import Type from '@/components/building/type'
import Tab from '@/components/building/tab'
import Aside from '@/components/building/aside'

export default {
  components: {
    News,
    Type,
    Album,
    Info,
    Tab,
    Aside
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
        prodId: '1269906653470265345'
      })
      store.commit('BUILD_ALBUM', data)
    } catch (error) {
      console.error(error)
    }
    // 顾问
    try {
      const { data } = await store.dispatch('modules/prod/apiZygwList', {
        prodId: '1269906653470265345',
        current: 1,
        size: 10
      })
      store.commit('ZYGW_LIST', data)
    } catch (error) {
      console.error(error)
    }
  },

  data() {
    return {
      hasAside: false,
      active: 0,
      curComp: 'News',
      tabList: [
        {
          id: 1,
          visible: true,
          type: 'buildDetail',
          name: '楼盘主页',
          path: '/building/'
        },
        {
          id: 2,
          visible: true,
          type: 'buildNews',
          name: '楼盘动态'
        },
        {
          id: 3,
          visible: true,
          type: 'buildType',
          name: '户型介绍'
        },
        {
          id: 4,
          visible: true,
          type: 'buildAlbum',
          name: '楼盘相册'
        },
        {
          id: 5,
          visible: true,
          type: 'buildInfo',
          name: '详细信息'
        }
      ]
    }
  },
  computed: {
    ...mapState(['buildDetail', 'structureType', 'buildAlbum', 'zygwList'])
  },
  mounted() {
    this.initPath()
  },
  methods: {
    ...mapMutations([
      'BUILD_DETAIL',
      'STRUCTURE_TYPE',
      'BUILD_ALBUM',
      'ZYGW_LIST'
    ]),

    // 初始化页签
    initPath() {
      if (this.$route.query.type === 'AlbumDetail') {
        this.active = 4
        this.curComp = 'Type'
        this.hasAside = false
      } else {
        this.active = 2
        this.hasAside = true
      }
    },

    // 页签切换
    tabToggleAsync(n) {
      this.active = n.id
      this.hasAside = n.type == 'buildNews' || n == 'buildAlbum'
      switch (n.type) {
        case 'buildNews':
          this.curComp = 'News'
          break
        case 'buildType':
          this.curComp = 'Type'
          break
        case 'buildAlbum':
          this.curComp = 'Album'
          break
        case 'buildInfo':
          this.curComp = 'Info'
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
@import 'assets/css/mixin';
@import 'assets/css/global';

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
  margin: 0 auto;

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
      }
    }
  }
}

.house-show {
  position: relative;
  margin: 28px auto 50px;
  min-height: 500px;
}

.house-main {
  header {
    .sc(28px, @globalBlack);
    margin: 0 0 24px 0;
    padding-top: 50px;
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
}
</style>
