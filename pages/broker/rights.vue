<template>
  <div class="rights-min">
    <div class="vip-info-wrap">
      <div class="title-wrap">
        <h3 class="title">我的权益</h3>
        <a class="r-link" href>查看明细 &gt;</a>
      </div>
    </div>
    <div class="vip-righit-wrap">
      <!-- 交互说明 当有会员状态的时候 在LI上面添加active -->
      <!-- 交互说明 点击后的悬浮状态 在LI上面添加on -->
      <ul class="rights-tab">
        <li
          v-for="(item, index) of tabtitle"
          :key="index"
          :class="tabsClass(index)"
        >
          <a href="javascript:;" @click="tabsActive(index)">
            <i class="icon-location">
              <img src="~@/assets/img/account/vip/icon_loction.png" alt /> </i
            >{{ tabtitle[index] }}
          </a>
        </li>
      </ul>
      <div :class="tabMin(this.tabIndex)">
        <div class="rights-tips default-wrap">
          <h3>普通会员等级权益：</h3>
          <h4>（一）活动时间：2020年5月11日至6月30日</h4>
          <h4>（二）会员权益</h4>
          <ul>
            <li>
              普通会员成功推荐客户购房的，给予普通会员推荐成交房屋总价2%佣金奖励；
            </li>
          </ul>
          <h4>（三）会员等级核定</h4>
          <ul>
            <li>
              （1）近三个月累计推荐成交套数达到10套或当月推荐成交套数达到5套的，达到相应套数后次日晋升为至尊会员；
            </li>
            <li>
              （2）近三个月累计推荐成交套数达到5套或当月推荐成交套数达到3套的，达到相应套数后次日晋级为钻石会员；
            </li>
            <li>
              （3）近三个月累计推荐成交套数达到3套或当月推荐成交套数达到2套的，达到相应套数后次日晋级为黄金会员。
            </li>
          </ul>
        </div>
        <div class="rights-tips gold-wrap">
          <h3>黄金会员等级权益：</h3>
          <h4>（一）活动时间：2020年4月11日至12月31日</h4>
          <h4>（二）会员权益</h4>
          <ul>
            <li>
              （1）黄金会员成功推荐客户购房的，给予黄金会员推荐成交房屋总价2.5%佣金奖励；
            </li>
            <li>
              （2）新晋升的黄金会员，平台将发放1张10000元的购房券。每成功推荐1名客户进行网上认购后，平台再向其发放1张面值10000元的购房券，购房券可给予其推荐的客户使用。
            </li>
          </ul>
          <h4>（三）会员等级核定</h4>
          <ul>
            <li>
              （1）近三个月累计推荐成交套数达到10套或当月推荐成交套数达到5套的，达到相应套数后次日晋升为至尊会员；
            </li>
            <li>
              （2）近三个月累计推荐成交套数达到5套或当月推荐成交套数达到3套的，达到相应套数后次月晋级为钻石会员；
            </li>
            <li>
              （3）每月1日将对会员等级进行重新核定，若黄金会员在近3个月无推荐成交的，会员等级降至普通会员；
            </li>
            <li>
              （4）黄金会员降级后，如重新完成推荐成交，则从成交次日起恢复至黄金会员。
            </li>
          </ul>
        </div>
        <div class="rights-tips demon-wrap">
          <h3>钻石会员登记权益</h3>
          <h4>（一）活动时间：2020年4月11日至12月31日</h4>
          <h4>（二）会员权益</h4>
          <ul>
            <li>
              （1）钻石会员成功推荐客户购房的，给予钻石会员推荐成交房屋总价3%佣金奖励；
            </li>
            <li>
              （2）新晋升的钻石会员，平台将发放1张10000元的购房券。每成功推荐1名客户进行网上认购后，平台再向其发放1张面值10000元的购房券，购房券可给予其推荐的客户使用。
            </li>
          </ul>
          <h4>（三）会员等级核定</h4>
          <ul>
            <li>
              （1）近三个月累计推荐成交套数达到10套或当月推荐成交套数达到5套的，达到相应套数后次日晋升为至尊会员；
            </li>
            <li>
              （2）每月1日将对会员等级进行重新核定，若钻石会员在近3个月无推荐成交的，会员等级降至普通会员；
            </li>
            <li>
              （3）钻石会员降级后，如重新完成推荐成交，则从成交次日起恢复至钻石会员。
            </li>
          </ul>
        </div>
        <div class="rights-tips extreme-wrap">
          <h3>至尊会员等级权益：</h3>
          <h4>（一）活动时间：2020年4月11日至12月31日</h4>
          <h4>（二）会员权益</h4>
          <ul>
            <li>
              （1）至尊会员成功推荐客户购房的，给予至尊会员推荐成交房屋总价3.5%佣金奖励；
            </li>
            <li>
              （2）新晋升的至尊会员，平台将发放1张10000元的购房券。每成功推荐1名客户进行网上认购后，平台再向其发放1张面值10000元的购房券，购房券可给予其推荐的客户使用。
            </li>
          </ul>
          <h4>（三）会员等级核定</h4>
          <ul>
            <li>
              （1）每月1日将对会员等级进行重新核定，若至尊会员在近3个月无推荐成交的，会员等级降至普通会员；
            </li>
            <li>
              （2）至尊会员降级后，如重新完成推荐成交，则从成交次日起恢复至至尊会员。
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tabtitle: ['普通会员', '黄金会员', '钻石会员', '至尊会员'],
      tabIndex: 0
      // tabActive: 0
    }
  },
  computed: {
    tabActive() {
      return this.$store.state.memberInfo.memberType
    }
  },
  methods: {
    tabsActive(index) {
      this.tabIndex = index
    },
    tabsClass(index) {
      return {
        on: this.tabIndex == index,
        active: this.tabActive == index
      }
    },
    tabMin(index) {
      return (
        {
          0: 'default',
          1: 'gold',
          2: 'demon',
          3: 'extreme'
        }[index] || 'default'
      )
    }
  }
}
</script>

