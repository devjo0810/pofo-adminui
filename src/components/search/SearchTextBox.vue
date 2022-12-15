<template>
  <div class="search-text-box">
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "SearchTextBox",
  props: ["value", "label", "placeholder"],
  mounted() {
    this.$emit("input", this.value);
  },
};
</script>

<style lang="scss">
.search-text-box {
  width: 100%;
  height: 28px;
  input {
    width: 100%;
    height: 100%;
    border: 1px solid #aaaaaa;
    padding: 0 5px;
    font-size: 1.2rem;
    &:focus {
      border-color: #00adb5;
      border-width: 1px;
    }
  }
}
</style>
