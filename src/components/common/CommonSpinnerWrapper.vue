<template>
  <div class="spinner-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: "CommonSpinnerWrapper",
};
</script>

<style lang="scss">
.spinner-wrapper {
  @include flex-center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
