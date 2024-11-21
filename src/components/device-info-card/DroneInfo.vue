<template>
  <div class="l-row l-center" style="width: 300px">
    <img :src="device.realImg" class="real-img" alt="">
  </div>
  <div class="l-col" style="width: 300px;">
    <div class="my-row">
      <div class="item-title">設備編號：</div>
      <div class="item-value">{{ device.valueMap.deviceId }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">貨物數量（件）：</div>
      <div class="item-value">{{ device.valueMap.itemsNum }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">網絡狀態：</div>
      <div class="item-value">
        <t-tag theme="success">在線</t-tag>
      </div>
    </div>
    <div class="my-row">
      <div class="item-title">飛行高度（m）：</div>
      <div class="item-value">{{ device.valueMap.flightHeight }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">無人機狀態：</div>
      <div class="item-value">{{ device.valueMap.flightStatus }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">飛行速度（m/s）：</div>
      <div class="item-value">{{ device.valueMap.flightSpeed }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">電量：</div>
      <div class="item-value">{{ device.valueMap.power }}</div>
    </div>
    <div class="my-row">
      <div class="item-title">信號強度：</div>
      <div class="item-value">
        <t-tag theme="success">{{ device.valueMap.signalStrength }}</t-tag>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DroneInfo",
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
  width: 250px;
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