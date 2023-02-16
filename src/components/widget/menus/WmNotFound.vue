<template>
  <div>
    <p>{{ wdgtMenuNm }} NotFound</p>
    <WidgetSpinner :id="compoId" />
    <WidgetDialog :id="compoId" />
  </div>
</template>

<script>
import Base from "./BaseComponent.vue";
import { mapGetters } from "vuex";

export default {
  extends: Base,
  name: "WmNotFound",
  computed: {
    ...mapGetters({
      widgetList: "WidgetManager/getWidgetList",
    }),
    wdgtMenuNm() {
      const widget = this.widgetList.find((item) => item.id === this.compoId);
      return widget.wdgtMenuNm;
    },
  },
  mounted() {
    this.$toast.danger(
      `${this.wdgtMenuNm} 일치하는 위젯 컴포넌트를 찾을 수 없습니다.`
    );
  },
};
</script>

<style lang="scss"></style>
