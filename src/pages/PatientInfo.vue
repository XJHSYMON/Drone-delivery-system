<template>
  <div class="container-fluid">
    <div
        class="page-header min-height-300 border-radius-xl mt-4"
        style="
        background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
      "
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="card card-body mx-3 mx-md-4 mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
                src="../assets/img/background/login-bg.jpeg"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">病人數據</h5>
          </div>
        </div>
        <div
            class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3"
        >
          <div class="nav-wrapper position-relative end-0">
            <ul class="p-1 nav nav-pills nav-fill" role="tablist">
              <li class="nav-item">
                <a
                    class="px-0 py-1 mb-0 nav-link active"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="true"
                >
                  <span class="ms-1 text-green">良好</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                    class="px-0 py-1 mb-0 nav-link"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="false"
                >
                  <span class="ms-1 text-yellow">恢復中</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                    class="px-0 py-1 mb-0 nav-link"
                    data-bs-toggle="tab"
                    href="javascript:"
                    role="tab"
                    aria-selected="false"
                >
                  <span class="ms-1 text-red">病情中</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <section class="py-3">
      <div class="row mb-4 mb-md-0">
        <div class="col-md-8 me-auto my-auto text-left">
          <h5>患者的基礎信息總覽</h5>
          <p>
            這裡包含了在醫院登記過的每一位患者的所有醫療記錄，包括了患者姓名、照片、性別、年齡、聯繫方式、疾病類型、治療方案、病歷號、主治醫師、健康狀況、還可查看以往檢查的記錄。
            <br />Record of patient treatment information
          </p>
        </div>
        <div class="col-lg-4 col-md-12 my-auto text-end">
          <button
              class="btn bg-gradient-success mb-0 mt-0 mt-md-n9 mt-lg-0"
              type="button"
              @click="visibleModelessDrag = true"
          >
            <i class="material-icons text-white position-relative text-md pe-2"
            >add</i
            >新增病人
          </button>
          <t-dialog
              v-model:visible="visibleModelessDrag"
              header="新增病人"
              mode="modeless"
              draggable
              :on-confirm="() => (visibleModelessDrag = false)"
          >
            <template #body>
              <t-form>
                <t-form-item label="姓名" name="name" initial-data="TDesign">
                  <t-input placeholder="請輸入內容" />
                </t-form-item>
                <t-form-item label="性別" name="gender">
                  <t-radio-group v-model="formData.sex">
                    <t-radio value="male">男</t-radio>
                    <t-radio value="femal">女</t-radio>
                  </t-radio-group>
                </t-form-item>
                <t-form-item label="年齡" name="age">
                  <t-input-number v-model="formData.age" />
                </t-form-item>
                <t-form-item label="聯繫方式" name="phone" initial-data="TDesign">
                  <t-input placeholder="請輸入內容" />
                </t-form-item>
                <t-form-item label="病歷號" name="medical-record-number" initial-data="TDesign">
                  <t-input placeholder="請輸入內容" />
                </t-form-item>
                <t-form-item label="主治醫生" name="responsible-doctor" initial-data="TDesign">
                  <t-input placeholder="請輸入內容" />
                </t-form-item>
                <t-form-item label="疾病類型" name="diagnosis" initial-data="TDesign">
                  <t-input placeholder="請輸入內容" />
                </t-form-item>
                <t-form-item label="治療方案" name="treatment-plan" initial-data="TDesign">
                  <t-input placeholder="請輸入內容" />
                </t-form-item>
                <t-form-item label="健康狀態" name="health-status">
                  <t-select class="demo-select-base" clearable>
                    <t-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label">
                      {{ item.label }}
                    </t-option>
                  </t-select>
                </t-form-item>
              </t-form>
            </template>
          </t-dialog>
        </div>
      </div>
      <div class="mt-2 row mt-lg-4">
        <div v-for="patient in patients" :key="patient.medicalRecordNumber" class="mt-4 mb-3 col-lg-4 col-md-6">
          <patient-info-card
              :image="patient.image"
              :name="patient.name"
              :sex="patient.sex"
              :age="patient.age"
              :phone="patient.phone"
              :medical-record-number="patient.medicalRecordNumber"
              :responsible-doctor="patient.responsibleDoctor"
              :diagnosis="patient.diagnosis"
              :treatment-plan="patient.treatmentPlan"
              :health-status="patient.healthStatus"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import team1 from "../assets/img/team-1.jpg";
import team2 from "../assets/img/team-2.jpg";
import team3 from "../assets/img/team-3.jpg";
import team4 from "../assets/img/team-4.jpg";
import team5 from "../assets/img/team-5.jpg";
import slackLogo from "../assets/img/small-logos/logo-slack.svg";
import invisionLogo from "../assets/img/small-logos/logo-invision.svg";
import spotifyLogo from "../assets/img/small-logos/logo-spotify.svg";
import xdLogo from "../assets/img/small-logos/logo-xd.svg";
import asanaLogo from "../assets/img/small-logos/logo-asana.svg";
import atlassianLogo from "../assets/img/small-logos/logo-atlassian.svg";

import PatientInfoCard from "../views/pages/profile/components/PatientInfoCard";
import setNavPills from "@/assets/js/nav-pills.js";

