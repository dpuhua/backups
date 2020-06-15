<template>
  <el-dialog
    title="客户购房需求"
    :visible.sync="isShow"
    top="10vh"
    width="650px"
    center
    class="need-detail"
    @close="closeFn"
  >
    <div class="content">
      <h2 class="title">产品类型</h2>
      <el-checkbox-group
        v-model="needDetail.product"
        class="equal-width-product"
      >
        <el-checkbox
          v-for="el in options.product"
          :key="el.productKey"
          :label="el.productKey"
          >{{ el.productValue }}</el-checkbox
        >
      </el-checkbox-group>
      <h2 class="title">面积段</h2>
      <el-checkbox-group v-model="needDetail.area" class="equal-width-area">
        <el-checkbox
          v-for="el in options.area"
          :key="el.productKey"
          :label="el.productKey"
          >{{ el.productValue }}</el-checkbox
        >
      </el-checkbox-group>
      <h2 class="title">户型</h2>
      <el-checkbox-group v-model="needDetail.roomType">
        <el-checkbox
          v-for="el in options.roomType"
          :key="el.productKey"
          :label="el.productKey"
          >{{ el.productValue }}</el-checkbox
        >
      </el-checkbox-group>
      <h2 class="title">购房关注点</h2>
      <el-checkbox-group v-model="needDetail.focus">
        <el-checkbox
          v-for="el in options.focus"
          :key="el.productKey"
          :label="el.productKey"
          >{{ el.productValue }}</el-checkbox
        >
      </el-checkbox-group>
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
    options: {
      type: Object,
      default() {
        return {
          product: [],
          area: [],
          roomType: [],
          focus: []
        }
      }
    }
  },
  data() {
    return {
      isShow: false,
      needDetail: {
        product: [],
        area: [],
        roomType: [],
        focus: []
      }
    }
  },
  watch: {
    value(val) {
      this.isShow = val
    }
  },
  mounted() {},
  methods: {
    closeFn() {
      this.$emit('input', false)
    },
    confirmFn() {
      const label = {
        product: [],
        area: [],
        roomType: [],
        focus: []
      }
      const obj = {
        product: null,
        area: null,
        roomType: null,
        focus: null
      }
      for (const keyStr in this.options) {
        const list = this.options[keyStr]
        if (this.needDetail[keyStr].length) obj[keyStr] = {}
        this.needDetail[keyStr].map((item) => {
          for (let i = 0; i < list.length; i++) {
            const el = list[i]
            if (item === el.productKey) {
              obj[keyStr][el.productKey] = el.productValue
              label[keyStr].push(el.productValue)
              break
            }
          }
        })
      }
      let text = ''
      Object.keys(label).forEach((key) => {
        if (key === 'product' && label[key]) {
          text += `产品类型:${label[key].join(',')};`
        }
        if (key === 'area' && label[key]) {
          text += `面积段:${label[key].join(',')};`
        }
        if (key === 'roomType' && label[key]) {
          text += `户型:${label[key].join(',')};`
        }
        if (key === 'focus' && label[key]) {
          text += `客户购房需求:${label[key].join(',')};`
        }
      })
      this.$emit('confirm', obj, text)
      this.closeFn()
    },
    reset() {
      this.needDetail = {
        product: [],
        area: [],
        roomType: [],
        focus: []
      }
      this.$emit(
        'confirm',
        {
          product: null,
          area: null,
          roomType: null,
          focus: null
        },
        ''
      )
      this.closeFn()
    }
  }
}
</script>

<style lang="less" scoped>
.need-detail {
  font-family: PingFangSC-Regular, PingFang SC;

  .content {
    .title {
      position: relative;
      padding: 0 0 0 13px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(68, 68, 79, 1);
      line-height: 28px;

      &::before {
        content: '';
        width: 4px;
        height: 10px;
        background: rgba(230, 46, 55, 1);
        border-radius: 2px;
        position: absolute;
        top: 9px;
        left: 0;
      }
    }
  }
}

/deep/ .el-checkbox-group {
  padding: 16px 0 16px;

  .el-checkbox__input {
    display: none;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    background: #e62e37;
    color: #fff;
  }
  .el-checkbox {
    margin: 0 32px 16px 0;
  }
  .el-checkbox__label {
    height: 38px;
    text-align: center;
    padding: 0 24px;
    background: rgba(235, 235, 236, 0.5);
    border-radius: 19px;
    line-height: 38px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.equal-width-product /deep/ .el-checkbox__label {
  width: 80px;
  padding: 0;
}
.equal-width-area /deep/ .el-checkbox__label {
  width: 116px;
  padding: 0;
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
    padding: 15px 0 0 40px;
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
