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
                  <div class="des">型號：{{ item.model }}</div>
                  <div class="des">設備軟件版本：{{ item.version }}</div>
                  <div class="des" style="margin-bottom: 20px;">設備序列號：{{ item.serialNumber }}</div>
                  <img src="./../assets/svg/delete.svg" class="r-icon" alt="" @click="openDeleteRoomDialog(item.id);">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <t-dialog
        v-model:visible="createRoomVisible"
        header="新建房間"
        draggable
        :on-confirm="() => (createRoomVisible = false)"
    >
      <template #body>
        <div class="l-row" style="align-items: center;margin: 10px 0;">
          <div class="input-label">房間名稱：</div>
          <t-input v-model="form.friendly_name" style="width: 300px"></t-input>
        </div>
        <div class="l-row" style="align-items: center;margin: 20px 0 10px 0;">
          <div class="input-label">是否關注：</div>
          <t-switch v-model="form.favourite_room" size="large"></t-switch>
        </div>
      </template>
      <template #footer>
        <t-button theme="success" :loading="isRequesting" @click="createRoom">確定</t-button>
      </template>
    </t-dialog>

    <t-dialog
        v-model:visible="deleteRoomVisible"
        header="刪除房間"
        draggable
    >
      <template #body>
        您確定要刪除這個房間嗎？<strong style="color: red">該操作不可逆!</strong>
      </template>
      <template #footer>
        <t-button theme="success" :loading="isRequesting" @click="deleteRoom">確定</t-button>
      </template>
    </t-dialog>
  </div>
</template>
<script>
// import {MessagePlugin} from "tdesign-vue-next";
import devices from "./data/Drones"
import {background} from "quill/ui/icons";

export default {
  name: "SideNavItem",
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
    openRoomPage(roomId) {
      this.$router.push({path: '/info/SingleRoom', query: {roomId}})
    }

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
