<template>
  <li class="toast-item" :class="typeClass">
    <font-awesome-icon class="icon" :icon="typeIcon" />
    <span>{{ message }}</span>
  </li>
</template>

<script>
import { TOAST } from "@/config";

export default {
  name: "ToastItem",
  props: {
    message: String,
    type: Number,
  },
  computed: {
    typeClass() {
      const type = this.type;
      return TOAST.CLASS[type];
    },
    typeIcon() {
      const type = this.type;
      return TOAST.ICON[type];
    },
  },
};
</script>

<style lang="scss">
.toast-item {
  @include list-margin-bottom(5px);
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  padding: 10px 17px;
  color: map-get($colors, "white");
  font-size: 1.4rem;
  .icon {
    font-size: 1.9rem;
    margin-right: 8px;
  }
  &.ok {
    background-color: map-get($colors, "point");
  }
  &.info {
    background-color: map-get($colors, "black-lighten2");
  }
  &.warning {
    background-color: map-get($colors, "yellow-darken1");
  }
  &.danger {
    background-color: map-get($colors, "red");
  }
}
</style>
