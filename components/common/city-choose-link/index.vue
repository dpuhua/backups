<template>
  <span class="location" @click="goCity"
    >{{ city.cityName
    }}<img src="~@/assets/img/home/icon_basic_location.png" alt="location"
  /></span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    redirect: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    goCity() {
      const url = this.redirect || window.location.href
      location.href = `/city?back=${encodeURIComponent(url)}`
    }
  }
}
</script>

<style lang="less" scoped>
.location {
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
  padding: 3px 13px;
  &:hover {
    border: 1px solid rgba(230, 46, 55, 1);
    color: #e62e37;
  }
}
</style>
