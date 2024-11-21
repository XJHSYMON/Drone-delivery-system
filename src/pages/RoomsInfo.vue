<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col-lg-12 mt-lg-0">
        <div id="profile" class="card card-body mt-4" style="min-height: 232px">
          <div class="row align-items-flex">
            <div class="l-container">
              <div class="l-row">
                <t-button theme="success" style="margin-left: 10px;" @click="createRoomVisible = true">
                  <template #icon>
                    <add-icon/>
                  </template>
                  創建房間
                </t-button>
                <t-button theme="primary" style="margin-left: 10px;" @click="getRooms(()=>{})">
                  <template #icon>
                    <refresh-icon/>
                  </template>
                  刷新數據
                </t-button>
              </div>
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
              <div v-if="hasData" class="l-row" style="flex-wrap: wrap;transition: 0.5s">
                <div v-for="(item,index) in rooms" :key="index" class="my-card bg-1" @click="openRoomPage(item.id)">
                  <img v-if="item.favourite_room === 0" src="./../assets/svg/favorite.svg" class="icon" alt="">
                  <img v-if="item.favourite_room === 1" src="./../assets/svg/favorite-like.svg" class="icon" alt="">
                  <div class="overlay"></div>
                  <div class="title">{{ item.friendly_name }}</div>
                  <div class="des">在線設備數量：{{ item.online_camera_count }}</div>
                  <div class="des" style="margin-bottom: 20px;">總共設備數量：{{ item.camera_count }}</div>
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
import LetoyService from "@/utils/JSLetoyService";
import {AddIcon, RefreshIcon} from "tdesign-icons-vue-next";
import {MessagePlugin} from "tdesign-vue-next";

export default {
  name: "SideNavItem",
  components: {RefreshIcon, AddIcon},
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
      hasData: false
    };
  },
  mounted() {
    this.getRooms(() => {
    });
  },
  methods: {
    getRooms(anotherAction) {
      this.hasData = false;
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetRooms",
          "POST",
          null,
          null)
          .then((res) => {
            this.rooms = JSON.parse(res.data).rooms.array;
            this.rooms.push({
              "camera_count": 6,
              "favourite_room": 0,
              "friendly_name": "智能臥室",
              "id": 8286,
              "online_camera_count": 4,
              "background_type": 2
            });
            this.rooms.push({
              "camera_count": 3,
              "favourite_room": 0,
              "friendly_name": "智能大堂",
              "id": 8286,
              "online_camera_count": 1,
              "background_type": 2
            });
            this.rooms.push({
              "camera_count": 7,
              "favourite_room": 0,
              "friendly_name": "智能活動室",
              "id": 8286,
              "online_camera_count": 2,
              "background_type": 2
            });
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
    deleteRoom() {
      this.isRequesting = true;
      let isSuccess = false;
      LetoyService.authorizationRequest(
          "ThirdPlatform/DeleteRoom",
          "POST",
          null,
          {id: `${this.deleteRoomId}`})
          .then((res) => {
            if (res.status === 0) {
              isSuccess = true;
              this.getRooms(() => {
                MessagePlugin.success("刪除房間成功！", 2000);
                this.isRequesting = false;
                this.deleteRoomId = "";
                this.deleteRoomVisible = false;
              });
            }
          })
          .finally(() => {
            if (!isSuccess) {
              this.isRequesting = false;
              this.deleteRoomId = "";
              this.deleteRoomVisible = false;
            }
          })
    },
    openRoomPage(roomId) {
      this.$router.push({path: '/info/SingleRoom', query: {roomId}})
    }

  }
};
</script>
<style src="./../assets/css/RoomsInfo.css" scoped></style>
<style>
.t-switch.t-is-checked {
  background-color: #52BE8B;
}

.t-switch.t-is-checked:hover {
  background-color: #48a87b;
}
</style>