export default {
  name: "ProfileTeam",
  components: {
    PatientInfoCard,
  },
  data() {
    return {
      showMenu: false,
      team1,
      team2,
      team3,
      team4,
      team5,
      slackLogo,
      invisionLogo,
      spotifyLogo,
      xdLogo,
      asanaLogo,
      atlassianLogo,
      patients: [
        {
          name: '張文豪',
          sex: '女',
          age: 34,
          image: require("@/assets/img/people/p-1.png"),
          phone: 13514785125,
          medicalRecordNumber: 'RAsda484875215',
          responsibleDoctor: '王傑',
          diagnosis: '感冒',
          treatmentPlan: '多喝溫水，適當休息，必要時服用感冒藥。',
          healthStatus: '良好'
        },
        {
          name: '林青雲',
          sex: '女',
          age: 48,
          image: require("@/assets/img/people/p-2.png"),
          phone: 13514785125,
          medicalRecordNumber: 'Zzzsda484875215',
          responsibleDoctor: '王傑',
          diagnosis: '關節炎',
          treatmentPlan: '進行物理治療，適度運動，按醫生指示服用抗關節炎藥。',
          healthStatus: '恢復中'
        },
        {
          name: '病人叁',
          sex: '男',
          age: 28,
          image: require("@/assets/img/people/p-3.png"),
          phone: 13514785125,
          medicalRecordNumber: 'ZAXsda484875215',
          responsibleDoctor: '王傑',
          diagnosis: '心臟病',
          treatmentPlan: '保持正面心態，戒煙限酒，定期接受醫生檢查。',
          healthStatus: '病情中'
        },
        {
          name: '陳慧敏',
          sex: '女',
          age: 58,
          image: require("@/assets/img/people/p-4.png"),
          phone: 13514785125,
          medicalRecordNumber: 'ZSdssda481231275215',
          responsibleDoctor: '王傑',
          diagnosis: '糖尿病',
          treatmentPlan: '均衡飲食，規律運動，按醫生指示服用降糖藥。',
          healthStatus: '恢復中'
        },
        {
          name: '王強',
          sex: '女',
          age: 18,
          phone: 13514785125,
          image: require("@/assets/img/people/p-5.png"),
          medicalRecordNumber: 'Qdda484812375215',
          responsibleDoctor: '王傑',
          diagnosis: '高血壓',
          treatmentPlan: '調整飲食習慣，定時運動，按醫生指示服用降壓藥。',
          healthStatus: '病情中'
        },
        {
          name: '李婷婷',
          sex: '女',
          age: 23,
          phone: 13514785125,
          image: require("@/assets/img/people/p-6.png"),
          medicalRecordNumber: '123da484875215',
          responsibleDoctor: '王傑',
          diagnosis: '頭痛',
          treatmentPlan: '休息放鬆，適當運動，必要時服用止痛藥。',
          healthStatus: '良好'
        },
        {
          name: '黃小明',
          sex: '男',
          age: 25,
          phone: 13512345678,
          image: require("@/assets/img/people/p-7.png"),
          medicalRecordNumber: 'XZsda484875215',
          responsibleDoctor: '李欣',
          diagnosis: '高烧',
          treatmentPlan: '降低体温，服用退烧药，多喝水，休息。',
          healthStatus: '病情中'
        },
        {
          name: '陳美麗',
          sex: '女',
          age: 28,
          phone: 13598765432,
          image: require("@/assets/img/people/p-8.png"),
          medicalRecordNumber: 'YAsda484891215',
          responsibleDoctor: '張偉',
          diagnosis: '肚子疼',
          treatmentPlan: '观察症状，避免食用油腻食物，必要时进行检查。',
          healthStatus: '病情中'
        },
        {
          name: '林建華',
          sex: '女',
          age: 55,
          phone: 13511112222,
          image: require("@/assets/img/people/p-9.png"),
          medicalRecordNumber: 'PZsda484890115',
          responsibleDoctor: '吳思思',
          diagnosis: '高血糖',
          treatmentPlan: '控制饮食，定期测量血糖，按医嘱服药。',
          healthStatus: '病情中'
        },
        {
          name: '李小玲',
          sex: '女',
          age: 38,
          phone: 13533334444,
          image: require("@/assets/img/people/p-10.png"),
          medicalRecordNumber: 'LXsda484878915',
          responsibleDoctor: '許文宇',
          diagnosis: '流感',
          treatmentPlan: '休息，多喝水，服用感冒药。',
          healthStatus: '恢復中'
        },
        {
          name: '張明華',
          sex: '女',
          age: 50,
          phone: 13555556666,
          image: require("@/assets/img/people/p-11.png"),
          medicalRecordNumber: 'SZsda484875355',
          responsibleDoctor: '王慧',
          diagnosis: '背部疼痛',
          treatmentPlan: '物理治疗，休息，按医嘱服用药物。',
          healthStatus: '恢復中'
        },
        {
          name: '劉小紅',
          sex: '男',
          age: 30,
          phone: 13577778888,
          image: require("@/assets/img/people/p-12.png"),
          medicalRecordNumber: 'KZsda484875777',
          responsibleDoctor: '陳偉',
          diagnosis: '过敏反应',
          treatmentPlan: '避免过敏原，服用抗过敏药，观察症状。',
          healthStatus: '良好'
        }

      ],
      visibleModelessDrag: false,
      options:[
        { label: '良好', value: '1' },
        { label: '恢復中', value: '2' },
        { label: '病情中', value: '3' },
      ],
      formData:{position:""},
    };
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
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