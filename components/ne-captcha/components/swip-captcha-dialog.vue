<template>
  <el-dialog
    :visible.sync="show"
    :show-close="true"
    width="336px"
    :close-on-click-modal="false"
  >
    <div class="drag-box">
      <div ref="drag" class="drag"></div>
    </div>
  </el-dialog>
</template>

<script>
import { load163DunScript } from '@/utils/utils'
const WY_CAPTCHAID = '185403fe7eca457a964b8daa4960b55c'
export default {
  props: {
    onFit: { type: Function, default: () => {} }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    show(val) {
      if (val) this.initDun()
    }
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    initDun() {
      if (this.captchaIns) {
        this.captchaIns.refresh()
        return
      }
      load163DunScript().then((initNECaptcha) => {
        const el = this.$refs.drag
        if (!el) return

        initNECaptcha(
          {
            captchaId: WY_CAPTCHAID,
            element: el,
            mode: 'embed',
            width: el.clientWidth,
            onVerify: (err, data) => {
              if (!err) this.fit(data)
            }
          },
          (instance) => {
            // 初始化成功
            this.captchaIns = instance
          },
          (err) => {
            // 初始化失败
            console.log(err)
          }
        )
      })
    },
    fit(data) {
      this.onFit(data)
    },
    destroy() {
      this.captchaIns.destroy()
    }
  }
}
</script>

<style lang="less" scoped>
.drag-box {
  .drag {
    width: 256px;
    height: 184px;
    margin: 0 auto;
  }
}
</style>
