<template>
  <nav
    id="navbarBlur"
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    data-scroll="true"
    :class="isAbsolute ? 'mt-4' : 'mt-4'"
  >
    <div class="px-4 py-1 container-fluid">
      <breadcrumbs :current-page="currentRouteName" :color="color" />
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
      >
        <a href="#" class="p-0 nav-link text-body" @click.prevent="minNav">
          <div class="sidenav-toggler-inner open-button">
            <i
              class="sidenav-toggler-line open-button"
              :class="color ? 'bg-white' : ''"
            ></i>
            <i
              class="sidenav-toggler-line open-button"
              :class="color ? 'bg-white' : ''"
            ></i>
            <i
              class="sidenav-toggler-line open-button"
              :class="color ? 'bg-white' : ''"
            ></i>
          </div>
        </a>
      </div>
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
        </div>
        <ul class="navbar-nav justify-content-end">
<!--          <li class="nav-item d-flex align-items-center">-->
<!--            <router-link-->
<!--              :to="{ name: 'Signin Basic' }"-->
<!--              class="px-0 nav-link font-weight-bold lh-1"-->
<!--              :class="color"-->
<!--            >-->
<!--              <i class="material-icons" :class="isRTL ? 'ms-sm-2' : 'me-sm-1'">-->
<!--                account_circle-->
<!--              </i>-->
<!--            </router-link>-->
<!--          </li>-->
<!--          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">-->
<!--            <a-->
<!--              id="iconNavbarSidenav"-->
<!--              href="#"-->
<!--              class="p-0 nav-link text-body lh-1"-->
<!--              @click="toggleSidebar"-->
<!--            >-->
<!--              <div class="sidenav-toggler-inner">-->
<!--                <i class="sidenav-toggler-line"></i>-->
<!--                <i class="sidenav-toggler-line"></i>-->
<!--                <i class="sidenav-toggler-line"></i>-->
<!--              </div>-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="px-3 nav-item d-flex align-items-center">-->
<!--            <a-->
<!--              class="p-0 nav-link lh-1"-->
<!--              :class="color"-->
<!--              @click="toggleConfigurator"-->
<!--            >-->
<!--              <i class="material-icons fixed-plugin-button-nav cursor-pointer">-->
<!--                settings-->
<!--              </i>-->
<!--            </a>-->
<!--          </li>-->
          <li
            class="nav-item dropdown d-flex align-items-center"
            :class="isRTL ? 'ps-2' : 'pe-2'"
          >
            <a
              id="dropdownMenuButton"
              href="#"
              class="p-0 nav-link lh-1"
              :class="[color, showMenu ? 'show' : '']"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <i class="material-icons cursor-pointer"> notifications </i>
            </a>
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <img
                        src="../../assets/img/team-2.jpg"
                        class="avatar avatar-sm me-3"
                        alt="user image"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">跌倒警報</span>
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        13 分鐘前
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div
                      class="my-auto avatar avatar-sm bg-gradient-secondary me-3"
                    >
                      <svg
                        width="12px"
                        height="12px"
                        viewBox="0 0 43 36"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                      >
                        <title>credit-card</title>
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            transform="translate(-2169.000000, -745.000000)"
                            fill="#FFFFFF"
                            fill-rule="nonzero"
                          >
                            <g transform="translate(1716.000000, 291.000000)">
                              <g transform="translate(453.000000, 454.000000)">
                                <path
                                  class="color-background"
                                  d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                  opacity="0.593633743"
                                ></path>
                                <path
                                  class="color-background"
                                  d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        新的設備已經成功接入平台
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        2 天前
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Navbar",
  components: {
    Breadcrumbs,
  },
  props: {
    minNav: {
      type: Function,
      default: () => {},
    },
    color: {
      type: String,
      default: "text-body",
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapState(["isRTL", "isAbsolute"]),
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {
    this.minNav;
  },

  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),

    toggleSidebar() {
      this.navbarMinimize();
    },
  },
};
</script>
