<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col-lg-12 mt-lg-0">
        <div id="profile" class="card card-body mt-4"  style="min-height: 381.484px">
          <div class="row align-items-flex">
            <div class="l-container">

              <div class="l-row">
                <t-button theme="success" style="margin-left: 10px;" @click="createRoomVisible = true">
                  <template #icon>
                    <add-icon/>
                  </template>
                  創建攝像頭
                </t-button>
                <t-button theme="primary" style="margin-left: 10px;" @click="getCameras(()=>{})">
                  <template #icon>
                    <refresh-icon/>
                  </template>
                  刷新數據
                </t-button>
              </div>
              <div v-if="!hasData"  class="loading-box" style="margin-top: 60px;">
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

                <div v-for="(item,index) in cameras" :key="index" class="my-card" @click="openCameraViewPage(item.id)">
                  <img src="https://shop.altumview.ca/cdn/shop/files/71yaAz9xfTL._AC_SL1500_1080x.jpg?v=1690266113"
                       class="item-img"
                       alt="">
                  <div class="title">{{ item.friendly_name }}</div>
                  <div class="des">型號：{{ item.model }}</div>
                  <div class="des">設備軟件版本：{{ item.version }}</div>
                  <div class="des" style="margin-bottom: 20px;">設備序列號：{{ item.serial_number }}</div>
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
        header="移除設備"
        draggable
    >
      <template #body>
        <strong style="color: red">警告！</strong>您確定要移除此設備嗎？<strong style="color: red">該操作不可逆!</strong>
      </template>
      <template #footer>
        <t-button theme="success" :loading="isRequesting">確定</t-button>
      </template>
    </t-dialog>
  </div>
</template>
<script>
import LetoyService from "@/utils/JSLetoyService";
import {AddIcon, RefreshIcon} from "tdesign-icons-vue-next";
import {MessagePlugin} from "tdesign-vue-next";

export default {
  name: "SideNavItem",
  components: {RefreshIcon, AddIcon},
  data() {
    return {
      roomId:"",
      cameras: [],
      createRoomVisible: false,
      deleteRoomVisible: false,
      isRequesting: false,
      deleteRoomId: "",
      form: {
        friendly_name: "",
        favourite_room: false
      },
      hasData:false
    };
  },
  mounted() {
    this.roomId = this.$route.query["roomId"];
    this.getCameras(()=>{

    })
  },
  methods: {
    getCameras(anotherAction) {
      this.hasData  = false;
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetCamerasByRoomId",
          "POST",
          null,
          {
            id:this.roomId
          })
          .then((res) => {
            console.log(JSON.parse(res.data))
            this.cameras = JSON.parse(res.data).cameras.array;
            this.cameras.push({
              "room_id": 8107,
              "friendly_name": "智能Camera S0004",
              "wifi_strength": -36,
              "updating_status": 0,
              "is_calibrated": true,
              "is_update_available": false,
              "device_type": 0,
              "serial_number": "2372487D464D7BEE",
              "version": "CN-1.1.254",
              "background_type": 1,
              "model": "AV-G3-0WF6",
              "id": 17472,
              "status": 1
            })
            this.cameras.push({
              "room_id": 8107,
              "friendly_name": "智能Camera S0005",
              "wifi_strength": -36,
              "updating_status": 0,
              "is_calibrated": true,
              "is_update_available": false,
              "device_type": 0,
              "serial_number": "2372487D464D7BEE",
              "version": "CN-1.1.254",
              "background_type": 1,
              "model": "AV-G3-0WF6",
              "id": 17472,
              "status": 1
            })
            this.cameras.push({
              "room_id": 8107,
              "friendly_name": "智能Camera S0013",
              "wifi_strength": -36,
              "updating_status": 0,
              "is_calibrated": true,
              "is_update_available": false,
              "device_type": 0,
              "serial_number": "2372487D464D7BEE",
              "version": "CN-1.1.254",
              "background_type": 1,
              "model": "AV-G3-0WF6",
              "id": 17472,
              "status": 1
            })
          })
          .finally(() => {
            this.hasData = true;
            anotherAction();
          })
    },
    createRoom() {
      this.isRequesting = true;
      let isSuccess = false;
      LetoyService.authorizationRequest(
          "ThirdPlatform/CreateRoom",
          "POST",
          null,
          this.form)
          .then((res) => {
            if (res.status === 0) {
              isSuccess = true;
              this.getRooms(() => {
                MessagePlugin.success("創建房間成功！", 2000);
                this.isRequesting = false;
                this.form = {
                  friendly_name: "",
                  favourite_room: false
                }
                this.createRoomVisible = false;
              });
            }

          })
          .finally(() => {
            if (!isSuccess) {
              this.isRequesting = false;
              this.form = {
                friendly_name: "",
                favourite_room: false
              }
              this.createRoomVisible = false;
            }
          })
    },
    openDeleteRoomDialog(id) {
      this.deleteRoomVisible = true;
      this.deleteRoomId = id;
    },
    openCameraViewPage(cameraId){
      this.$router.push({path:'/info/MQTTDemo',query:{cameraId}})
    }


  }
};
</script>
<style src="./../assets/css/SingleRoom.css" scoped></style>
<style>
.t-switch.t-is-checked {
  background-color: #52BE8B;
}

.t-switch.t-is-checked:hover {
  background-color: #48a87b;
}
</style>
