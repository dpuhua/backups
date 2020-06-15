<template>
  <el-dialog :visible.sync="dialogVisible">
    <login v-if="dialogType === 'login'" @switch="handleSwitch" />
    <register v-else-if="dialogType === 'register'" @switch="handleSwitch" />
    <forgot v-else @switch="handleSwitch" />
  </el-dialog>
</template>

<script>
import Login from './components/login'
import register from './components/register'
import forgot from './components/forgot'
export default {
  components: {
    Login,
    register,
    forgot
  },
  data() {
    return {
      visible: true,
      dialogType: 'login', // login 登录 register 注册 forgot 忘记密码
      phone: ''
    }
  },
  computed: {
    dialogVisible: {
      set(val) {
        if (val) this.$store.commit('layout/showAccountDialog')
        else this.$store.commit('layout/hideAccountDialog')
      },
      get() {
        return this.$store.state.layout.accountDialog
      }
    }
  },
  methods: {
    handleSwitch(dialogType) {
      this.dialogType = dialogType
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/global.less';

/deep/ .el-dialog {
  .center;
  margin-top: 0 !important;
  width: 530px;
  border-radius: 8px;
  overflow: hidden;
  color: rgba(68, 68, 79, 1);

  .upgrade-dialog & {
    width: 446px;
  }

  .error-dialog & {
    width: 388px;
  }

  .drag-dialog & {
    width: 336px;

    .el-dialog__headerbtn {
      top: 10px;
      right: 10px;
    }
  }

  &__header,
  &__body {
    padding: 0;
  }

  &__headerbtn {
    top: 20px;
    right: 30px;
    font-size: 22px;
    line-height: 24px;
    font-weight: bold;

    .el-dialog__close {
      color: rgba(169, 168, 174, 1);

      &:hover {
        color: rgba(131, 130, 136, 1);
      }
    }
  }
}
</style>
