<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
              class="text-sm text-center copyright text-muted"
              :class="this.$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            ©
            {{ new Date().getFullYear() }} Design By
            <a
                class="font-weight-bold"
                target="_blank"
            >粵炬（澳門）科技有限公司</a
            >
          </div>
        </div>
        <div class="col-lg-6">
          <ul
              class="nav nav-footer justify-content-center justify-content-lg-end"
          >
            <li class="nav-item">
              <a
                  class="nav-link text-muted"
                  target="_blank"
              >粵炬科技</a
              >
            </li>
            <li class="nav-item">
              <a
                  class="nav-link text-muted"
                  target="_blank"
              >關於我們</a
              >
            </li>
            <li class="nav-item">
              <a
                  class="nav-link text-muted"
                  target="_blank"
              >聯絡我們</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
