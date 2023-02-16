<template>
  <li class="common-drop-down-menu" @click.stop="handleClick(options)">
    <span>{{ options.menuNm }}</span>
    <ul v-if="subMenuShow" :class="subMenuWrapperClass">
      <CommonTreeMenu
        v-for="(subMenu, i) in options._children"
        :key="i"
        :options="subMenu"
        @click="handleClick"
      />
    </ul>
  </li>
</template>

<script>
import CommonTreeMenu from "./CommonTreeMenu.vue";

export default {
  name: "CommonDropDownMenu",
  components: {
    CommonTreeMenu,
  },
  props: {
    options: Object,
    subMenuWrapperClass: String,
  },
  computed: {
    subMenuShow() {
      const { options } = this;
      if (options._children && options._children) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    handleClick(menu) {
      this.$emit("click", menu);
    },
  },
};
</script>
