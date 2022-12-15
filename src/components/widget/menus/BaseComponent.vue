<template>
  <div class="widget-menu-base">
    <WidgetSpinner :id="compoId" />
    <WidgetDialog :id="compoId" />
  </div>
</template>

<script>
import WidgetSpinner from "@/components/widget/WidgetSpinner.vue";
import WidgetDialog from "@/components/widget/WidgetDialog.vue";

export default {
  components: {
    WidgetSpinner,
    WidgetDialog,
  },
  props: {
    compoId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // console.log(this.$options.name + " mounted");
    this.$emit("mounted");
  },
};
</script>
