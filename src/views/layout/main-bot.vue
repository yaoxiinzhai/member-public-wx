<template>
  <van-tabbar
    active-color="rgba(82,152,195,1)"
    inactive-color="rgba(136,136,136,1)"
    :placeholder="true"
    v-model="active"
    :z-index="999"
    :route="true"
    fixed
    border
  >
    <van-tabbar-item
      v-for="(item, index) in botNavList"
      :key="index"
      replace
      :to="item.name"
    >
      <span :class="active == index ? 'active' : 'inactive'">{{
        item.meta.menuName
      }}</span>
      <template #icon>
        <van-icon
          :name="item.meta.icon"
          :color="
            active == index ? 'rgba(82,152,195,1)' : 'rgba(136,136,136,1)'
          "
        ></van-icon>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  props: {
    botNavList: {
      typeof: Array,
      default: [],
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="sass" scoped>
.active
  color: rgba(82,152,195,1)
.inactive
  color: rgba(136,136,136,1)
</style>