<template>
  <el-dialog
    title="选择楼盘"
    :visible.sync="psValue"
    top="10vh"
    width="640px"
    center
    class="province-select"
    @close="closeFn"
  >
    <div class="pop-index-bar__sidebar">
      <span
        v-for="item in sidebarData"
        :key="item"
        class="pop-index-bar__index"
        @click="onClick(item)"
        >{{ item }}</span
      >
    </div>
    <div class="pop-content">
      <div class="pop-index-bar-list">
        <div v-for="item in psColumn" :key="item.label" :ref="item.label">
          <div
            v-for="(item1, index) in item.children"
            :key="item1.buildId"
            class="pop-index-bar-item van-hairline--top"
            :class="{ isSelect: item1.id === current.id }"
            @click="onchange(item1)"
          >
            <span v-show="index === 0" class="label">{{ item.label }}</span
            >{{ item1.buildName
            }}<img src="@/assets/img/form/icon_duihao.png" />
          </div>
        </div>
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
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    defaultValue: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      psColumn: [],
      firstShow: false,
      current: '',
      psValue: false,
      activeId: '',
      sidebarData: []
    }
  },
  watch: {
    columns(val) {
      this.current = ''
      this.psColumn = JSON.parse(JSON.stringify(val))
      this.select(this.activeId)
    },
    defaultValue(val) {
      this.activeId = val
      this.select(val)
    },
    value(val) {
      this.psValue = val
      if (val) this.firstShow = true
    },
    firstShow(val) {
      this.$nextTick(() => {
        if (val && this.current.label)
          this.$refs[this.current.label][0].scrollIntoView()
      })
    }
  },
  mounted() {
    this.psColumn = JSON.parse(JSON.stringify(this.columns))
    this.activeId = this.defaultValue
    this.select(this.activeId)
  },
  methods: {
    closeFn() {
      this.$emit('input', false)
    },
    select(target = '') {
      if (target === this.current.buildName || target === this.current.id) {
        return
      }
      this.sidebarData = []

      for (let i = 0; i < this.psColumn.length; i++) {
        const item = this.psColumn[i]
        this.sidebarData.push(item.label)
        for (let k = 0; k < item.children.length; k++) {
          const item1 = item.children[k]
          if (item1.id === target) {
            this.current = item1
            this.current.label = item.label
            this.$emit('confirm', this.current)
          }
        }
      }
    },
    confirmFn() {
      this.$emit('confirm', this.current)
      this.closeFn()
    },
    onClick(item) {
      if (this.$refs[item]) {
        this.$refs[item][0].scrollIntoView()
      }
    },
    onchange(item) {
      this.current = item
    }
  }
}
</script>

<style lang="less" scoped>
.province-select {
  font-family: PingFangSC-Regular, PingFang SC;

  .pop-index-bar__sidebar {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    text-align: center;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;

    span {
      padding: 0 22px 0 8px;
      font-weight: 500;
      font-size: 20px;
      color: #e62e37;
      line-height: 22px;
    }
  }
  .pop-content {
    position: relative;
    // display: flex;
    // height: 935px;
    flex-wrap: wrap;
    padding: 0 0 16px 0;
    overflow: auto;
    scroll-behavior: smooth;

    &.isIphonex {
      padding-bottom: 84px;
    }

    .pop-index-bar-list {
      padding: 0 32px 0 0;

      .pop-index-bar-item {
        position: relative;
        padding-left: 55px;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        color: rgba(39, 45, 56, 1);

        .label {
          font-size: 20px;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        img {
          position: relative;
          width: 16px;
          height: 16px;
          top: 2px;
          margin-left: 8px;
          display: none;
        }

        &.isSelect {
          color: #e62e37;

          img {
            display: inline-block;
          }
        }
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
    height: 505px;
    box-sizing: border-box;
    padding: 10px 0 0 52px;
    border-top: 1px solid #ebebec;
    border-bottom: 1px solid #ebebec;
    overflow-y: auto;
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
