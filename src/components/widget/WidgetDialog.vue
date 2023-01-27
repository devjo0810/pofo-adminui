<template>
  <transition name="fade" v-if="show">
    <div class="dialog-wrapper">
      <div class="common-dialog">
        <div class="dialog-header" v-if="title">
          <h3>{{ title }}</h3>
        </div>
        <div class="dialog-body">
          <p>{{ message }}</p>
        </div>
        <div class="dialog-footer">
          <CommonTextButton
            label="확인"
            color="primary"
            :isFocus="true"
            @click="close(true)"
          />
          <CommonTextButton
            v-if="type === DIALOG_TYPE.CONFIRM"
            label="취소"
            @click="close(false)"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CommonTextButton from "../common/CommonTextButton.vue";
import { DIALOG_TYPE } from "@/config";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "WidgetDialog",
  components: {
    CommonTextButton,
  },
  props: {
    id: String,
  },
  computed: {
    ...mapGetters({
      widgetList: "WidgetManager/getWidgetList",
    }),
    dialogOptions() {
      const widget = this.widgetList.find((item) => item.id === this.id);
      return widget.dialog;
    },
    show() {
      return this.dialogOptions.show;
    },
    type() {
      return this.dialogOptions.type;
    },
    title() {
      return this.dialogOptions.title;
    },
    message() {
      return this.dialogOptions.message;
    },
    callback() {
      return this.dialogOptions.callback;
    },
  },
  data: () => ({
    DIALOG_TYPE,
  }),
  methods: {
    ...mapActions({
      closeDialog: "WidgetManager/closeDialog",
    }),
    close(flag) {
      if (this.callback) {
        this.callback(flag);
      }
      this.closeDialog(this.id);
    },
  },
};
</script>

<style lang="scss">
.dialog-wrapper {
  @include flex-center;
  position: fixed;
  left: 0;
  top: map-get($widget, "widget-header-height");
  z-index: 9998;
  width: 100%;
  height: calc(100% - map-get($widget, "widget-header-height"));
  background-color: rgba(0, 0, 0, 0.2);

  .common-dialog {
    background-color: map-get($colors, "white-lighten1");
    border: 1px solid map-get($colors, "black");
    min-width: 250px;
    .dialog-header {
      @include flex-center;
      background-color: map-get($colors, "black");
      color: map-get($colors, "white");
      padding: 5px 0;
      font-size: 1.3rem;
      h3 {
        margin: 0;
      }
    }
    .dialog-body {
      @include flex-start;
      padding: 20px 5px;
      width: 100%;
      max-height: 400px;
      overflow-y: auto;
      font-size: 1.2rem;
    }
    .dialog-footer {
      @include flex-center;
      padding: 5px;
      border-top: 1px solid map-get($colors, "white-darken2");
      button {
        @include list-margin-right(5px);
        flex: 1;
      }
    }
  }
}
</style>
