<template>
  <div class="side-bar">
    <p class="user-img">
      <img :src="avatar" alt="用户头像" />
    </p>
    <p class="user-name">{{ userInfo.name || '恒大宝用户' }}</p>
    <p class="user-tag">
      {{ memberInfo.levelName }}
      <!-- <img src="~@/assets/img/account/vip_gold.png" alt="黄金会员" />
      <img src="~@/assets/img/account/vip_purple.png" alt="至尊会员" />
       <img src="~@/assets/img/account/vip_black.png" alt="钻石会员" /> -->
    </p>

    <ul class="side-tab">
      <li v-for="(item, index) in menus" :key="index" :class="menuActive(item)">
        <a :href="item.url">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    menus: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      member: {}
    }
  },
  computed: {
    ...mapState(['userInfo', 'memberInfo']),
    ...mapGetters(['avatar'])
  },
  mounted() {
    this.$store.dispatch('modules/broker/apiGetMemberLevelAndEquity')
    // levelName: "普通会员",
    // equityInfoUrl: "https://cdn.oudianyun.com/dev/back-cms-web/1590138…63379572_6854aecf-49f1-47e8-bdd4-fbeac1721ec4.jpg"
    // memberType: 0}
  },
  methods: {
    menuActive(item) {
      return {
        on: this.menus.length === 1 || this.$route.path.endsWith(item.url)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.side-bar {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  width: 261px;
  min-height: 566px;
  background: #fff;
  border-radius: 8px;
  margin-right: 30px;
  text-align: center;
  .user-img {
    width: 68px;
    height: 68px;
    overflow: hidden;
    border-radius: 50%;
    margin: 30px auto 0;
    img {
      width: 100%;
    }
  }
  .user-name {
    font-size: 20px;
    margin-top: 12px;
    height: 20px;
    line-height: 20px;
    font-weight: 500;
    color: rgba(68, 68, 79, 1);
    line-height: 20px;
    img {
      width: 100%;
    }
  }
  .user-tag {
    margin-top: 8px;
    height: 32px;
    text-align: center;
    padding-bottom: 34px;
    border-bottom: 1px #ebebec solid;
    box-sizing: content-box;
    img {
      display: inline-block;
      width: 109px;
      height: 32px;
    }
  }
  .side-tab {
    display: block;
    margin-top: 19px;
    padding: 0 16px;
    li {
      display: block;
      width: 231px;
      height: 50px;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 20px;
      a {
        display: block;
        width: 100%;
        font-size: 16px;
        color: #44444f;
        line-height: 50px;
        &:hover,
        &:active {
          color: #e62e37;
        }
      }
      &.on {
        background: #e62e37;
        a {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
