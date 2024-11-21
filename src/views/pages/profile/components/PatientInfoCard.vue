<template>
  <div class="card">
    <div class="p-3 card-body">
      <div class="d-flex mt-n2 ">
        <div style="min-width: 74px">
          <img  style="min-width: 74px;width: 100%;border-radius: 12px" :src="image">
        </div>
        <div class="my-auto ms-3">
          <div class="d-flex justify-content-center align-items-center row " style="width: 400px" >
            <div class="col-4"><span style="color: black;font-weight: 800;font-size: 28px">{{name}}</span></div>
            <div class="col-4">性別：<span style="color: black">{{sex}}</span></div>
            <div class="col-4">年齡：<span style="color: black">{{age}}</span></div>
          </div>
          <div class="row-6">聯繫方式：{{phone}}</div>
        </div>
        <div class="ms-auto">
          <div class="dropdown">
            <button
              id="navbarDropdownMenuLink"
              class="btn btn-link text-secondary ps-0 pe-2"
              :class="{ show: showMenu }"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <i class="text-lg fa fa-ellipsis-v"></i>
            </button>
            <div
              class="dropdown-menu dropdown-menu-end me-sm-n4 me-n3"
              :class="{ show: showMenu }"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a
                v-for="(drop, index) in dropdown"
                :key="index"
                class="dropdown-item border-radius-md"
                :href="drop.route"
                @click="clickHandler(drop.label)"
                >{{ drop.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <p class="mt-2 text-sm">
        疾病類型：<span style="color: black;font-size: 20px">{{diagnosis}}</span>
      </p>
      <p class="text-sm">
        治療方案：<span style="color: black;font-size: 16px">{{treatmentPlan}}</span>
      </p>
      <hr class="horizontal dark m-0" />
      <div class="row">
        <div class="col-4">
          <h6 class="mb-0 text-sm">病歷號</h6>
          <p class="mb-0 text-sm text-secondary font-weight-bold">
            {{ medicalRecordNumber }}
          </p>
        </div>
        <div class="col-4">
          <h6 class="mb-0 text-sm">主治醫師</h6>
          <p class="mb-0 text-sm text-secondary font-weight-bold">{{ responsibleDoctor }}</p>
        </div>
        <div class="col-4 text-end">
          <h6 class="mb-0 text-sm">健康狀態</h6>
          <p class="mb-0 text-sm font-weight-bold"
             :class="{
             'text-green': healthStatus === '良好',
             'text-yellow': healthStatus === '恢復中',
             'text-red': healthStatus === '病情中'}">
            <span style="font-size: 20px;font-weight: 400">{{ healthStatus }}</span>
          </p>
          <t-dialog
              v-model:visible="visibleNormalDrag"
              width="800px"
              header="檢查數據"
              mode="modal"
              draggable
              :on-confirm="() => (visibleNormalDrag = false)"
          >
            <template #body>
              <div id="bloodRoutineChart" style="width: 600px;height: 400px"></div>
              <div id="temperatureChart" style="width: 600px;height: 400px"></div>
            </template>
          </t-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "PatientInfoCard",
  props: {
    image: {
      type: String,
      default: "../../../../assets/img/people/p-1.png",
    },
    name: {
      type: String,
      default: "",
    },
    sex: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 0,
    },
    phone: {
      type: Number,
      default: 0,
    },
    medicalRecordNumber: {
      type: String,
      default: "",
    },
    responsibleDoctor: {
      type: String,
      default: "",
    },
    healthStatus: {
      type: String,
      default: "",
    },
    diagnosis: {
      type: String,
      default: "",
    },
    treatmentPlan: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showMenu: false,
      visibleNormalDrag: false,
      dropdown:[
        {
          label: '病人往期檢查',
          route: 'javascript:;',
        },
        {
          label: '刪除病人記錄',
          route: 'javascript:;',
        }
      ]
    };
  },
  mounted() {

  },
  methods:{
    //血常規表格
    initBloodRoutineChart(){
      const chartDom = document.getElementById('bloodRoutineChart');
      const myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: '血常規'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['紅細胞', '白細胞', '血紅蛋白', '血小板']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2021.1.2', '2022.7.12', '2022.9.1', '2023.1.6',  '2023.2.15', '2023.5.6']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '紅細胞',
            type: 'line',
            stack: 'Total',
            data: [4.50, 4.30, 4.10, 5.00, 4.90, 4.11]
          },
          {
            name: '白細胞',
            type: 'line',
            stack: 'Total',
            data: [10.40, 11.20, 6.66, 7.21, 5.21, 10.00]
          },
          {
            name: '血紅蛋白',
            type: 'line',
            stack: 'Total',
            data: [117.00, 116.00, 115.00, 111.11, 117.21, 117.00]
          },
          {
            name: '血小板',
            type: 'line',
            stack: 'Total',
            data: [371.00, 311.22, 185.20, 174.00, 320.00, 247.50]
          },
        ]
      };

      option && myChart.setOption(option);
    },
    //體溫表格
    initTemperatureChart(){
      const chartDom = document.getElementById('temperatureChart');
      const myChart = echarts.init(chartDom);
      let option;

      option = {
        xAxis: {
          type: 'category',
          data: ['2021.1.2', '2022.7.12', '2022.9.1', '2023.1.6',  '2023.2.15', '2023.5.6']
        },
        yAxis: {
          type: 'value'
        },
        title: {
          text: '體溫'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            data: [36.6, 36.2, 37.0, 36.5, 36.6, 36.2, 36.7],
            name: '體溫',
            type: 'line',
            stack: 'Total',
          }
        ]
      };

      option && myChart.setOption(option);
    },
    //拓展點擊事件
    clickHandler(label){
      switch (label) {
        case '病人往期檢查':
          this.initBloodRoutineChart()
          this.initTemperatureChart()
          this.visibleNormalDrag = true
          break;
        case '刪除病人記錄':
          break;
        default:
          break;
      }
  },
}};
</script>
<style>
.text-green {
  color: green !important;
}
.text-yellow {
  color: #d36c0d !important;
}
.text-red {
  color: red !important;
}
</style>