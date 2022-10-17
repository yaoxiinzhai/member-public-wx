<template>
  <div class="layout-contant">
    <top-nav
      v-if="!hideTopNav"
      :topNavList="topNavList"
      class="layout-topnav"
    ></top-nav>
    <div class="layout-main">
      <router-view />
    </div>
    <bot-nav
      v-if="!hideBotNav"
      :botNavList="botNavList"
      class="layout-botnav"
    ></bot-nav>
  </div>
</template>

<script>
import topNav from "./main-top.vue";
import botNav from "./main-bot.vue";
export default {
  components: {
    topNav,
    botNav,
  },
  data() {
    return {
      topNavList: [],
      botNavList: [],
    };
  },
  computed: {
    hideTopNav: {
      get() {
        return this.$store.state.layout.hideTopNav;
      },
    },
    hideBotNav: {
      get() {
        return this.$store.state.layout.hideBotNav;
      },
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let topNavList = [];
      let botNavList = [];
      this.$store.dispatch("layout/getClientData");
      let routers = this.$router.getRoutes();
      for (let i = 0; i < routers.length; i++) {
        if (Object.keys(routers[i].meta).length > 0) {
          if (routers[i].meta.menu) {
            if (routers[i].meta.menuSite === "top") {
              topNavList.push(routers[i]);
            } else if (routers[i].meta.menuSite === "bottom") {
              botNavList.push(routers[i]);
            }
          }
        }
      }
      this.topNavList = topNavList;
      this.botNavList = botNavList;
    },
  },
};
</script>

<style lang="sass" scoped>
.layout-botnav
  position: fixed
  bottom: 0
  left: 0
  background: #fff
  width: 100%
  z-index: 999
.layout-main
  margin-bottom: 52px
</style>