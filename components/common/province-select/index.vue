<template>
  <el-dialog
    title="提示"
    :visible.sync="psValue"
    width="640px"
    center
    class="province-select"
    @close="closeFn"
  >
    <div class="ps-content">
      <div
        v-for="item in psColumn"
        :key="item.id"
        class="ps-item"
        :class="{ select: current.id === item.id }"
        @click="selectFn(item)"
      >
        {{ item.province }}
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary" @click="confirmFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    defaultId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      psColumn: [],
      psValue: false,
      current: ''
    }
  },
  watch: {
    columns(val) {
      // this.current = ''
      this.psColumn = val
      this.select(this.defaultId)
    },
    defaultId(val) {
      this.select(val)
    },
    value(val) {
      this.psValue = val
    }
  },
  mounted() {
    this.psColumn = this.columns
    this.psValue = this.value
  },
  methods: {
    select(val) {
      if (
        val === this.current.province ||
        String(val) === String(this.current.id)
      ) {
        return
      }
      const current = this.psColumn.find((item) => {
        return item.province === val || String(item.id) === String(val)
      })
      if (current) {
        this.current = current
        this.$emit('confirm', this.current)
      }
    },
    selectFn(item) {
      // :class="{ select: current.id === item.id }"
      // if (item.id === this.current.id) {
      //   this.current = ''
      // } else {
      this.current = item
      // }
    },
    closeFn() {
      this.$emit('input', false)
    },
    confirmFn() {
      this.$emit('confirm', this.current)
      this.closeFn()
    }
  }
}
</script>

<style lang="less" scoped>
.province-select {
  font-family: PingFangSC-Regular, PingFang SC;
  .ps-content {
    overflow: auto;

    .ps-item {
      display: inline-block;
      margin: 0 40px 16px 0;
      font-size: 16px;
      font-weight: 400;
      color: rgba(68, 68, 79, 1);
      height: 22px;
      line-height: 22px;
      text-align: center;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      cursor: pointer;
      &.select {
        color: red;
      }
    }
  }
}

/deep/ .el-dialog {
  border-radius: 8px;

  .el-dialog__header {
    padding: 16px 20px 16px;

    .el-dialog__title {
      line-height: 24px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: rgba(68, 68, 79, 1);
    }
  }

  .el-dialog__body {
    height: 204px;
    box-sizing: border-box;
    padding: 16px 0 0 40px;
    border-top: 1px solid #ebebec;
    border-bottom: 1px solid #ebebec;
  }

  .el-dialog__footer {
    padding: 20px 0 24px;
    .el-button--default {
      width: 130px;
      height: 44px;
      border-radius: 6px;
      border: 1px solid rgba(169, 168, 174, 1);
      font-size: 16px;
    }

    .el-button--primary {
      width: 130px;
      height: 44px;
      background: rgba(230, 46, 55, 1);
      border-radius: 6px;
      border: 1px solid rgba(230, 46, 55, 1);
      font-size: 16px;
    }
  }
}
</style>
