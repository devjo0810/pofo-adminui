<template>
  <div class="widget-header" @click="$emit('widgetHeaderClick')">
    <section class="title-section widget-drag-handle">
      <p>{{ menuNm }}</p>
    </section>
    <section class="btn-section">
      <button title="왼쪽정렬" @click="$emit('leftSideWidget')">
        <font-awesome-icon icon="caret-left" />
      </button>
      <button title="오른쪽정렬" @click="$emit('rightSideWidget')">
        <font-awesome-icon icon="caret-right" />
      </button>
      <button title="최소화" @click="$emit('minimizeWidget')">
        <font-awesome-icon icon="window-minimize" />
      </button>
      <button
        v-if="!isFullSize"
        title="전체크기"
        @click="$emit('fullSizeWidget')"
      >
        <font-awesome-icon icon="maximize" />
      </button>
      <button
        v-if="isFullSize"
        title="창크기"
        @click="$emit('smallSizeWidget')"
      >
        <font-awesome-icon icon="minimize" />
      </button>
      <button title="닫기" @click="$emit('closeWidget')">
        <font-awesome-icon icon="xmark" />
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: "WidgetHeader",
  props: {
    menuNm: {
      type: String,
      default: "Title",
    },
    isFullSize: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.widget-header {
  @include overflow-ellipsis;
  display: flex;
  align-items: center;
  width: 100%;
  height: map-get($widget, "widget-header-height");
  background-color: map-get($colors, "white");
  border-bottom: 1px solid map-get($colors, "black");
  color: map-get($colors, "black");
  .widget-drag-handle {
    cursor: move;
    width: 100%;
    height: 100%;
  }
  .title-section {
    display: flex;
    align-items: center;
    padding-left: 8px;
    p {
      font-size: 1.2rem;
    }
  }
  .btn-section {
    display: flex;
    margin-left: auto;
    height: 100%;
    font-size: 1.1rem;
    button {
      height: 100%;
      width: map-get($widget, "widget-header-height");
      color: map-get($colors, "black");
      transition: $transition;
      &:hover {
        background-color: map-get($colors, "white-darken2");
      }
    }
  }
}
</style>
