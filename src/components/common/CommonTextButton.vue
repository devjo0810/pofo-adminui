<template>
  <button
    ref="button"
    class="common-text-button"
    :class="color"
    @click="$emit('click')"
    @keyup.enter="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "CommonTextButton",
  props: {
    label: String,
    color: {
      type: String,
      required: false,
    },
    isFocus: Boolean,
  },
  mounted() {
    if (this.isFocus) {
      this.$refs.button.focus();
    }
  },
};
</script>

<style lang="scss">
.common-text-button {
  padding: 5px;
  border: 1px solid #aaaaaa;
  background-color: #eeeeee;
  transition: $transition;
  &:hover {
    background-color: #aaaaaa;
  }
  &.primary {
    background-color: #00adb5;
    border-color: #00adb5;
    color: #eeeeee;
    &:hover {
      background-color: #009198;
    }
  }
}
</style>
