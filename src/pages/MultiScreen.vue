<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col-lg-12 mt-lg-0">
        <div id="profile" class="card card-body mt-4">
          <div class="row align-items-flex">
            <div class="l-container">
              <div class="l-row" style="display: flex;flex-wrap: wrap">
                <!--                <t-button style="margin-top: 10px;margin-left: 10px;" theme="success" @click="getMQTTAccount">-->
                <!--                  <template #icon>-->
                <!--                    <play-circle-icon/>-->
                <!--                  </template>-->
                <!--                  顯示實時骨架-->
                <!--                </t-button>-->
                <!--                <t-button style="margin-top: 10px;margin-left: 10px;" theme="danger" @click="closeConnect">-->
                <!--                  <template #icon>-->
                <!--                    <stop-circle-icon/>-->
                <!--                  </template>-->
                <!--                  停止播放-->
                <!--                </t-button>-->
                <!--                <t-button style="margin-top: 20px;margin-left: 10px;" @click="getAlertByAlertId">獲取錄像</t-button>-->
              </div>
            </div>

            <!--            <div class="aspect-ratio-box">-->
            <!--              <canvas id="myCanvas" class="aspect-ratio-box-content"-->
            <!--                      :style="{background:'url('+backgroundUrl+') no-repeat'}" style="background-size: cover"></canvas>-->
            <!--            </div>-->
            <div v-for="i in 16" :key="i" class="view-box">
              <div class="views living-room-bg" :class="randomClass()">
                <div class="overlay"></div>
                <div class="title">智慧骨架檢測場景{{ i }}</div>
                <div class="button-box">
                  <play-circle-icon style="color: white;cursor: pointer" size="20px"/>
                  <stop-circle-icon style="color: white;margin-left: 5px;cursor: pointer" size="20px"/>
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
import mqtt from "../utils/mqtt.min"
import LetoyService from "@/utils/JSLetoyService";
import {MessagePlugin} from "tdesign-vue-next";
import {PlayCircleIcon, StopCircleIcon} from "tdesign-icons-vue-next";

