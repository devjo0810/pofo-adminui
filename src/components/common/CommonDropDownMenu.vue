<template>
  <li class="common-drop-down-menu" @click.stop="handleClick(options)">
    <span>{{ options.title }}</span>
    <ul v-if="subMenuShow" :class="subMenuWrapperClass">
      <CommonTreeMenu
        v-for="(subMenu, i) in options.menuList"
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
      if (options.menuList && options.menuList) {
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
