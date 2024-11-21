<template>
  <router-link :to="to">
    <a
        :data-bs-toggle="collapse ? 'collapse' : ''"
        aria-expanded="false"
        :href="collapse ? `#${collapseRef}` : collapseRef"
        :aria-controls="collapseRef"
        class="nav-link"
        v-bind="$attrs"
        @click="isExpanded = !isExpanded"
    >
      <div
          class="text-center d-flex align-items-center justify-content-center"
          :class="isRTL ? ' ms-2' : 'me-2'"
      >
        <slot name="icon"></slot>
      </div>
      <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">{{
          navText
        }}</span>
    </a>

    <div :id="collapseRef" class="collapse">
      <slot name="list"></slot>
    </div>
  </router-link>
</template>
<script>
import {mapState} from "vuex";
let empty = {name: ''}
export default {
  name: "SidenavCollapse",
  props: {
    collapseRef: {
      type: String,
      required: true,
    },
    navText: {
      type: String,
      required: true,
    },
    collapse: {
      type: Boolean,
      default: true,
    },
    to: {
      type: [Object, String],
      default: empty
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    ...mapState(["isRTL"]),
  },

};
</script>
