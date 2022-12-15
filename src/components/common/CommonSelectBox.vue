<template>
  <div class="common-select-box">
    <span v-if="!!label">{{ label }}</span>
    <select :value="value" @input="$emit('input', $event.target.value)">
      <option
        v-for="(optionItem, i) in displayItems"
        :key="i"
        :value="optionItem.value"
      >
        {{ optionItem.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CommonSelectBox",
  props: {
    value: [String, Number],
    label: String,
    items: Array,
    tempYn: {
      type: String,
      default: "Y",
    },
    tempLabel: {
      type: String,
      default: "선택",
    },
  },
  computed: {
    displayItems() {
      const { tempYn, tempLabel, items } = this;
      if (tempYn === "Y") {
        return [{ value: "", label: tempLabel }, ...items];
      } else {
        return [...items];
      }
    },
  },
};
</script>

<style lang="scss">
.common-select-box {
  @include flex-between;
  width: 100%;
  height: 26px;
  span {
    min-width: 100px;
    margin-right: auto;
  }
  select {
    width: 100%;
    height: 100%;
    border: 1px solid #aaaaaa;
    padding: 0 5px;
    cursor: pointer;
    &:focus {
      border-color: #00adb5;
      border-width: 2px;
    }
  }
}
</style>
