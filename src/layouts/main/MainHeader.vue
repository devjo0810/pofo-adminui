<template>
  <header class="main-header">
    <ul class="left-section">
      <CommonDropDownMenu
        class="nav-menu"
        v-for="(item, i) in widgetMenuList"
        :key="i"
        :options="item"
        :subMenuWrapperClass="'nav-sub-menu-wrapper'"
        @click="handleMenuClick"
      />
    </ul>
    <section class="right-section">
      <button title="위젯설정" @click="openWidgetManagerConfigPopup">
        <font-awesome-icon icon="gear" />
      </button>
    </section>
  </header>
</template>

<script>
import CommonDropDownMenu from "@/components/common/CommonDropDownMenu";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainHeader",
  components: {
    CommonDropDownMenu,
  },
  computed: {
    ...mapGetters({
      widgetMenuList: "Menu/getWidgetMenuList",
    }),
  },
  methods: {
    ...mapActions({
      createWidget: "WidgetManager/createWidget",
      openWidgetManagerConfigPopup: "Popup/openWidgetManagerConfig",
    }),
    handleMenuClick(menu) {
      const { menuYn } = menu;
      // console.log("handleMenuClick", menuId, title, compoName, isWidget);
      if (menuYn !== "1") return;
      this.createWidget(menu);
    },
  },
};
</script>

<style lang="scss">
.main-header {
  @include flex-between;
  position: relative;
  z-index: 100;
  width: 100%;
  height: map-get($main-layout, "header-height");
  padding: 0 3vw;
  background-color: map-get($colors, "black");
  color: map-get($colors, "white");
  border-bottom: 3px solid map-get($colors, "point");

  .left-section {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 1.3rem;
    height: 100%;
    .nav-menu {
      @include flex-center;
      position: relative;
      height: 100%;
      width: 120px;
      cursor: pointer;
      padding: 0 5px;
      transition: $transition;
      > span {
        @include overflow-ellipsis;
      }
      &:hover {
        background-color: map-get($colors, "black-lighten2");
        .nav-sub-menu-wrapper {
          display: flex;
        }
      }
      .nav-sub-menu-wrapper {
        cursor: default;
        position: absolute;
        top: map-get($main-layout, "header-height") - 3px;
        left: 0;
        display: none;
        flex-direction: column;
        width: max-content;
        max-width: 250px;
        min-width: 120px;
        margin: 0;
        padding: 3px 0;
        background-color: map-get($colors, "white-lighten1");
        color: map-get($colors, "black-lighten2");
        border: 1px solid map-get($colors, "white-darken1");
        font-size: 1.2rem;
        li {
          @include flex-between;
          cursor: pointer;
          position: relative;
          padding: 5px;
          &:hover {
            background-color: map-get($colors, "white");
            > ul {
              display: flex;
            }
          }
          > ul {
            cursor: default;
            position: absolute;
            top: -4px;
            left: 100%;
            display: none;
            flex-direction: column;
            width: max-content;
            max-width: 250px;
            min-width: 120px;
            margin: 0;
            padding: 3px 0;
            background-color: map-get($colors, "white-lighten1");
            color: map-get($colors, "black-lighten2");
            border: 1px solid map-get($colors, "white-darken1");
          }
        }
      }
    }
  }

  .right-section {
    background-color: inherit;
    button {
      font-size: 2rem;
      background-color: inherit;
      color: inherit;
      cursor: pointer;
    }
  }
}
</style>