export default {
  name: "MultiScreen",
  // eslint-disable-next-line vue/no-unused-components
  components: {StopCircleIcon, PlayCircleIcon},
  data() {
    return {
      client: undefined,
      currentPic: {},
      cameraId: "",
      res: [],
      picList: [],
      pointPairs: [
        {start: 0, end: 1, color: 'pink'},
        {start: 1, end: 2, color: 'orange'},
        {start: 2, end: 3, color: 'yellow'},
        {start: 3, end: 4, color: 'lightYellow'},
        {start: 1, end: 5, color: 'darkSalmon'},
        {start: 5, end: 6, color: 'salmon'},
        {start: 6, end: 7, color: 'lightSalmon'},
        {start: 2, end: 8, color: 'darkTurquoise'},
        {start: 8, end: 9, color: 'turquoise'},
        {start: 9, end: 10, color: 'paleTurquoise'},
        {start: 5, end: 11, color: 'darkRed'},
        {start: 11, end: 12, color: 'red'},
        {start: 12, end: 13, color: 'orange'},
        {start: 0, end: 14, color: 'purple'},
        {start: 14, end: 16, color: 'purple'},
        {start: 0, end: 15, color: 'violet'},
        {start: 15, end: 17, color: 'violet'}
      ],
      canvasWidth: 960,
      canvasHeight: 540,
      showPicList: false,
      canvas: undefined,
      ctx: undefined,
      subscribeTopics: [],
      publishTopics: [],
      backgroundUrl: "",
      accountInfo: {},
      cameraData: {},
      mqttInit: false,
      publishToken: false,
      heartBreakInterval: undefined,
      time: 0,
      file: "AwAAAGkaW2X+////OwAAAKQAXAAAADMAAQBdAAAAAAwAAJABdQA3BAYABwUG5QAAAA0AAC4AARwAADMABaYDADIABqsFADoAB7UDAEAACCkBAEEACRYDAEsACg8HAFYAC34DAEEADFEFAEoADRkHAFQAEXsAACwAxgAACgAAqQFUAOwDBgAIBQbjAAAAEgAALgABJAAAMwAFpwMAMgAGpgUAOgAHqwMAQAAIHQAAQQALaQMAQQAMIAMARgAPGQAALAARfwAALABsAQAHAAAXAlQAqQMHAAoICNwAAAEeAAAzAAWmAwAzAAanBQA7AAejAwBBAAtaAwBBAAwNAwBFABGNAAAsADMCAAoAAKwBVADaAwcACQcH3wAAABMAAC4AASAAADIABagDADIABqsFADoAB7QDAEAACCYBAEEAC2oDAEEADCADAEUADxYAACwAEYUAACwAFgMACgAApQFUAP8DBwAGBQblAAAADQAALQABGwAAMwAFpwMAMgAGqgUAOgAHqwMAQAAIIgEAQAALaQMAQAAMJQUARwAPFwAALAARdgAALADgAwAKAACsAVQA2gMHAAkGB98AAAAPAAAuAAEcAAAzAAWkAwAzAAagBQA7AAebAwBAAAgcAQBBAAtdAwBBAAwVAQBFAA8XAAAsABF0AAAsAIUEAAoAAKkBVADsAwcACAYG4gAAAA8AAC4AARwAADIABacDADIABqgFADsAB6sDAEAACCEAAEEAC2oDAEEADCUDAEYADxYAACwAEXgAACwAjwUACgAApQFUAP8DBwAGBQXlAAAADwAALgABGwAAMgAFqQMAMgAGpwUAOgAHrAMAQAAIIgEAQQALaQMAQQAMKgMARwAPGQAALAARdAAALABVBgAIAAC+AVQAfAMJAAYFBuIAAAAMAAAtAAEaAAAzAAWjAwAzAAaeBQA6AAebAwBAAAgZAQBAAA8WAAAsABFyAAAsAD0HAAgAAB4CVACCAwgACQcI3QAAARwAADMABacDADMABqYFADsAB6YDAEAACCEBAEAAC2gDAEEADBADAEMAEXYAACwANwgACgAAmwFUADcECQAIBgffAAAADwAALgABHAAAMgAFpQMAMwAGpQUAOgAHqwMAQAAIIwEAQQALbgMAQQAMHwMASgAPFAAALAARdAAALAAfCQAKAACpAVQA7AMHAAgGB98AAAAPAAAuAAEbAAA0AAWoAwAyAAahBQA7AAeZAwBBAAgaAABBAAteAwBBAAwUAwBGAA8bAAAsABF1AAAsAOYJAAoAAJ4BVAAkBAcABwYH4gAAAA0AAC0AAR4AADIABacDADIABqkFADoAB64DAEAACCcBAEEAC3ADAEEADCoFAEkADxQAACwAEXsAACwArQoACQAAnQFUAOEDCAAIBgffAAABIQAAMgAFpwMAMgAGpAUAOgAHpgMAQAAIHgEAQAALZwMAQQAMEAMARQAPEAAAKwARewAALABzCwAJAADLAVQAzAMHAAcGBuEAAAANAAAuAAEcAAAzAAWkAwAyAAamBQA6AAetAwBAAAggAQBBAAtjAwBBAAwjAQBFABF7AAAsADoMAAoAAKABVADOAwcACQYH3wAAAA0AAC4AARoAADMABacDADIABp4FADsAB5kDAEEACBsAAEEAC2ADAEEADBYDAEQADxcAACsAEX4AACwAJA0ACQAAxQFUAPADBgAIBgfiAAAAEAAALgABIwAAMgAFqQMAMgAGqQUAOgAHtgMAQAAIKgEAQAALdAMAQAAMHwMARwARfAAALADrDQAKAACpAVQA7AMIAAkHCN0AAAASAAAuAAEcAAAzAAWlAwAyAAanBQA6AAeqAwBAAAgeAQBAAAtdAwBAAAwSAwBGAA8ZAAAsABF4AAAsALEOAAoAAKwBVADaAwgACQcH3gAAABEAAC0AARwAADMABaoDADIABqQFADoAB6QDAEAACB0BAEAAC2EDAEEADBADAEUADyQAACwAEYEAACwAeA8ACgAAogFUABIEBwAGBQblAAAADQAALQABHAAAMgAFpwMAMgAGqgUAOgAHqwMAQAAIJwEAQQALcgMAQQAMLwMASAAPFAAALAARdwAALAAdEAAKAACeAXUANwQEAAYEBOsAAAANAAAuAAEcAAAyAAWpAwAyAAaoBQA7AAesAwBAAAguAwBAAAt6AwBBAAw7BQBJAA0RBwBSABF0AAAsAOUQAAwAAGEBdQA3BAUABwUF5gAAAR4AADIABaYDADIABqoFADsAB7UDAEAACDEBAEEACRsDAEoAChwHAFYAC4ADAEEADGcFAEoADTAHAFQADw0AACsAEXoAACwA7hEACQAAywFUAMwDBwAIBwffAAAADQAALgABGQAAMwAFpAMAMgAGowUAOwAHkQMA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CAAHBgbhAAAADwAALQABGAAAMwAFpwMAMgAGpwUAOwAHmwMAQAAIGwAAQQALZQMAQQAMEgMARQAPEQAAKgARWAAALACrMgAKAACgAVQAzgMHAAsHB9wAAAARAAAtAAEUAAAzAAWlAwAyAAakBQA6AAemAwBBAAgYAABBAAtdAwBBAAwYAQBEAA8WAAArABFeAAAsAHIzAAYAABUCVABlAwcACgYH3gAAARIAADQABaIDADIABqUFADsAB44DAEEAC0QDAEEAET8AACwAWTQABwAA2gFUAIADDAAKCAnVAAAADQAALgABEgAAMwAFnwMAMwAGngUAOwAHlQMAQQAIEAEAQQARPAAALAAgNQAJAACxAVQACwQHAAcFBuMAAAANAAAtAAEXAAAzAAWmAwAyAAamBQA7AAerAwBAAAgiAQBBAAtoAwBBAAwWAwBIABFaAAAsAOc1AAcAAL4BVAB8AwsABwYG3gAAAA0AAC0AAR8AADIABagDADIABqYFADoAB7gDAEAADw8AACwAEYYAACwA2DYACgAArAFUANoDCQALCAjZAAAAEQAALQABIQAAMgAFqwMAMgAGpgUAOwAHqwEAQAAIHwEAQQALbgMAQQAMEwMARQAPKAAALAARlAAALACqNwAKAACQAWUANwQLAAwICdUAAAApAAAtAAEnAAAyAAWrAwAyAAapBQA6AAe5AwBAAAgxAABBAAuHAwBBAAwxBgBNAA9nAAAsABGSAAAsAHE4AAoAAKIBVAASBAgABgUG5QAAAB4AAC0AASoAADIABa4DADIABq0FADoAB7YDAEAACCwAAEEAC4MDAEEADDQDAEgAD08AACwAEZwAACwAODkACgAApQFUAP8DBwAGBQXmAAAAKwAALQABLQAAMgAFrQMAMgAGpgUAOgAHsQMAQAAIMAAAQQALgAMAQQAMFAMARwAPZwAALAARnAAALAAAOgAKAAClAVQA/wMHAAYFBuQAAAAbAAAtAAEoAAAxAAWsAwAyAAaiBQA6AAesAwBAAAgqAABBAAt4AwBBAAwmAwBHAA9EAAAsABGgAAAsAOc6AAoAAKUBVAD/AwYABQQF6AAAACcAAC0AASkAADEABasDADIABqUFADoAB7ADAEAACCkAAEEAC3oDAEEADB8DAEcAD10AACwAEZcAACwA7DsADAAAewF1ADcEBgAIBQbjAAAAIAAALQABLAAAMQAFqgMAMgAGowUAOgAHsQMAQAAIMgEAQQAJDQMASgALhAMAQQAMRgUASgANGwcAUwAPVQAALAARlgAALACzPAAKAACWAVQABgQHAAcGB+EAAAAlAAAtAAErAAAxAAWpAwAyAAanBQA6AAevAwBAAAgqAABBAAt8AwBBAAwqAwBHAA9aAAArABGWAAAsAHo9AAoAAI8BVAArBAgACAYI3wAAABkAAC0AATEAADEABakDADIABqUFADoAB6gDAEAACCkBAEEAC3cDAEEADCEFAEkADz0AACsAEaEAACwAQD4ADAAAZQF1ADcEBgAHBQblAAAAIgAALQABNAAAMQAFqQMAMgAGpQUAOgAHsgMAQAAIMQEAQQAJDAMASQALiwMAQQAMPgUASwANEAcAVQAPYAAAKwARnAAALAAHPwAKAACkAVQAuwMHAAgGB+EAAAAgAAAtAAEuAAAxAAWnAwAyAAagBQA6AAedAQBAAAgcAABBAAtoAwBBAAwQAwBDAA9cAAArABGbAAAsAM8/AAoAAHMBZQA3BAwADQgJ0wAAACIAACwAASMAADEABacDADIABpsFADsAB5QBAEEACBkBAEIAC18DAEIADA0GAFEAD1EAACsAEY4AACwAx0AACwAAdwF1ADcEBQAHBQblAAAAGwAALQABLAAAMQAFpwMAMgAGnwUAOgAHoAEAQAAIKgAAQQALgAMAQQAMPQUASgANHAcAVAAPPwAALAARmAAALACvQQAKAACpAVQA7AMGAAcFBuQAAAAhAAAtAAEoAAAxAAWoAwAyAAakBQA6AAewAQBAAAgpAABBAAt5AwBBAAwjAwBGAA9DAAAsABGVAAAsAFVCAAoAAKIBVAASBAgABgUG5AAAAC0AAC0AAS0AADEABa8DADIABqQFADoAB60DAEAACC0AAEEAC4ADAEEADBIDAEgAD3UAACwAEZEAACwAHEMACgAApQFUAP8DBgAFBQbmAAAALQAALQABKwAAMQAFqgMAMgAGogUAOgAHqgEAQAAIIgEAQQALbwMAQQAMJQMARwAPXQAALAARmwAALADCQwAKAACbAVQANwQHAAgGB+AAAAAiAAAtAAEmAAAxAAWpAwAyAAadBQA6AAemAQBAAAglAABBAAtzAwBBAAwfAwBKAA9XAAAsABGUAAAsAIlEAAkAAKcBVACoAwcACAYH3wAAACkAAC0AASgAADEABaYDADIABqAFADoAB6EBAEAACCYAAEIAC3IDAEEAD2QAACsAEZYAACwAmEUACgAAkgFUABkEBwAHBgfhAAAAGQAALQABJwAAMgAFqAMAMgAGmwUAOgAHpgEAQAAIKAAAQQALegMAQQAMFwMASAAPSAAAKwARnAAALABeRgAKAACZAVQA8wMHAAYFBeUAAAAbAAAtAAEuAAAxAAWpAwAyAAalBQA7AAerAQBAAAghAABAAAtzAwBBAAwbAwBGAA9TAAArABGiAAAsAARHAAwAAGEBdQA3BAYACAUG5AAAABkAAC0AASoAADIABakDADIABqoFADoAB7UDAEAACC8BAEEACREDAEoAC4IDAEEADEsFAEoADRMHAFYADz8AACsAEaUAACwAy0cADAAAZQF1ADcEBgAIBQbjAAAAGQAALQABLQAAMQAFqgMAMgAGoQUAOgAHpAEAQAAILgEAQQAJDwMASgALgwMAQQAMQQUASwANHgcAVQAPRAAAKwARoQAALACSSAALAABrAXUANwQGAAcFBuQAAAAxAAAtAAEzAAAxAAWsAwAyAAamBQA6AAetAwBAAAghAQBBAAtzAwBBAAwyBQBJAA0YBwBTAA+AAAArABGQAAAsABZJAAoAAJIBVAAZBAgACAcI3gAAACoAAC0AASsAADEABasDADIABqQFADoAB68BAEAACCwAAEEAC30DAEEADCEDAEgAD2sAACsAEZsAACwAIUoACwAAZQF1ADcEBgAIBQfjAAAAJgAALAABLgAAMQAFqQMAMgAGpgUAOgAHqgMAQAAIKQEAQQALfgMAQQAMOwUASgANFAcAVQAPeQAAKwARlQAALADoSgAKAACSAVQAGQQJAAkHCNwAAAAZAAAtAAExAAAxAAWoAwAyAAahBQA6AAecAQBBAAgXAABBAAtcAwBBAAwdAwBIAA9KAAArABGXAAAsAK9LAAoAAJIBVAAZBAgACAcI3gAAAC4AAC0AAS4AADEABaoDADIABqUFADoAB7IDAEAACCkAAEEAC3gDAEEADBsDAEgAD28AACsAEZgAACwAdkwACgAAnQFUAOEDBwAIBgfhAAAAKQAALQABKgAAMgAFrAMAMgAGowUAOgAHqgMAQAAIJAAAQQALcgMAQQAMHQMARQAPcAAAKwARlAAALAA8TQAJAACZAVQA8wMHAAYFBeYAAAAfAAAtAAEjAAAxAAWpAwAyAAaiBQA6AAgeAABBAAtoAwBBAAwfAwBGAA9TAAArABGXAAAsAA==",
      bgClassList: ["living-room-bg", "living-room-2-bg", "bed-room-bg", "kitchen-bg", "yard-bg", "balcony-bg"]
    };
  },
  computed: {},
  mounted() {
    this.initCanvas();
    this.cameraId = this.$route.query["cameraId"];
    this.getUserAccountInfo();
    // this.getCameraDataByCameraId();
    // this.getCameraBackgroundImageURL();
    // this.base64ToBinaryArray(this.file);
    // this.createCameraSteamToken();
    // this.getAlerts();
  },
  methods: {
    getUserAccountInfo() {
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetUserAccountInfo",
          "POST",
          null,
          null)
          .then((res) => {
            this.accountInfo = JSON.parse(res.data)
          })
    },
    getCameraDataByCameraId() {
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetCameraDataByCameraId",
          "POST",
          null,
          {
            id: this.cameraId
          })
          .then((res) => {
            this.cameraData = JSON.parse(res.data).camera;
          })
    },
    getMQTTAccount() {
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetUserMQTTAccount",
          "POST",
          null,
          null)
          .then((res) => {
            let mqttAccountInfo = JSON.parse(res.data);
            this.username = mqttAccountInfo.mqtt_account.username;
            this.passcode = mqttAccountInfo.mqtt_account.passcode;
            this.subscribeTopics = mqttAccountInfo.mqtt_account.subscribe_topics;
            this.publishTopics = mqttAccountInfo.mqtt_account.publish_topics;
            this.connectMqtt();
          })
    },
    getCameraBackgroundImageURL() {
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetCameraBackgroundImageURL",
          "POST",
          null,
          {
            id: this.cameraId
          })
          .then((res) => {
            this.backgroundUrl = JSON.parse(res.data).background_url;
            // this.connectMqtt();
          })
    },
    getSkeletonRecords() {
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetSkeletonRecords",
          "POST",
          null,
          {
            startDate: "2023-11-20 16:25:45",
            endDate: "2023-11-20 16:30:45"
          })
          .then((res) => {
            console.log(JSON.parse(res.data))
          })
    },
    getAlertByAlertId() {
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetAlertByAlertId",
          "POST",
          null,
          {
            id: "655b1a6b59705ed5d3c3460a"
          })
          .then((res) => {
            console.log(JSON.parse(res.data).alert.skeleton_file)
          })
    },
    getAlerts() {
      LetoyService.authorizationRequest(
          "ThirdPlatform/GetAlerts",
          "POST",
          null,
          null)
          .then((res) => {
            console.log(JSON.parse(res.data))
          })
    },
    createCameraSteamToken() {
      LetoyService.authorizationRequest(
          "ThirdPlatform/CreateCameraSteamToken",
          "POST",
          null,
          {
            id: this.cameraId
          })
          .then((res) => {
            let streamToken = JSON.parse(res.data).stream_token;
            if (this.mqttInit) {
              let subscribeUrl = `mobileClient/${this.accountInfo.group_id}/camera/${this.cameraData.serial_number}/skeleton/${streamToken}`;
              this.client.subscribe(subscribeUrl, {qos: 0}, (err) => {
                if (!err) {
                  console.log('订阅成功');
                } else {
                  console.log('订阅失败');
                }
              })
              this.mqttInit = false;
            }
            if (this.publishToken) {
              MessagePlugin.success({content: '发送心跳成功！', duration: 1000})
              let topic = `mobile/${this.accountInfo.group_id}/camera/${this.cameraData.serial_number}/token/mobileStreamToken`;
              this.client.publish(topic, `${streamToken}`);
              this.publishToken = false;
            }
          })
    },
    connectMqtt() {
      const options = {
        timeout: 3,
        clientId: 'test123',//唯一值
        port: 8084,//端口
        host: 'beijing.altumview.com.cn',//地址
        username: this.username,
        password: this.passcode
      }
      let client = mqtt.connect('wss://beijing.altumview.com.cn:8084/mqtt', options);
      client.on('connect', () => {
        MessagePlugin.success({content: '服務器鏈接成功！', duration: 3000})
        this.mqttInit = true;
        this.publishToken = true;
        this.createCameraSteamToken();
        setInterval(() => {
          this.time++;
        }, 1000)
        MessagePlugin.success({content: '开始发送心跳！', duration: 3000})
        this.heartBreakInterval = setInterval(() => {
          this.publishToken = true;
          this.createCameraSteamToken();
        }, 43000); // 45000毫秒（即45秒）
      })

      //信息监听事件
      client.on('message', (topic, message) => {
        this.encodeString(message);
      })
      //失败
      client.on('error', (err) => {
        console.log('连接失败', err);
      })
      this.client = client;
    },
    closeConnect() {
      this.client.end();
      clearInterval(this.heartBreakInterval);
    },
    encodeString(data) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      data = this.uint8ArrayToBase64(data);
      let decodedString = window.atob(data);
      const byteList = new Uint8Array(decodedString.split('').map(char => char.charCodeAt(0)));
      const numPeople = this.parseStringInt32(byteList, 4);
      for (let i = 0; i < numPeople; i++) {
        const basePos = 8 + 152 * i;
        const personId = this.parseStringInt32(byteList, basePos);
        let person = {};
        const xBasePos = basePos + 8;
        const yBasePos = basePos + 80;
        if (byteList.length >= yBasePos + 17 * 4) {
          for (let j = 0; j < 18; j++) {
            const x = this.parseStringFloat(byteList, xBasePos + j * 4);
            const y = this.parseStringFloat(byteList, yBasePos + j * 4);
            if (x && y) person[j] = {x, y};
          }
          person.name = personId;
          this.drawSkeleton(5, person);
        }
      }
    },
    //低版本浏览器使用此方法
    uint8ArrayToBase64(uint8Array) {
      try {
        let binary = '';
        for (let i = 0; i < uint8Array.byteLength; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }
        return window.btoa(binary);
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    initCanvas() {
      let canvas = document.getElementById('myCanvas');
      let dpr = window.devicePixelRatio || 1;
      let rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      const ctx = canvas.getContext('2d');
      console.log("canvas", canvas)
      this.canvasWidth = canvas.clientWidth;
      this.canvasHeight = canvas.clientHeight;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.canvas = canvas;
      this.ctx = ctx;

    },
    drawLine(x0, y0, x1, y1) {
      this.ctx.beginPath();
      this.ctx.moveTo(x0, y0);
      this.ctx.lineTo(x1, y1);
      this.ctx.stroke();
    },
    parseStringInt32(stringData, startIndex) {
      if (startIndex + 4 <= stringData.length) {
        const t = stringData.slice(startIndex, startIndex + 4);
        return new DataView(t.buffer).getInt32(0, true);
      }
    },
    parseStringFloat(stringData, startIndex) {
      if (startIndex + 4 <= stringData.length) {
        const t = stringData.slice(startIndex, startIndex + 4);
        return new DataView(t.buffer).getFloat32(0, true);
      }
    },
    drawSkeleton(lineWidth, points) {
      this.ctx.lineWidth = lineWidth;
      this.ctx.lineCap = 'round';
      let minX = 1;
      let minY = 1;
      this.pointPairs.forEach((pair) => {
        const startPoint = points[pair.start];
        const endPoint = points[pair.end];
        if (startPoint !== undefined && endPoint !== undefined) {
          if (endPoint.x < minX) minX = endPoint.x;
          if (endPoint.y < minY) minY = endPoint.y;
          this.ctx.strokeStyle = pair.color;
          this.drawLine(startPoint.x * this.canvasWidth, startPoint.y * this.canvasHeight,
              endPoint.x * this.canvasWidth, endPoint.y * this.canvasHeight);
        }
      })
    },
    base64ToBinaryArray(base64) {
      // 将Base64字符串解码为普通字符串
      let binaryString = window.atob(base64);

      // 创建一个与字符串长度相同的Uint8Array数组
      let length = binaryString.length;
      let binaryArray = new Uint8Array(length);

      // 将每个字符的charCodeAt转换为Uint8Array中的元素
      for (let i = 0; i < length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }
      this.parseSkeletonRecord(binaryArray);
      return binaryArray;
    },

    parseUint8(data, offset) {
      return data[offset];
    },
    parseUint16(data, offset) {
      return data[offset] + (data[offset + 1] << 8);
    },
    parseUint32(data, offset) {
      return data[offset] + (data[offset + 1] << 8) + (data[offset + 2] << 16) + (data[offset + 3] << 24);
    },
    parseSkeletonRecord(data) {
      let offset = 0;
      // 解析头部信息
      const version = this.parseUint8(data, offset);
      offset += 1;
      const recordType = this.parseUint8(data, offset);
      offset += 1;
      const aspectRatio = this.parseUint8(data, offset);
      offset += 1;
      offset += 1; // 跳过填充
      const groupId = this.parseUint32(data, offset);
      offset += 4;
      const cameraId = this.parseUint32(data, offset);
      offset += 4;
      const timestamp = this.parseUint32(data, offset);
      offset += 4;
      const numberOfFrames = this.parseUint32(data, offset);
      offset += 4;
      let frameDataList = []

      // 解析帧数据
      for (let i = 0; i < numberOfFrames; i++) {
        const deltaTime = this.parseUint16(data, offset);
        offset += 2;
        const numberOfPeople = this.parseUint16(data, offset);
        offset += 2;
        let peopleDataArray = [];
        // 解析每个人的数据
        for (let j = 0; j < numberOfPeople; j++) {
          const personId = this.parseUint32(data, offset);
          offset += 4;
          const trackerId = this.parseUint8(data, offset);
          offset += 1;
          const numberOfKeyPoints = this.parseUint8(data, offset);
          offset += 1;
          const event = this.parseUint8(data, offset);
          offset += 1;
          const actionLabel = this.parseUint8(data, offset);
          offset += 1;
          const actionProbabilities = new Uint8Array(data.buffer.slice(offset, offset + 8));
          offset += 8;
          let keyPoints = [];
          // 解析关键点数据
          for (let k = 0; k < numberOfKeyPoints; k++) {
            const descriptor = this.parseUint8(data, offset);
            offset += 1;
            const probability = this.parseUint8(data, offset);
            offset += 1;
            const xCoordinate = this.parseUint16(data, offset) / 65536;
            offset += 2;
            const yCoordinate = this.parseUint16(data, offset) / 65536;
            offset += 2;
            keyPoints.push({descriptor, probability, xCoordinate, yCoordinate});
          }
          peopleDataArray.push({
            personId,
            trackerId,
            numberOfKeyPoints,
            event,
            actionLabel,
            actionProbabilities,
            keyPoints
          })
          // 在这里处理每个人的数据
          console.log(`Person ID: ${personId}, Tracker ID: ${trackerId}, Key Points:`, keyPoints);
        }
        frameDataList.push({
          deltaTime,
          numberOfPeople,
          peopleDataArray
        })
      }
      let cameraFile = {
        version,
        recordType,
        aspectRatio,
        groupId,
        cameraId,
        timestamp,
        numberOfFrames,
        frameDataList
      }
      console.log(cameraFile);
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomClass() {
      const randomIndex = this.getRandomInt(0, this.bgClassList.length);
      return {[this.bgClassList[randomIndex]]: true};
    }

  }
};
</script>
<style src="./../assets/css/MultiScreen.css"></style>
