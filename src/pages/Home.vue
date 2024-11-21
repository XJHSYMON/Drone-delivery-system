<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row mb-4">
          <div class="col-lg-4 col-md-6 mt-4 mb-4">
            <chart-holder-card
                title="每日警報數"
                subtitle="記錄每日發生跌倒的次數"
                update="更新於今日"
            >
              <reports-line-chart
                  :chart="{
                  labels: [ '11.16', '11.17', '11.18', '11.19', '11.20', '11.21'],
                  datasets: {
                    label: '跌倒警報數',
                    data: [ 10, 4, 13, 11, 4, 6],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4 mb-4">
            <chart-holder-card
                title="新增訪客人數"
                subtitle="記錄每日新增的訪客人流量"
                update="更新於今日"
                color="success"
            >
              <reports-line-chart
                  id="tasks-chart"
                  :chart="{
                  labels: [  '11.16', '11.17', '11.18', '11.19', '11.20', '11.21'],
                  datasets: {
                    label: '訪客人數',
                    data: [ 12, 28, 52, 8, 14, 22],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 mt-4 mb-3">
            <chart-holder-card
                title="各個場景使用率"
                subtitle="記錄每個科室接待患者數"
                update="更新於今日"
                color="dark"
            >
              <reports-bar-chart
                  :chart="{
                  labels: [ '臥室', '客廳', '活動室', '陽台', '樓道', '院子'],
                  datasets: {
                    label: '就診人數',
                    data: [ 65, 34, 88, 65, 80, 72],
                  },
                }"
              />
            </chart-holder-card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
                :title="{ text: '本週警報總數', value: 48 }"
                detail="<span class='text-success text-sm font-weight-bolder '>-5%</span>較上個周"
                :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
                :title="{ text: '本月平台檢測到的危險事件', value: '103' }"
                detail="<span class='text-danger text-sm font-weight-bolder'>+3%</span>較上個月"
                :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
                :title="{ text: '本平台接入設備數量', value: '89' }"
                detail="<span class='text-success text-sm font-weight-bolder'>+1%</span>較上個周"
                :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
                :title="{ text: '用戶滿意度', value: '9.5' }"
                detail="累計至今"
                :icon="{
                name: 'person_add',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
        </div>
<!--        <div class="row mt-5">-->
<!--          <div class="col-lg-4 col-md-6">-->
<!--            <booking-card-->
<!--                :img="booking1"-->
<!--                title="辦公室"-->
<!--                description="現代化就診樓提供全面醫療服務，包括診療、檢驗和藥房。我們的醫護團隊以高效專業的態度，為患者提供關愛和優質的醫療照護。"-->
<!--                location="寫字樓"-->
<!--            />-->
<!--          </div>-->
<!--          <div class="col-lg-4 col-md-6">-->
<!--            <booking-card-->
<!--                :img="booking2"-->
<!--                title="住院樓"-->
<!--                description="住院樓提供優質的醫療服務，擁有現代化的病房和設施，致力於患者的康復與護理。我們的團隊由專業的醫護人員組成，竭誠照顧您的健康需求。"-->
<!--                location="住院樓"-->
<!--            />-->
<!--          </div>-->
<!--          <div class="col-lg-4 col-md-6">-->
<!--            <booking-card-->
<!--                :img="booking3"-->
<!--                title="住院設施"-->
<!--                description="我們的住院設施提供現代化病房，搭配先進的醫療設備，以確保患者的舒適和醫療護理。我們致力於提供全面的健康護理，以滿足您的需求。"-->
<!--                location="住院樓二層"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>

    <div class="row"></div>
  </div>
</template>
<script>
import ChartHolderCard from "../views/dashboards/components/ChartHolderCard.vue";
import ReportsBarChart from "../examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "../views/dashboards/components/ReportsLineChart.vue";
import MiniStatisticsCard from "../views/dashboards/components/MiniStatisticsCard.vue";

import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import booking1 from "../assets/img/products/product-1-min.jpg";
import booking2 from "../assets/img/products/product-2-min.jpg";
import booking3 from "../assets/img/products/product-3-min.jpg";

export default {
  name: "Home",
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    MiniStatisticsCard,

  },
  data() {
    return {
      booking1,
      booking2,
      booking3,
      US,
      DE,
      GB,
      BR,
    };
  },
};
</script>
