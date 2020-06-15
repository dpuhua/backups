<template>
  <div class="index-layout">
    <nuxt />
    <account-dialog></account-dialog>
  </div>
</template>

<script>
import AccountDialog from '@/components/account'
export default {
  components: {
    AccountDialog
  }
}
</script>
<style lang="less" scoped></style>
