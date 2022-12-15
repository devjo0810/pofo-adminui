<template>
  <div class="main-layout">
    <MainHeader />
    <router-view />
    <WidgetManagerConfigPopup />
  </div>
</template>

<script>
import MainHeader from "./MainHeader";
import WidgetManagerConfigPopup from "@/components/popup/WidgetManagerConfigPopup";

export default {
  name: "MainLayout",
  components: {
    MainHeader,
    WidgetManagerConfigPopup,
  },
};
</script>

<style lang="scss">
.main-layout {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
