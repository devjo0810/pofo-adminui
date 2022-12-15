<template>
  <div class="common-input-box">
    <span v-if="!!label">{{ label }}</span>
    <input
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "CommonInputBox",
  props: ["value", "label", "type"],
};
</script>

<style lang="scss">
.common-input-box {
  @include flex-between;
  width: 100%;
  height: 26px;
  span {
    min-width: 100px;
    margin-right: auto;
  }
  input {
    width: 100%;
    height: 100%;
    border: 1px solid #aaaaaa;
    padding: 0 5px;
    &:focus {
      border-color: #00adb5;
      border-width: 2px;
    }
  }
}
</style>
