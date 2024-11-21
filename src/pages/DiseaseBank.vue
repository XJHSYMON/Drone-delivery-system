<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="card-header">
            <h5 class="mb-0">疾病庫</h5>
            <p class="mb-0 text-sm">
              疾病庫是存儲關於各種疾病信息的數據庫，包括症狀、治療和統計數據，用於醫療研究和診斷。
            </p>
          </div>
          <div class="table-responsive">
            <table id="datatable-search" class="table table-bordered table-striped table-hover">
            <thead class="thead-light">
              <tr>
                <th class="text-primary">疾病名稱</th>
                <th class="text-primary">症狀</th>
                <th class="text-primary">病因</th>
                <th class="text-primary">診斷</th>
                <th class="text-primary">治療</th>
                <th class="text-primary">預防</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in diseaseData" :key="index">
                <td class="text-sm font-weight-normal">{{ item.name }}</td>
                <td class="text-sm font-weight-normal">{{ item.symptoms }}</td>
                <td class="text-sm font-weight-normal">{{ item.causes }}</td>
                <td class="text-sm font-weight-normal">{{ item.diagnosis }}</td>
                <td class="text-sm font-weight-normal">{{ item.treatment }}</td>
                <td class="text-sm font-weight-normal">{{ item.prevention }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {DataTable} from "simple-datatables";

export default {
  name: "DiseaseBank",
  data() {
    return {
      diseaseData: [
        {
          name: '高血壓',
          symptoms: '頭痛, 頭暈, 視力模糊',
          causes: '高鈉飲食, 缺乏運動, 遺傳因素',
          diagnosis: '血壓測量, 醫師評估',
          treatment: '藥物治療, 改變生活方式',
          prevention: '減少鈉攝入, 鍛煉, 保持健康體重',
        },
        {
          name: '糖尿病',
          symptoms: '多飲, 多尿, 體重減輕',
          causes: '遺傳, 肥胖, 不健康飲食',
          diagnosis: '血糖測量, 糖化血紅蛋白測試',
          treatment: '胰島素注射, 藥物, 飲食控制',
          prevention: '健康飲食, 鍛煉, 定期檢查',
        },
        {
          name: '冠心病',
          symptoms: '胸痛, 喘息, 心悸',
          causes: '高膽固醇, 吸煙, 高血壓',
          diagnosis: '心電圖, 血液測試, 心臟造影',
          treatment: '冠狀動脈搭橋術, 藥物治療',
          prevention: '健康飲食, 戒菸, 運動',
        },
        {
          name: '中風',
          symptoms: '突然面部麻痺, 言語困難, 肢體無力',
          causes: '高血壓, 吸煙, 高膽固醇',
          diagnosis: '神經影像學檢查, 腦部掃描',
          treatment: '血栓溶解劑, 物理治療',
          prevention: '壓力管理, 健康飲食, 戒菸',
        },
        {
          name: '肺癌',
          symptoms: '咳嗽, 喘息, 咳痰帶血',
          causes: '吸煙, 環境污染, 遺傳因素',
          diagnosis: '胸部X光, 痰液細胞學檢查',
          treatment: '手術, 放射線治療, 化學療法',
          prevention: '戒煙, 減少暴露於有害物質, 定期篩檢',
        },
        {
          name: '痛風',
          symptoms: '關節疼痛, 腫脹, 紅腫',
          causes: '高尿酸, 遺傳因素, 酒精過度',
          diagnosis: '尿酸檢查, 關節液抽取',
          treatment: '降尿酸藥物, 改變飲食',
          prevention: '限制高尿酸食物, 減少酒精, 增加水攝入',
        },
        {
          name: '慢性阻塞性肺疾病',
          symptoms: '呼吸困難, 咳嗽, 痰液增多',
          causes: '吸煙, 空氣污染, 遺傳因素',
          diagnosis: '肺功能測試, 胸部CT掃描',
          treatment: '吸入性藥物, 氧氣療法',
          prevention: '戒煙, 減少暴露於有害物質, 運動',
        },
        {
          name: '乳腺癌',
          symptoms: '乳房腫塊, 皮膚變化, 乳房疼痛',
          causes: '遺傳因素,女性荷爾蒙,家族史',
          diagnosis: '乳房攝影, 組織活檢',
          treatment: '手術, 放射線治療, 化學療法',
          prevention: '定期乳房自檢, 乳房攝影檢查',
        },
        {
          name: '肝硬化',
          symptoms: '腹部腫脹, 黃疸, 疲勞',
          causes: '慢性酒精濫用, 慢性病毒性肝炎, 脂肪肝',
          diagnosis: '肝功能測試, 超聲檢查',
          treatment: '戒酒, 藥物治療, 肝臟移植',
          prevention: '戒酒, 疫苗接種, 健康飲食',
        },
        {
          name: '腎臟結石',
          symptoms: '腹部疼痛, 血尿, 呼吸急促',
          causes: '遺傳因素, 高鈣攝入, 不足水分攝取',
          diagnosis: '腹部CT掃描, 尿液分析',
          treatment: '通過尿液排出, 手術',
          prevention: '足夠水分攝取, 限制高鈣食物',
        },
        {
          name: '帕金森病',
          symptoms: '肌肉僵硬, 顫抖, 運動困難',
          causes: '神經細胞損傷, 環境因素, 遺傳因素',
          diagnosis: '醫生評估, 腦部影像學',
          treatment: '藥物治療, 物理治療',
          prevention: '健康生活方式, 避免有毒物質',
        },
        {
          name: '抑郁症',
          symptoms: '情緒低落, 無興趣, 睡眠問題',
          causes: '生物學因素, 環境壓力, 遺傳因素',
          diagnosis: '心理評估, 醫生診斷',
          treatment: '諮商, 藥物治療, 心理治療',
          prevention: '情緒管理, 健康生活方式, 支持系統',
        },
        {
          name: '膀胱癌',
          symptoms: '尿血, 尿頻, 下腹疼痛',
          causes: '吸煙, 長期尿道刺激, 化學物質暴露',
          diagnosis: '膀胱鏡檢查, 尿液細胞學',
          treatment: '手術, 放射線治療, 化學療法',
          prevention: '戒煙, 避免有害暴露, 健康飲食',
        },
        {
          name: '阿茲海默病',
          symptoms: '記憶喪失, 認知能力下降, 行為變化',
          causes: '腦細胞退化, 神經損傷, 遺傳因素',
          diagnosis: '神經心理測試, 腦部影像學',
          treatment: '症狀管理藥物, 支持性療法',
          prevention: '腦健康活動, 健康飲食, 心智訓練',
        },
        {
          name: '子宮頸癌',
          symptoms: '陰道出血, 盆腔疼痛, 疲勞',
          causes: '人乳頭瘤病毒感染, 性行為, 吸煙',
          diagnosis: '子宮頸抹片, 子宮頸生檢',
          treatment: '手術, 放射線治療, 化學療法',
          prevention: '子宮頸疫苗接種, 定期篩檢, 戒煙',
        },
        {
          name: '癲癇',
          symptoms: '癲癇發作, 意識喪失, 抽搐',
          causes: '腦細胞異常活動, 遺傳因素, 腦損傷',
          diagnosis: '腦電圖檢查, 醫生評估',
          treatment: '抗癲癇藥物, 神經外科手術',
          prevention: '藥物依方, 避免觸發因素',
        },
        {
          name: '骨質疏鬆症',
          symptoms: '骨折, 背部彎曲, 身高減少',
          causes: '遺傳因素, 女性荷爾蒙下降, 鈣攝入不足',
          diagnosis: '骨密度測試, X光檢查',
          treatment: '骨密度藥物, 補充鈣和維生素D',
          prevention: '足夠鈣攝入, 適量運動, 戒菸',
        },
        {
          name: '青光眼',
          symptoms: '視力模糊, 眼壓升高, 視野縮小',
          causes: '眼壓升高, 遺傳因素, 年齡',
          diagnosis: '眼壓測量, 視網膜檢查',
          treatment: '降眼壓藥物, 眼手術',
          prevention: '定期眼檢, 眼保健飲食, 節制咖啡因',
        },
        {
          name: '潰瘍性結腸炎',
          symptoms: '腹痛, 腹瀉, 便血',
          causes: '免疫系統異常, 遺傳因素,環境因素',
          diagnosis: '結腸鏡檢查, 血液測試',
          treatment: '抗炎藥物, 免疫調節劑',
          prevention: '避免壓力, 健康飲食, 戒菸',
        },
        {
          name: '慢性腎臟病',
          symptoms: '水腫, 高血壓, 肌肉無力',
          causes: '糖尿病, 高血壓, 腎臟感染',
          diagnosis: '腎功能測試, 腹部超聲檢查',
          treatment: '藥物治療, 透析, 腎臟移植',
          prevention: '控制糖尿病, 減少鈉攝入, 健康飲食',
        },
        {
          name: '自閉症',
          symptoms: '社交障礙, 言語困難, 重複行為',
          causes: '基因, 腦發育異常, 環境因素',
          diagnosis: '行為評估, 兒科診斷',
          treatment: '行為療法, 語言治療, 藥物',
          prevention: '早期介入, 家庭支持, 教育',
        }
      ]

    }
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const 疾病庫 = new DataTable("#datatable-search", {
      searchable: true,
      fixedHeight: false,
    });
  },
}
</script>

<style scoped>

</style>