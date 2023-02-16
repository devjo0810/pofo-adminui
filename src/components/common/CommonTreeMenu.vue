<template>
  <li class="common-tree-menu" @click.stop="handleClick(options)">
    <span class="title">{{ options.menuNm }}</span>
    <span class="right-icon" v-if="subMenuShow"
      ><font-awesome-icon icon="caret-right"
    /></span>
    <ul v-if="subMenuShow">
      <common-tree-menu
        v-for="(subMenu, i) in options._children"
        :key="i"
        :options="subMenu"
        @click="handleClick"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "CommonTreeMenu",
  props: {
    options: Object,
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

<style lang="scss">
.common-tree-menu {
  .right-icon {
    margin-left: 5px;
  }
}
</style>
