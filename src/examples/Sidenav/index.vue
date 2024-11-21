<template>
  <aside
      id="sidenav-main"
      class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3 my-nav-bar"
      :class="`${
      isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'
    } ${sidebarType}`"
  >
    <div class="sidenav-header">
      <i
          id="iconSidenav"
          class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
          aria-hidden="true"
      ></i>
      <router-link class="m-0 navbar-brand" to="/">
        <img
            :src="
            sidebarType === 'bg-white' ||
            (sidebarType === 'bg-transparent' && !isDarkMode)
              ? logoDark
              : logo
          "
            class="navbar-brand-img h-100"
            style="margin-right: 5px;border-radius: 50%"
            alt="main_logo"
        />
        <span class="ms-1 font-weight-bold text-white"
        >澳門無人機配送平台</span
        >
      </router-link>
    </div>
    <hr class="horizontal light mt-0 mb-2"/>
    <sidenav-list/>
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logos/logo.png";
import logoDark from "@/assets/img/logos/logo.png";
import {mapState} from "vuex";

export default {
  name: "Index",
  components: {
    SidenavList,
  },
  data() {
    return {
      logo,
      logoDark,
      listener: {}
    };
  },
  computed: {
    ...mapState(["isRTL", "sidebarType", "isDarkMode", "isPinned"]),
  },
  mounted() {
    this.setListener();
  },
  methods: {
    setListener() {
      let obj = document.getElementById("sidenav-main");
      let sidenavShow = document.getElementsByClassName("g-sidenav-show")[0]
      function clickHandler(e) {
        if(!e.target.classList.contains("open-button")){
          if (sidenavShow.classList.contains("g-sidenav-pinned")) {
            if (!obj.contains(e.target)) {
              if (window.innerWidth < 1200) {
                console.log("wow")
                sidenavShow.classList.remove("g-sidenav-pinned");
                sidenavShow.classList.add("g-sidenav-hidden");
              }else{
                sidenavShow.classList.remove("g-sidenav-hidden");
              }

              console.log("close")
            }
          }
        }
      }

      this.listener = clickHandler;
      document.addEventListener("click", clickHandler);
    },

  }
};
</script>
