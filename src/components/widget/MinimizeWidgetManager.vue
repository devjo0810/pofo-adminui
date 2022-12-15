<template>
  <div class="minimize-widget-manager">
    <div
      class="minimize-widget"
      v-for="item in widgetList"
      :key="item.id"
      :class="{ active: item.id === maxZindexId && !item.isMinimize }"
      @mousedown.left="toggleMinimizingWidget(item.id)"
    >
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MinimizeWidgetManager",
  computed: {
    ...mapGetters({
      widgetList: "WidgetManager/getWidgetList",
      maxZindexId: "WidgetManager/getMaxZindexId",
    }),
    minimizeWidgetList() {
      const widgetList = this.widgetList;
      return widgetList.filter((item) => item.isMinimize);
    },
  },
  methods: {
    ...mapActions({
      toggleMinimizingWidget: "WidgetManager/toggleMinimizingWidget",
    }),
  },
};
</script>

<style lang="scss">
.minimize-widget-manager {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1px;
  .minimize-widget {
    margin-right: 3px;
    height: 100%;
    width: map-get($widget, "minimize-widget-width");
    cursor: pointer;
    display: flex;
    align-items: center;
    background-color: map-get($colors, "black");
    border-bottom: 2px solid map-get($colors, "point");
    color: map-get($colors, "white-lighten1");
    transition: $transition;
    &.active {
      background-color: map-get($colors, "black-lighten2");
    }
    &:hover {
      background-color: map-get($colors, "black-lighten2");
    }
    p {
      padding: 0 3px;
      @include overflow-ellipsis;
    }
  }
}
</style>
