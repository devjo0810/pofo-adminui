<template>
  <div class="no-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "NoLayout",
};
</script>

<style lang="scss">
.no-layout {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
