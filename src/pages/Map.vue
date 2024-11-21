<template>

  <div id="container"></div>
  <t-dialog v-model:visible="modelDialogVisible"
            width="fit-content"
            :show-overlay="false"
            :header="currentObj.name">
    <div class="l-row">
      <drone-station v-if="currentObj.type === 'drone-station'" :device="currentObj"></drone-station>
      <drone-info v-if="currentObj.type === 'drone'" :device="currentObj"></drone-info>
    </div>
  </t-dialog>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
// eslint-disable-next-line no-unused-vars
import {MessagePlugin} from "tdesign-vue-next";
import DroneStation from "@/components/device-info-card/DroneStation.vue";
import DroneInfo from "@/components/device-info-card/DroneInfo.vue";

const data = require("./data/markers")
let markerList = data.markerList;
let imgResMap = {
  "drone-station": {
    offset: [-27.5, -40],
    src: require("./../assets/img/device/drone-station.jpg"),
    htmlClass: "marker-drone-station"
  },
  "drone": {
    offset: [-17, -42.5],
    src: require("./../assets/img/dj.png"),
    htmlClass: "marker-drone"
  },

}
export default {
  name: "Map",
  components: {DroneInfo, DroneStation},
  data() {
    return {
      map: null,
      aMap: null,
      makers: [],
      modelDialogVisible: false,
      gateDialogVisible: false,
      currentObj: {
        name: "",
        valueMap: {}
      },
      path: [[ 113.554827, 22.209708 ], [ 113.537415, 22.183491 ], [ 113.551455, 22.194325 ], [ 113.562203, 22.183948 ], [ 113.563114, 22.161124 ], [ 113.558971, 22.151223 ], [ 113.575331, 22.137173 ], [ 113.56315, 22.122628 ], [ 113.574178, 22.115313 ]]
    }
  },
  created() {
    window.openDialog = this.openDialog
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "d54efd387d3b75b05b3f68196567f1f3",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.MoveAnimation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.aMap = AMap
        this.map = new AMap.Map("container", {  //设置地图容器id
          viewMode: "3D",    //是否为3D地图模式
          zoom: 14,           //初始化地图级别
          center: [113.562276, 22.16136], //初始化地图中心点位置
        });
        this.map.on('click', (e) => {
          if (!e && !e.lnglat) {
            return
          }
          console.log(e.lnglat.lng + "," + e.lnglat.lat);
          this.path.push([e.lnglat.lng, e.lnglat.lat]);
          // this.createNewMarker(e.lnglat.lng, e.lnglat.lat);
        })
        this.readMarkers();
        this.flightDrone();
        setTimeout(()=>{
          this.flightDrone();
        },5000)
        // this.readMarkers();
      }).catch(e => {
        console.log(e);
      })
    },
    createMarkers(name, type, x, y, index) {
      let AMap = this.aMap;
      const markerContent = `
    <div class="marker-box-${imgResMap[type].htmlClass}" onclick="openDialog(${index})">
        <img class="${imgResMap[type].htmlClass}" src="${imgResMap[type].src}" alt="">
    </div>`;
      const position = new AMap.LngLat(x, y); // Marker经纬度
      return new AMap.Marker({
        text:{text:name},
        position: position,
        content: markerContent, // 将 html 传给 content
        offset: new AMap.Pixel(imgResMap[type].offset[0], imgResMap[type].offset[1]) // 以 icon 的 [center bottom] 为原点
      });
    },
    readMarkers() {
      let index = 0;
      markerList.forEach((item) => {
        console.log(item)
        let obj = this.createMarkers(item.name, item.type, item.positions[0], item.positions[1], index);
        this.map.add(obj);
        index++;
      })
    },
    openDialog(index) {
      console.log(markerList[index])
      this.currentObj = markerList[index]
      this.modelDialogVisible = true
    },
    createNewMarker(x, y) {
      let obj = this.createMarkers("street-lamp", x, y, markerList.length);
      this.map.add(obj);
      markerList.push({
        positions: [x, y]
      })
    },
    moveFlight() {
      let AMap = this.aMap;
      AMap.plugin('AMap.MoveAnimation', function () {
        var marker,
            lineArr = [[113.561918, 22.161811], [113.562687, 22.161856], [113.563386, 22.161997], [113.563477, 22.162523], [113.564939, 22.162402], [113.56543, 22.162219], [113.565867, 22.162053],];
        var map = this.map

        marker = new AMap.Marker({
          map: map,
          position: [113.561918, 22.16181],
          offset: new AMap.Pixel(-13, -26),
        });

        // 绘制历史轨迹
        // eslint-disable-next-line no-unused-vars
        var polyline = new AMap.Polyline({
          map: map,
          path: lineArr,
          showDir: true,
          strokeColor: "#28F",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          // strokeStyle: "solid"  //线样式
        });
        // 驾驶途径过的轨迹
        var passedPolyline = new AMap.Polyline({
          map: map,
          strokeColor: "#AF5",  //线颜色
          strokeWeight: 6,      //线宽
        });

        // 监听车辆移动事件
        marker.on('moving', function (e) {
          // 延长驾驶途径过的轨迹
          passedPolyline.setPath(e.passedPath);
          // 将车辆位置设置为地图中心点
          map.setCenter(e.target.getPosition(), true)
        });

        map.setFitView();

        // 开始移动
        window.startAnimation = function startAnimation() {
          marker.moveAlong(lineArr, {
            // 每一段的时长
            duration: 500,//可根据实际采集时间间隔设置
            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
            autoRotation: true,
          });
        };
        // 暂停移动
        window.pauseAnimation = function () {
          marker.pauseMove();
        };
        // 恢复移动
        window.resumeAnimation = function () {
          marker.resumeMove();
        };
        // 停止移动
        window.stopAnimation = function () {
          marker.stopMove();
        };
      });
    },
    flightDrone(){
      console.log(markerList)
      let marker = this.createMarkers("", "drone", 113.561918, 22.161811, markerList.length);
      this.map.add(marker);
      marker.moveAlong(this.path, 2200,
          null, true)
      markerList.push( {
        "name": "DJ 運輸無人機 DJ200301",
        "positions": [
          113.554373,22.212821
        ],
        valueMap: {
          "deviceId": "DJ200301",
          "itemsNum": 5,
          "onlineStatus": 1,
          "flightHeight": 6,
          "flightStatus": 6,
          "risingSpeed":5,
          "declineSpeed":0,
          "flightSpeed":6,
          "power": 4.2,
          "signalStrength": 13,
        },
        "type": "drone",
        "realImg": "https://www1.djicdn.com/cms/uploads/1cae857de261f9350d182e1519b0e3be.png"
      })
    }

  },
}
</script>

<style scoped src="./../assets/css/Map.css"></style>
<style>
.marker-img-street-lamp {
  width: 14px;
  height: 65px;
}

.marker-drone {
  width: 40px;
  height: 40px;
}

.marker-img-gate {
  width: 40px;
  height: fit-content;
}

.flat {
  width: 40px;
  height: 40px;
}

.shop-711 {
  width: 40px;
  height: 30px;
}

.road-postcard {
  width: 50px;
  height: 28.5px;
}

.road-camera {
  width: 40px;
  height: 52px;
}

.weather-station {
  width: 24px;
  height: 85.5px;
}

.marker-drone-station {
  width: 95%;
  height: 95%;
}

.marker-box-marker-drone {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 4px 4px 8px rgba(234, 234, 234, 0.3);
  border: 2px solid #2e9103;
}

.marker-box-marker-drone-station {
  width: 80px;
  height: calc(80px * 432 / 618);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 4px 4px 8px rgba(234, 234, 234, 0.3);
  border: 2px solid #3f8dde;
}
</style>