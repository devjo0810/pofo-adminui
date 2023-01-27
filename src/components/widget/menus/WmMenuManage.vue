<template>
  <div class="wm-menu-manage flex-container">
    <div class="body flex-item">
      <div class="h100p pb10 flex-column">
        <div class="flex-auto">
          <TuiGrid ref="masterGrid" v-bind="masterGridProps" />
        </div>
        <div class="button-area mt5">
          <CommonTextButton label="행 추가" @click="appendRowForMaster" />
          <CommonTextButton label="저장" />
        </div>
      </div>
    </div>
    <WidgetSpinner :id="compoId" />
    <WidgetDialog :id="compoId" />
  </div>
</template>

<script>
import Base from "./BaseComponent.vue";
import CommonTextButton from "@/components/common/CommonTextButton.vue";
import { Grid as TuiGrid } from "@toast-ui/vue-grid";
import { TUI_GRID } from "@/config";
import { mapGetters } from "vuex";
import { setColumnByUseYn, appendRow } from "@/utils/tui-grid-handler";

export default {
  extends: Base,
  name: "WmSearchGrid",
  components: {
    TuiGrid,
    CommonTextButton,
  },
  computed: {
    ...mapGetters({
      widgetList: "WidgetManager/getWidgetList",
    }),
    widgetSizeReset() {
      const { compoId, widgetList } = this;
      const widget = widgetList.find((item) => item.id === compoId);
      return widget.sizeReset;
    },
    masterGridInstance() {
      const grid = this.$refs.masterGrid;
      return grid.gridInstance;
    },
  },
  watch: {
    widgetSizeReset: "gridAutoResizing",
  },
  data: () => ({
    masterGridProps: {
      ...TUI_GRID.update(),
      rowHeaders: ["checkbox"],
      treeColumnOptions: {
        name: "menuId",
        useCascadingCheckbox: true,
      },
      columns: [
        {
          header: "메뉴아이디",
          name: "menuId",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "상위메뉴아이디",
          name: "hrnkMenuId",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "메뉴명",
          name: "menuNm",
          editor: "text",
        },
        {
          header: "위젯메뉴명",
          name: "wdgtMenuNm",
          editor: "text",
        },
        {
          header: "메뉴단계",
          name: "menuStep",
          editor: "text",
        },
        {
          header: "메뉴구분",
          name: "menuDvsn",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "메뉴여부",
          name: "menuYn",
        },
        {
          header: "사용여부",
          name: "useYn",
        },
        { header: "등록자", name: "rgsrNm" },
        { header: "등록일시", name: "regDt" },
        { header: "수정자", name: "upsrNm" },
        { header: "수정일시", name: "updtDt" },
      ],
    },
  }),
  created() {
    setColumnByUseYn(this.masterGridProps.columns, "menuYn");
    setColumnByUseYn(this.masterGridProps.columns, "useYn");
  },
  methods: {
    gridAutoResizing() {
      this.masterGridInstance.refreshLayout();
    },
    appendRowForMaster() {
      appendRow(this.masterGridInstance, {
        menuYn: "0",
        useYn: "1",
        isNew: true,
      });
    },
  },
};
</script>

<style lang="scss">
.wm-menu-manage {
  padding: 10px;
  height: 100%;
}
</style>
