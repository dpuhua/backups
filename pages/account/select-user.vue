<template>
  <div class="pages">
    <h2 class="title">用户信息选择</h2>
    <p class="sub-title">
      请选择想要保存的个人信息，确认后将同步至恒大统一用户中心
    </p>
    <div
      v-for="(list, index) in userData"
      :key="index"
      class="user-list"
      :class="{ 'icon-checked': index === selectIndex }"
      @click="selectIndex = index"
    >
      <div class="item">
        <p class="name">姓名</p>
        <p class="info">{{ list.name }}</p>
      </div>
      <div class="item">
        <p class="name">证件类型</p>
        <p class="info">{{ list.id_card_type }}</p>
      </div>
      <div class="item">
        <p class="name">证件号码</p>
        <p class="info">{{ list.id_card }}</p>
      </div>
    </div>

    <div class="btn-box">
      <el-button class="submit-btn" type="danger">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0,
      userData: [
        {
          name: '何进明',
          id_card_type: '身份证',
          id_card: '431100190004037813'
        },
        {
          name: '潘敏敏',
          id_card_type: '身份证',
          id_card: '431100190004037813'
        }
      ]
    }
  },
  methods: {
    selectUser(index) {
      this.selectIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/global.less';

.pages {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0;

  .title {
    margin-bottom: 28px;
    font-size: 28px;
    font-weight: bold;
    color: rgba(230, 46, 55, 1);
    line-height: 32px;
  }

  .sub-title {
    margin-bottom: 24px;
    font-size: 16px;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;
  }

  .user-list {
    padding: 26px 60px 26px 48px;
    background-color: rgba(255, 255, 255, 1);
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: 1105px center;
    background-image: url('~@/assets/img/account/icon_sel_radio.png');
    box-shadow: 0 4px 22px -4px rgba(227, 227, 227, 1);
    border-radius: 10px;
    font-size: 16px;
    color: rgba(131, 130, 136, 1);
    line-height: 22px;
    cursor: pointer;

    & + .user-list {
      margin-top: 32px;
    }

    &.icon-checked {
      background-image: url('~@/assets/img/account/icon_sel_radio_sel.png');
    }

    .item {
      height: 22px;

      & + .item {
        margin-top: 16px;
      }

      .name {
        &:extend(.fl);
        width: 64px;
        text-align: right;
        color: rgba(131, 130, 136, 1);
      }

      .info {
        margin-left: 100px;
      }
    }
  }

  .btn-box {
    margin-top: 50px;

    .submit-btn {
      display: block;
      width: 390px;
      height: 64px;
      margin: 0 auto;
      box-shadow: 0px 9px 12px -4px rgba(255, 210, 212, 1);
      border-radius: 6px;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
