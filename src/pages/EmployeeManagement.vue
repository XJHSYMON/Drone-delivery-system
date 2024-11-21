<template>
  <div class="container-fluid py-4">
    <div class="d-sm-flex justify-content-between">
      <div>
        <material-button color="success" variant="gradient"  @click="visibleModelessDrag = true">新增員工</material-button>
        <t-dialog
            v-model:visible="visibleModelessDrag"
            header="新增員工"
            mode="modeless"
            draggable
            :on-confirm="() => (visibleModelessDrag = false)"
        >
          <template #body>
          <t-form>
            <t-form-item label="姓名" name="name" initial-data="TDesign">
              <t-input placeholder="請輸入內容" />
            </t-form-item>
            <t-form-item label="入職時間" name="employmentDate">
              <t-date-picker mode="date" clearable />
            </t-form-item>
            <t-form-item label="職位" name="position">
              <t-select class="demo-select-base" clearable>
                <t-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label">
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="薪資" name="salary" >
              <t-input placeholder="請輸入內容" />
            </t-form-item>
          </t-form>
        </template>
        </t-dialog>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card mt-4">
          <div class="card-header">
            <h5 class="mb-0">員工列表</h5>
            <p class="text-sm mb-0">
             在這裡可以管理你的所有員工信息。
            </p>
          </div>
          <div class="table-responsive">
            <table id="order-list" class="table table-flush">
              <thead class="thead-light">
              <tr>
                <th>員工號</th>
                <th>入職時間</th>
                <th>狀態</th>
                <th>姓名</th>
                <th>職位</th>
                <th>薪資</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in employeeData" :key="index">
                <td>
                  <div class="d-flex align-items-center">
                    <material-checkbox />
                    <p class="text-xs font-weight-bold ms-2 mb-0">{{ item.employeeId }}</p>
                  </div>
                </td>
                <td class="font-weight-bold">
                  <span class="my-2 text-xs">{{ item.employmentDate }}</span>
                </td>
                <td class="text-xs font-weight-bold">
                  <div class="d-flex align-items-center">
                    <material-button
                        v-if="item.status==='在職'"
                        color="success"
                        variant="outline"
                        class="btn-icon-only btn-rounded mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                    >
                      <i class="fas fa-check" aria-hidden="true"></i>
                    </material-button>
                    <material-button
                        v-if="item.status==='休假'"
                        color="dark"
                        variant="outline"
                        class="btn-icon-only btn-rounded mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                    >
                      <i class="fas fa-undo" aria-hidden="true"></i>
                    </material-button>
                    <material-button
                        v-if="item.status==='離職'"
                        color="danger"
                        variant="outline"
                        class="btn-icon-only btn-rounded mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                    >
                      <i class="fas fa-times" aria-hidden="true"></i>
                    </material-button>
                    <span>{{ item.status }}</span>
                  </div>
                </td>
                <td class="text-xs font-weight-bold">
                  <div class="d-flex align-items-center">
                    <img src="../assets/img/name.png" style="width: 25px;height: auto">
                    <span>{{ item.name }}</span>
                  </div>
                </td>
                <td class="text-xs font-weight-bold">
                  <img v-if="item.position==='副主任'||item.position==='主任'||item.position==='运维人员'" src="../assets/img/doctor.png" style="width: 25px;height: auto">
                  <img v-if="item.position==='运维人员'||item.position==='运维组长'" src="../assets/img/nurse.png" style="width: 25px;height: auto">
                  <span class="my-2 text-xs">{{ item.position }}</span>
                </td>
                <td class="text-xs font-weight-bold">
                  <span class="my-2 text-xs">{{ item.salary }}</span>
                </td>
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
import { DataTable } from "simple-datatables";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";


