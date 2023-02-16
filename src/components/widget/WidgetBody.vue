<template>
  <div class="widget-body" @click="$emit('widgetBodyClick')">
    <component
      ref="bodyComponent"
      v-if="component"
      :is="component"
      v-bind="compoData"
      :compoId="compoId"
      @mounted="handleMounted"
    />
  </div>
</template>

<script>
import { WIDGET } from "@/config";
import NotFound from "./menus/WmNotFound";

export default {
  name: "WidgetBody",
  props: {
    compoId: {
      // 컴포넌트 고유 Id
      type: String,
      required: true,
    },
    wdgtMenuNm: {
      // Widget 컴포넌트명
      type: String,
    },
    compoData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    // 동적 컴포넌트 로딩
    component() {
      const menuName = WIDGET.MENU_PREFIX + this.wdgtMenuNm;
      return () =>
        import(`@/components/widget/menus/${menuName}`).catch(() => NotFound);
    },
    bodyComponent() {
      return this.$refs.bodyComponent;
    },
    bodyScrollWidth() {
      const bodyComponent = this.bodyComponent;
      if (!bodyComponent) return null;
      return bodyComponent.$el.scrollWidth;
    },
    bodyScrollHeight() {
      const bodyComponent = this.bodyComponent;
      if (!bodyComponent) return null;
      return bodyComponent.$el.scrollHeight;
    },
  },
  methods: {
    ready() {
      // console.log("ready", this.bodyScrollWidth, this.bodyScrollHeight);
      this.$emit(
        "widgetBodyReady",
        this.bodyScrollWidth,
        this.bodyScrollHeight,
        this.bodyComponent
      );
    },
    handleMounted() {
      this.ready();
    },
  },
};
</script>

<style lang="scss">
.widget-body {
  position: relative;
  z-index: 0;
  width: 100%;
  height: calc(100% - map-get($widget, "widget-header-height"));
  overflow: auto;
}
</style>
