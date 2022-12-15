<template>
  <component :is="layoutName" />
</template>

<script>
import NoLayout from "./NoLayout.vue";
import MainLayout from "./main/MainLayout.vue";

export default {
  name: "DynamicLayout",
  components: {
    NoLayout,
    MainLayout,
  },
  computed: {
    layoutName() {
      const layout = this.$route.meta.layout || "No";
      return layout + "Layout";
    },
  },
};
</script>
