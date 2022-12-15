<template>
  <VueDraggableResizable
    v-show="!isMinimize"
    ref="widget"
    class="widget-component"
    :class="{ top: id === maxZindexId }"
    :parent="isParnet"
    :min-width="widgetMinWidth"
    :min-height="widgetMinHeight"
    :drag-handle="dragHandle"
    :active.sync="widgetActive"
    :prevent-deactivation="true"
    :w="w"
    :h="h"
    :x="x"
    :y="y"
    :z="zindex"
    :draggable="!isFullSize"
    :resizable="!isFullSize"
    @dragging="handleDragging"
    @resizing="handleResizing"
    @resizestop="handleResizingStop"
  >
    <WidgetHeader
      :title="title"
      :isFullSize="isFullSize"
      @widgetHeaderClick="handleWidgetHeaderClick"
      @minimizeWidget="handleMinimizeWidget"
      @fullSizeWidget="handleFullSizeWidget"
      @smallSizeWidget="handleSmallSizeWidget"
      @closeWidget="handleCloseWidget"
      @leftSideWidget="handleLeftSideWidget"
      @rightSideWidget="handleRightSideWidget"
    />
    <WidgetBody
      :compoId="id"
      :compoName="compoName"
      :compoData="compoData"
      @widgetBodyClick="handleWidgetHeaderClick"
      @widgetBodyReady="handleWidgetBodyReady"
    />
  </VueDraggableResizable>
</template>

<script>
import WidgetHeader from "./WidgetHeader";
import WidgetBody from "./WidgetBody";
import VueDraggableResizable from "vue-draggable-resizable";
import { WIDGET } from "@/config";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "WidgetComponent",
  components: {
    VueDraggableResizable,
    WidgetHeader,
    WidgetBody,
  },
  props: {
    dragHandle: {
      // 위젯 핸들링 클래스명
      type: String,
      default: WIDGET.DRAG_HANDLE,
    },
    compoName: {
      // Widget Body에 import할 클래스명
      type: String,
      required: true,
    },
    title: {
      // Widget Header에 바인딩할 title
      type: String,
      default: "Unknown",
    },
    compoData: {
      // Widget 컴포넌트에 전달할 데이터
      type: Object,
      default: () => ({}),
    },
    id: {
      // 고유key
      type: String,
      required: true,
    },
    x: {
      // x position
      type: Number,
      default: 0,
    },
    y: {
      // y position
      type: Number,
      default: 0,
    },
    w: {
      // width
      type: Number,
      default: 200,
    },
    h: {
      // height
      type: Number,
      default: 200,
    },
    zindex: {
      // zindex값
      type: Number,
      required: true,
    },
    isFullSize: {
      // 전체화면 여부
      type: Boolean,
      default: false,
    },
    isMinimize: {
      // 최소화 여부
      type: Boolean,
      default: false,
    },
    isAutoSize: {
      // 자동크기 여부
      type: Boolean,
    },
  },
  data: () => ({
    widgetMinWidth: WIDGET.MIN_WIDTH,
    widgetMinHeight: WIDGET.MIN_HEIGHT,
    widgetActive: true,
  }),
  computed: {
    ...mapGetters({
      isParnet: "WidgetManager/getIsParent",
      maxZindexId: "WidgetManager/getMaxZindexId",
    }),
    parentWidth() {
      const widget = this.$refs.widget;
      return widget.parentWidth;
    },
    parentHeight() {
      const widget = this.$refs.widget;
      return widget.parentHeight;
    },
  },
  methods: {
    ...mapActions({
      sortWidgetZindexAction: "WidgetManager/sortWidgetZindex",
      fullSizingWidgetAction: "WidgetManager/fullSizingWidget",
      smallSizingWidgetAction: "WidgetManager/smallSizingWidget",
      closeWidgetAction: "WidgetManager/closeWidget",
      updateWidgetPositionAction: "WidgetManager/updateWidgetPosition",
      updateWidgetSizeAction: "WidgetManager/updateWidgetSize",
      updateWidgetSizeAndPositionAction:
        "WidgetManager/updateWidgetSizeAndPosition",
      minimizingWidgetAction: "WidgetManager/minimizingWidget",
      updateWidgetSidePositionAction: "WidgetManager/updateWidgetSidePosition",
      incrementSizeReset: "WidgetManager/incrementSizeReset",
    }),
    handleWidgetHeaderClick() {
      // this.handleWidgetActive(true);
      this.sortWidgetZindexAction(this.id);
    },
    handleWidgetBodyClick() {
      // this.handleWidgetActive(true);
      this.sortWidgetZindexAction(this.id);
    },
    handleWidgetBodyReady(w, h) {
      if (this.isAutoSize) {
        this.updateWidgetSizeAction({
          id: this.id,
          w,
          h: h + WIDGET.HEADER_HEIGHT,
        });
      }
    },
    handleWidgetActive(isActive) {
      this.widgetActive = isActive;
    },
    handleMinimizeWidget() {
      this.minimizingWidgetAction(this.id);
    },
    handleFullSizeWidget() {
      const params = {
        id: this.id,
        w: this.parentWidth,
        h: this.parentHeight,
      };
      this.fullSizingWidgetAction(params);
    },
    handleSmallSizeWidget() {
      this.smallSizingWidgetAction(this.id);
    },
    handleCloseWidget() {
      this.closeWidgetAction(this.id);
    },
    handleDragging(x, y) {
      const params = { id: this.id, x, y };
      this.updateWidgetPositionAction(params);
    },
    handleResizing(x, y, w, h) {
      const params = { id: this.id, x, y, w, h };
      this.updateWidgetSizeAndPositionAction(params);
    },
    handleResizingStop() {
      this.incrementSizeReset(this.id);
    },
    handleLeftSideWidget() {
      const params = {
        id: this.id,
        x: 0,
        y: 0,
        w: this.parentWidth / 2,
        h: this.parentHeight,
      };
      this.updateWidgetSidePositionAction(params);
    },
    handleRightSideWidget() {
      const halfWidth = this.parentWidth / 2;
      const params = {
        id: this.id,
        x: halfWidth,
        y: 0,
        w: halfWidth,
        h: this.parentHeight,
      };
      this.updateWidgetSidePositionAction(params);
    },
  },
};
</script>

<style lang="scss">
.widget-component {
  background-color: map-get($colors, "white-lighten1");
  border: 1px solid map-get($colors, "black");
  &.top {
    .widget-header {
      background-color: map-get($colors, "white-darken1");
    }
  }
}
.handle {
  width: map-get($widget, "handle-size");
  height: map-get($widget, "handle-size");
  background: none;
  border: none;
  margin: 0;
  z-index: 1;
  &-tl {
    top: 0;
    left: 0;
    z-index: 2;
  }
  &-tm {
    top: 0;
    left: 0;
    width: 100%;
  }
  &-tr {
    top: 0;
    right: 0;
    z-index: 2;
  }
  &-ml {
    top: 0;
    left: 0;
    height: 100%;
  }
  &-mr {
    top: 0;
    right: 0;
    height: 100%;
  }
  &-bl {
    bottom: 0;
    left: 0;
    z-index: 2;
  }
  &-bm {
    bottom: 0;
    left: 0;
    width: 100%;
  }
  &-br {
    bottom: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
