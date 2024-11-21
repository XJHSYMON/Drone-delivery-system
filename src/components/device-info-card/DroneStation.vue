<template>
  <div class="l-row l-center" style="width: 300px">
    <img :src="device.realImg" class="real-img" style="box-shadow: rgb(124 124 124 / 30%) 4px 4px 8px" alt="">
  </div>
  <div class="l-col" style="width: 300px;">
    <div class="my-row">
      <div class="item-title">站編號：</div>
      <div class="item-value">{{device.valueMap.stationId}}</div>
    </div>
    <div class="my-row">
      <div class="item-title">站點無人機數量（架）：</div>
      <div class="item-value">{{ device.valueMap.itemsNum }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">風向：</div>
      <div class="item-value">{{ device.valueMap.windDirection }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">風速（m/s)：</div>
      <div class="item-value">{{ device.valueMap.windSpeed }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">能見度（Km)：</div>
      <div class="item-value">{{ device.valueMap.visibilityNow }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">濕度：</div>
      <div class="item-value">{{ device.valueMap.wetDegree }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">溫度：</div>
      <div class="item-value">{{ device.valueMap.temperatureNow }}</div>
    </div>



  </div>
</template>

<script>
export default {
  name: "DroneStation",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    device: Object
  },
  mounted() {

  }
}
</script>

<style scoped>
.real-img {
  width: 200px;
  margin-right: 20px;
  border-radius: 15px;
}

.my-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
}

.item-title {
  font-size: 20px;
  color: #000000;
  margin: 0 10px;
}

.item-value {
  font-size: 20px;
  color: #1f4e7e;
}
</style>