<style lang="less" scoped>
body {
  height: 100%;
  min-height: 100%;
}
.rights-min {
  min-height: 566px;
  background: #ffffff;
}
.vip-info-wrap {
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 27px;

  .title-wrap {
    padding: 0 21px 0 31px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px #ebebec solid;
    .title {
      float: left;
      width: 200px;
      font-size: 20px;
      color: #44444f;
    }
    .r-link {
      display: block;
      float: right;
      color: #a8a9ae;
    }
  }
}

.vip-righit-wrap {
  .rights-tab {
    display: block;
    overflow: hidden;
    margin-bottom: 26px;
    padding: 0 13px;
    li {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      text-align: center;
      color: #c5c5c5;
      margin-right: 20px;

      a {
        color: #c5c5c5;

        border-bottom: 4px solid #ffffff;
        height: 32px;
        line-height: 36px;
        display: inline-block;
        position: relative;
        .icon-location {
          display: none;
          width: 9px;
          height: 14px;
          vertical-align: -14px;
          line-height: 36px;
          margin-right: 2px;
        }
      }
      &.active {
        color: #e62e37;
        background: linear-gradient(180deg, #fef1f2 0%, #ffffff 100%);
        a {
          color: #e62e37;
          .icon-location {
            display: inline-block;
          }
        }
      }
      &.on {
        color: #e62e37;

        a {
          color: #e62e37;
          border-bottom: 4px solid #e62e37;
        }
      }
    }
  }
  .rights-tips {
    padding: 0 36px;
    font-size: 14px;
    font-weight: 400;
    color: #44444f;
    line-height: 22px;
    h3 {
      color: #44444f;
      font-size: 18px;
    }
    h4 {
      font-size: 16px;
      color: #44444f;
      margin-top: 18px;
    }
    ul {
      text-align: justify;
      margin-bottom: 18px;
    }
  }
  .default-wrap,
  .gold-wrap,
  .demon-wrap,
  .extreme-wrap {
    display: none;
  }
  .default {
    .default-wrap {
      display: block;
    }
  }
  .gold {
    .gold-wrap {
      display: block;
    }
  }
  .demon {
    .demon-wrap {
      display: block;
    }
  }
  .extreme {
    .extreme-wrap {
      display: block;
    }
  }
}
</style>
