<template>
  <sidenav
      v-if="showSidenav"
      :custom_class="color"
      :class="[isRTL ? 'fixed-end' : 'fixed-start']"
  />
  <main
      class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden"
  >
    <!-- nav -->
    <navbar
        v-if="showNavbar"
        :class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
        :color="isAbsolute ? 'text-white opacity-8' : ''"
        :min-nav="navbarMinimize"
    />
    <router-view/>
    <app-footer v-show="showFooter"/>
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import {mapMutations, mapState} from "vuex";
import RandomEventUtil from './utils/RandomEventUtil';
export default {
  name: "App",
  components: {
    Sidenav,
    Navbar,
    AppFooter
  },
  data() {
    return {
      messages: "",
      stompClient: null,
      messageList: [],
      text: ""
    }
  },
  computed: {
    ...mapState([
      "isRTL",
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton"
    ])
  },
  beforeMount() {
    const sidenav = document.getElementsByClassName("g-sidenav-show")[0];

    if (window.innerWidth > 1200) {
      sidenav.classList.add("g-sidenav-pinned");
    }
  },
  mounted() {
    let eventUtil = new RandomEventUtil();
    eventUtil.start();
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  }
};
</script>
<style>
.dataTable-pagination-list .active a {
  background-image: linear-gradient(
      195deg,
      #66bb6a 0%,
      #43a047 100%
  ) !important;
}
.t-notification__content{
  white-space: pre;
}
</style>

<style src="./assets/css/index.css"></style>
