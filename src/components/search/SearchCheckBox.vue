<template>
  <label class="search-check-box"
    >{{ label }}
    <input type="checkbox" :checked="value" @input="$emit('input', !value)" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  name: "SearchCheckBox",
  props: ["value", "label"],
};
</script>

<style lang="scss">
/* The container */
.search-check-box {
  display: inline-block;
  position: relative;
  padding-left: 22px;
  margin-right: 15px;
  cursor: pointer;
  font-size: 1.2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* On mouse-over, add a grey background color */
  &:hover input ~ .checkmark {
    // background-color: map-get($colors, "white-darken1");
    border-color: map-get($colors, "point");
  }

  /* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    /* When the checkbox is checked, add a blue background */
    &:checked ~ .checkmark {
      background-color: map-get($colors, "point");
      border-color: map-get($colors, "point");

      /* Show the checkmark when checked */
      &:after {
        display: block;
      }
    }
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    border: 1px solid map-get($colors, "white-darken2");
    background-color: map-get($colors, "white");

    /* Create the checkmark/indicator (hidden when not checked) */
    /* Style the checkmark/indicator */
    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 5px;
      top: 2px;
      width: 4px;
      height: 8px;
      border: solid map-get($colors, "white-lighten1");
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
</style>
