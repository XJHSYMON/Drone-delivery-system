<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col-lg-12 mt-lg-0">
        <div id="profile" class="card card-body mt-4" style="min-height: 232px">
          <div class="row align-items-flex">
            <div class="l-container">
              <div v-if="!hasData" class="loading-box">
                <div class="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              <div v-if="hasData" class="l-row" style="flex-wrap: wrap">
                <div v-for="(item,index) in devices" :key="index" class="my-card" :style="{background:item.color}">
                  <img :src="item.imgUrl"
                       class="item-img"
                       alt="">
                  <div class="title">{{ item.name }}</div>
                  <div class="des">站點類型：{{ item.model }}</div>
                  <div class="des">站點服務版本：{{ item.version }}</div>
                  <div class="des" style="margin-bottom: 20px;">站點編號：{{ item.serialNumber }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {MessagePlugin} from "tdesign-vue-next";
import devices from "./data/Warehouses"
import {background} from "quill/ui/icons";

export default {
  name: "Warehouse",
  data() {
    return {
      rooms: [],
      createRoomVisible: false,
      deleteRoomVisible: false,
      isRequesting: false,
      deleteRoomId: "",
      form: {
        friendly_name: "",
        favourite_room: false
      },
      hasData: true,
      devices: devices.data
    };
  },
  mounted() {

  },
  methods: {
    background,
  }
};
</script>
<style src="./../assets/css/DeviceInfo.css" scoped></style>
<style>
.t-switch.t-is-checked {
  background-color: #52BE8B;
}

.t-switch.t-is-checked:hover {
  background-color: #48a87b;
}
</style>
