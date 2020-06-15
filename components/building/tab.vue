<template>
  <div id="tabFixed" class="house-tab" :class="{ 'tab-fixed': fixed }">
    <section>
      <ul>
        <li
          v-for="item in lists"
          :key="item.id"
          :class="{ cur: active == item.id, hidden: item.visible }"
          @click="tabToggle(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <span v-if="!fixed">
        <img alt src="@/assets/img/house/icon_phone.png" />
        售楼热线：{{ tel }}
      </span>
      <span v-if="fixed">
        <a href="">网上认购</a><a href="">立即推荐</a
        ><a
          ><img src="@/assets/img/house/icon_tel.png" alt="" /><span
            >咨询热线 <br />
            0755-88888888</span
          ></a
        >
      </span>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    lists: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: Number,
      default: 1
    },
    tel: {
      type: String,
      default: ''
    }
  },
  methods: {
    tabToggle(item) {
      if (item.path) {
        // this.$router.push({ path: item.path + this.$router.params.id })
        // this.$router.go(-1)
      } else {
        this.$emit('handelToggle', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import 'assets/css/mixin';
.house-tab {
  width: 100%;
  height: 58px;
  line-height: 58px;
  background: #fbfbfb;
  .sc(16px, @globalBlack);

  section {
    position: relative;
    width: 1200px;
    margin: 0 auto;

    ul {
      li {
        height: 58px;
        display: inline-block;
        padding: 0 10px;
        margin: 0 5px;
        cursor: pointer;
        &.cur {
          border-bottom: 4px solid #e62e37;
        }
      }
    }

    span {
      .pbr();
      /*width: 214px;*/

      img {
        vertical-align: -5px;
      }
      a {
        .fs(14px);
        display: inline-block;
        text-align: center;
        width: 158px;

        color: #ffffff;
        &:first-child {
          background: #e62e37;
        }
        &:nth-child(2) {
          background: #ff9131;
        }
        &:nth-child(3) {
          position: relative;
          text-align: center;
          display: inline-block;
          width: 48px;
          background: #f47200;
          &:hover {
            span {
              display: inline-block;
            }
          }
          span {
            display: none;
            .fs(12px);
            text-align: center;
            padding-top: 5px;
            line-height: 20px;
            width: 120px;
            height: 48px;
            position: absolute;
            color: @globalBlack;
            bottom: -64px;
            left: -36px;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
            border-radius: 3px;
            background: #ffffff;
            &:before {
              content: '';
              width: 0;
              height: 0;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid #ffffff;
              position: absolute;
              top: -10px;
              left: 50px;
            }
          }
        }
      }
    }
  }
}
.tab-fixed {
  position: fixed;
  top: 0;
  z-index: 999;
}

.hidden {
  display: none;
}
</style>
