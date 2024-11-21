<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100 my-nav-bar"
  >
    <ul class="navbar-nav">
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="brooklynAlice"
          nav-text="工程師 王"
          :class="getRoute() === 'brooklynAlice' ? 'active' : ''"
        >
          <template #icon>
            <img src="../../assets/img/team-3.jpg" class="avatar"  alt=""/>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Profile Overview' }"
                mini-icon="資"
                text="個人資料"
              />
              <sidenav-item
                :to="{ name: 'Settings' }"
                mini-icon="設"
                text="設置"
              />
              <sidenav-item
                :to="{ name: 'Signin Basic' }"
                mini-icon="退"
                text="登出"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <hr class="horizontal light mt-2 mb-2" />

      <li class="nav-item">
        <sidenav-collapse
            collapse-ref=""
            :class="getFullRoutes() === '/dashboards/Home' ? 'active' : ''"
            nav-text="首頁"
            :collapse="false"
            collapse-name="Home"
            url="#"
            :aria-controls="''"
            :to="{path:'/dashboards/Home'}"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">apps</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
            collapse-ref=""
            :class="getFullRoutes() === '/info/Map' ? 'active' : ''"
            nav-text="配送地圖"
            :collapse="false"
            collapse-name="Map"
            url="#"
            :aria-controls="''"
            :to="{path:'/info/Map'}"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">pin_drop</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
            collapse-ref=""
            :class="getFullRoutes() === '/info/DroneManage' ? 'active' : ''"
            nav-text="無人機管理"
            :collapse="false"
            collapse-name="DroneManage"
            url="#"
            :aria-controls="''"
            :to="{path:'/info/DroneManage'}"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">flight</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
            collapse-ref=""
            :class="getFullRoutes() === '/info/WarehouseManage' ? 'active' : ''"
            nav-text="無人機站点"
            :collapse="false"
            collapse-name="WarehouseManage"
            url="#"
            :aria-controls="''"
            :to="{path:'/info/WarehouseManage'}"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">warehouse</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
            collapse-ref=""
            :class="getFullRoutes() === '/info/MonitorEquipmentManage' ? 'active' : ''"
            nav-text="監測設備管理"
            :collapse="false"
            collapse-name="MonitorEquipmentManage"
            url="#"
            :aria-controls="''"
            :to="{path:'/info/MonitorEquipmentManage'}"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">devices</i>
          </template>
        </sidenav-collapse>
      </li>


      <li class="nav-item">
        <sidenav-collapse
            collapse-ref=""
            :class="getFullRoutes() === '/dashboards/EmployeeManagement' ? 'active' : ''"
            nav-text="員工管理"
            :collapse="false"
            collapse-name="EmployeeManagement"
            url="#"
            :aria-controls="''"
            :to="{path:'/dashboards/EmployeeManagement'}"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">groups</i>
          </template>
        </sidenav-collapse>
      </li>


<!--      <li class="nav-item">-->
<!--        <sidenav-collapse-->
<!--            collapse-ref=""-->
<!--            :class="getFullRoutes() === '/info/MQTTDemo' ? 'active' : ''"-->
<!--            nav-text="攝像頭實時畫面"-->
<!--            :collapse="false"-->
<!--            collapse-name="InTellingAssist"-->
<!--            url="#"-->
<!--            :aria-controls="''"-->
<!--            :to="{path:'/info/MQTTDemo'}"-->
<!--        >-->
<!--          <template #icon>-->
<!--            <i class="material-icons-round opacity-10">videocam</i>-->
<!--          </template>-->
<!--        </sidenav-collapse>-->
<!--      </li>-->





<!--      <li class="nav-item" :class="getRoute() === 'spts' ? 'active' : ''">-->
<!--        <sidenav-collapse-->
<!--            collapse-ref="dashboardsExamples"-->
<!--            nav-text="攝像頭"-->
<!--            :class="getRoute() === 'spts' ? 'active' : ''"-->
<!--        >-->
<!--          <template #icon>-->
<!--            <i class="material-icons-round opacity-10">videocam</i>-->
<!--          </template>-->
<!--          <template #list>-->
<!--            <ul class="nav pe-0">-->
<!--              &lt;!&ndash; nav links &ndash;&gt;-->
<!--              <sidenav-item-->
<!--                  :to="{ path:'/spts/MQTTDemo' }"-->
<!--                  mini-icon="攝"-->
<!--                  text="攝像頭實時畫面"-->
<!--              />-->
<!--              <sidenav-item-->
<!--                  :to="{ name: 'Sales' }"-->
<!--                  mini-icon="S"-->
<!--                  text="Sales"-->
<!--              />-->
<!--            </ul>-->
<!--          </template>-->
<!--        </sidenav-collapse>-->
<!--      </li>-->

    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import { mapState } from "vuex";
export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    SidenavCollapse,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  computed: {
    ...mapState(["isRTL"])
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    getFullRoutes() {
      return this.$route.fullPath;
    }
  }
};
</script>
