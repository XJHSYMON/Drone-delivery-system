<template>
  <div class="bg-white">
    <main class="mt-0 main-content">
      <section>
        <div class="page-header min-vh-100">
          <div class="container">
            <div class="row">
              <div
                  class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
              >
                <div
                    class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    :style="{
                    background:
                      'url(' +
                      require('@/assets/img/background/login-bg.png') +
                      ') no-repeat',
                  }"
                    style="background-size: cover"
                ></div>
              </div>
              <div
                  class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
              >
                <div class="card card-plain">
                  <div class="pb-0 card-header text-center bg-transparent mb-4">
                    <h2 class="font-weight-bolder">智慧醫療輔助系統</h2>
                    <p class="mb-0">基於物聯網和AI技術 幫助醫生快速定位問題</p>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <material-input
                          id="email"
                          type="email"
                          label="用戶名..."
                          name="email"
                          size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <material-input
                          id="password"
                          type="password"
                          label="密碼..."
                          name="password"
                          size="lg"
                      />
                    </div>
                    <material-switch id="rememberMe" name="Remember Me"
                    >保持登陸狀態
                    </material-switch
                    >

                    <div class="text-center">
                      <material-button
                          class="mt-4"
                          variant="gradient"
                          color="success"
                          full-width
                          style="position: relative"
                          size="lg"
                          @click="login"
                      >登陸
                        <t-loading v-if="isLogging" size="small" :inherit-color="true"
                                   style="position: absolute;right: 20px;top:14px"></t-loading>
                      </material-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const body = document.getElementsByTagName("body")[0];
import {mapMutations} from "vuex";
import {MessagePlugin} from 'tdesign-vue-next';

export default {
  name: "LoginPage",
  components: {
    MaterialInput,
    MaterialSwitch,
    MaterialButton
  },
  data() {
    return {
      isLogging: false
    }
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    login() {
      this.isLogging = true;
      setTimeout(() => {
        MessagePlugin.success({content: '登陸成功！', duration: 1000})
        this.isLogging = false;
        this.$router.push("/")
      }, 1500)
    },
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),

  },
};
</script>
