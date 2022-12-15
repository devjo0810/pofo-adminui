<template>
  <div class="main-view">
    <div class="main-widget-wrapper">
      <WidgetManager />
    </div>
    <div class="minimize-widget-wrapper"><MinimizeWidgetManager /></div>
  </div>
</template>

<script>
import WidgetManager from "@/components/widget/WidgetManager";
import MinimizeWidgetManager from "@/components/widget/MinimizeWidgetManager";

export default {
  name: "HomeView",
  components: {
    WidgetManager,
    MinimizeWidgetManager,
  },
};
</script>

<style lang="scss">
.main-view {
  width: 100%;
  height: calc(100% - map-get($main-layout, "header-height"));
  .main-widget-wrapper {
    width: 100%;
    height: calc(100% - map-get($widget, "minimize-wrapper-height"));
    background-color: map-get($colors, "white-lighten1");
  }
  .minimize-widget-wrapper {
    width: 100%;
    height: map-get($widget, "minimize-wrapper-height");
    background-color: map-get($colors, "black");
  }
}
</style>
