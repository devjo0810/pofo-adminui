<template>
  <button
    class="common-toggle-button"
    :class="{ active: value }"
    @click="$emit('click', !value)"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "CommonToggle",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    activeText: {
      type: String,
      default: "ON",
    },
    passiveText: {
      type: String,
      default: "OFF",
    },
  },
  computed: {
    buttonText() {
      return this.value ? this.activeText : this.passiveText;
    },
  },
};
</script>

<style lang="scss">
.common-toggle-button {
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background-color: #cccccc;
  transition: $transition;
  border: 1px solid #aaaaaa;
  font-weight: 600;
  &.active {
    background-color: #00adb5;
    color: #eeeeee;
    &:hover {
      background-color: #009198;
    }
  }
}
</style>