export default {
  name: "EmployeeManagement",
  components: {
    MaterialButton,
    MaterialCheckbox,
  },
  data() {
    return {
      employeeData: [
        {
          employeeId: '#A0421',
          employmentDate: '2021-10-9',
          status: '在職',
          name: '曾榮',
          position: '运维人员',
          salary: 'MOP$14020',
        },
        {
          employeeId: '#B1532',
          employmentDate: '2020-08-15',
          status: '在職',
          name: '陳秀英',
          position: '主任',
          salary: 'MOP$12500',
        },
        {
          employeeId: '#C2689',
          employmentDate: '2019-03-20',
          status: '在職',
          name: '林宏利',
          position: '副主任',
          salary: 'MOP$11000',
        },
        {
          employeeId: '#D3745',
          employmentDate: '2022-05-18',
          status: '在職',
          name: '張心怡',
          position: '主任',
          salary: 'MOP$9500',
        },
        {
          employeeId: '#E4810',
          employmentDate: '2021-12-02',
          status: '在職',
          name: '王明明',
          position: '组长',
          salary: 'MOP$8000',
        },
        {
          employeeId: '#F5923',
          employmentDate: '2020-06-10',
          status: '休假',
          name: '李建華',
          position: '主任',
          salary: 'MOP$13500',
        },
        {
          employeeId: '#G6012',
          employmentDate: '2020-11-30',
          status: '在職',
          name: '黃偉文',
          position: '组长',
          salary: 'MOP$12000',
        },
        {
          employeeId: '#H7135',
          employmentDate: '2022-02-14',
          status: '在職',
          name: '蔡雅芳',
          position: '运维人员',
          salary: 'MOP$10500',
        },
        {
          employeeId: '#I8258',
          employmentDate: '2022-09-05',
          status: '離職',
          name: '陳明道',
          position: '运维人员',
          salary: 'MOP$9000',
        },
        {
          employeeId: '#J9347',
          employmentDate: '2021-11-07',
          status: '在職',
          name: '吳俊宏',
          position: '运维人员',
          salary: 'MOP$7800',
        },
        {
          employeeId: '#K1042',
          employmentDate: '2020-04-25',
          status: '在職',
          name: '劉玲玲',
          position: '运维人员',
          salary: 'MOP$13200',
        },
        {
          employeeId: '#L2153',
          employmentDate: '2019-08-19',
          status: '在職',
          name: '黃冠宇',
          position: '运维人员',
          salary: 'MOP$11500',
        },
        {
          employeeId: '#M3264',
          employmentDate: '2022-07-12',
          status: '在職',
          name: '陳美玉',
          position: '运维人员',
          salary: 'MOP$9800',
        },
        {
          employeeId: '#N4376',
          employmentDate: '2021-10-30',
          status: '休假',
          name: '王建國',
          position: '组长',
          salary: 'MOP$9200',
        },
        {
          employeeId: '#O5489',
          employmentDate: '2020-12-15',
          status: '在職',
          name: '李淑娟',
          position: '组长',
          salary: 'MOP$7900',
        },
        {
          employeeId: '#P6591',
          employmentDate: '2020-02-28',
          status: '在職',
          name: '楊明娟',
          position: '主任',
          salary: 'MOP$13750',
        },
        {
          employeeId: '#Q7678',
          employmentDate: '2019-06-05',
          status: '在職',
          name: '林秀芳',
          position: '副主任',
          salary: 'MOP$11800',
        },
        {
          employeeId: '#R8765',
          employmentDate: '2022-03-22',
          status: '在職',
          name: '陳健民',
          position: '运维人员',
          salary: 'MOP$10300',
        },
        {
          employeeId: '#S9810',
          employmentDate: '2021-12-08',
          status: '休假',
          name: '張淑華',
          position: '运维人员',
          salary: 'MOP$9300',
        }
      ],
      visibleModelessDrag: false,
      options:[
        { label: '主任', value: '1' },
        { label: '副主任', value: '2' },
        { label: '运维人员', value: '3' },
        { label: '组长', value: '4' },
        { label: '護士', value: '5' },],
      formData:{position:""},
    };

  },
  mounted(){
    if (document.getElementById("order-list")) {
      const dataTableSearch = new DataTable("#order-list", {
        searchable: true,
        fixedHeight: false,
        perPageSelect: false,
      });
      document.querySelectorAll(".export").forEach(function (el) {
        el.addEventListener("click", function (el) {
          var type = el.dataset.type;
          var data = {
            type: type,
            filename: "soft-ui-" + type,
          };

          if (type === "csv") {
            data.columnDelimiter = "|";
          }
          dataTableSearch.export(data);
        });
      });
    }
  },
};
</script>
