<template>
  <transition-group name="slide-up" tag="ul" class="toast-manager">
    <ToastItem
      v-for="toast in toastList"
      :key="toast.id"
      v-bind="toast"
      class="slide-up-item"
    />
  </transition-group>
</template>

<script>
import { mapGetters } from "vuex";
import ToastItem from "./ToastItem.vue";

export default {
  name: "ToastManager",
  components: {
    ToastItem,
  },
  computed: {
    ...mapGetters({
      toastList: "Toast/getToastList",
    }),
  },
};
</script>

<style lang="scss">
.toast-manager {
  position: fixed;
  bottom: map-get($widget, "minimize-wrapper-height") + 10px;
  right: 10px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
}
</style>
