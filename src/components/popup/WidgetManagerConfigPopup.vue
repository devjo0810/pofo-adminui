<template>
  <transition name="fade" v-if="isOpen">
    <div class="popup-background">
      <div class="widget-config-popup">
        <section class="header">
          <p>위젯 설정</p>
          <button @click="closePopup">
            <font-awesome-icon icon="xmark" />
          </button>
        </section>
        <section class="body">
          <div class="row between">
            <p>위젯 화면 이동 제한 여부</p>
            <CommonToggle
              :value="isParent"
              @click="toggleWidgetParent(!isParent)"
            />
          </div>
          <div class="row between">
            <p>위젯 로컬 저장</p>
            <CommonIconButton
              icon="cloud-arrow-up"
              @click="saveCurrentWidgetListToSession"
            />
          </div>
          <div class="row between">
            <p>위젯 전체 삭제</p>
            <CommonIconButton icon="trash" color="red" @click="initWidget" />
          </div>
        </section>
        <section class="version">
          <span>version {{ appVersion }}</span>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CommonToggle from "@/components/common/CommonToggle";
import CommonIconButton from "@/components/common/CommonIconButton";
import { APP } from "@/config";

export default {
  name: "WidgetManagerConfigPopup",
  components: {
    CommonToggle,
    CommonIconButton,
  },
  computed: {
    ...mapGetters({
      isOpen: "Popup/getWidgetManagerConfig",
      isParent: "WidgetManager/getIsParent",
    }),
    appVersion() {
      return APP.version;
    },
  },
  methods: {
    ...mapActions({
      closePopup: "Popup/closeWidgetManagerConfig",
      toggleWidgetParent: "WidgetManager/toggleWidgetParent",
      saveCurrentWidgetListToSession:
        "WidgetManager/saveCurrentWidgetListToSession",
      initWidget: "WidgetManager/initWidget",
    }),
  },
};
</script>

<style lang="scss" scoped>
.popup-background {
  @include flex-center;
  @include fixed-cover(9991);
  .widget-config-popup {
    background-color: map-get($colors, "white-lighten1");
    padding: 10px;
    border-radius: 10px;
    width: 300px;
    .header {
      display: flex;
      color: map-get($colors, "black");
      padding: 0 10px;
      p {
        font-size: 1.8rem;
        font-weight: 500;
      }
      button {
        font-size: 2rem;
        margin-left: auto;
      }
    }
    .body {
      margin: 20px 0;
      .row {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding: 0 10px;
        &.between {
          justify-content: space-between;
        }
        &:last-child {
          margin-bottom: 0;
        }
        p {
          font-size: 14px;
        }
      }
    }
    .version {
      @include flex-center;
    }
  }
}
</style>
