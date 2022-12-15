<template>
  <div id="app">
    <DynamicLayout />
    <ToastManager />
  </div>
</template>

<script>
import DynamicLayout from "@/layouts/DynamicLayout.vue";
import ToastManager from "@/components/toast/ToastManager.vue";

export default {
  components: {
    DynamicLayout,
    ToastManager,
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
