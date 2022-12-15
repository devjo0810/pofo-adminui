<template>
  <div class="widget-manager" ref="widgetManager">
    <WidgetComponent
      v-for="widget in widgetList"
      :key="widget.id"
      v-bind="widget"
    />
  </div>
</template>

<script>
import WidgetComponent from "./WidgetComponent";
import { mapGetters } from "vuex";

export default {
  name: "WidgetManager",
  components: {
    WidgetComponent,
  },
  computed: {
    ...mapGetters({
      widgetList: "WidgetManager/getWidgetList",
    }),
  },
};
</script>

<style lang="scss">
.widget-manager {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
