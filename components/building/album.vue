<template>
  <section class="house-image">
    <div v-for="(item, index) in this.buildAlbum" :key="index">
      <article>{{ item.typeName }}({{ item.picItems.length }})</article>
      <ul>
        <li v-for="(childItem, childIndex) in item.picItems" :key="childIndex">
          <img :src="childItem.coverPisUrl" alt="" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['buildAlbum'])
  },
  mounted() {}
}
</script>

<style scoped lang="less">
@import 'assets/css/mixin';
.house-image {
  margin-top: 24px;

  article {
    .fs(24px);
  }

  ul {
    margin: 24px 0 40px 0;
    max-width: 760px;

    li {
      .fixLastMargin(16px);
      display: inline-block;
      margin-bottom: 16px;

      img {
        display: inline-block;
        .wh(170px, 127px);
        background: @globalNull;
      }
    }
  }
}
</style>
