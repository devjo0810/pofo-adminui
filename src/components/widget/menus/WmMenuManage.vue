<template>
  <div class="wm-menu-manage flex-container">
    <div class="body flex-item">
      <div class="h100p pb10 flex-column">
        <div class="flex-auto">
          <TuiGrid v-if="init" ref="masterGrid" v-bind="masterGridProps" />
        </div>
        <div class="button-area mt5">
          <CommonTextButton label="행 추가" @click="appendRowForMaster" />
          <CommonTextButton label="저장" @click="save" />
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
import {
  setColumnByUseYn,
  setColumnByCode,
  appendRow,
  getUnValidRow,
} from "@/utils/tui-grid-handler";

export default {
  extends: Base,
  name: "WmMenuManage",
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
    init: false,
    masterGridProps: {
      ...TUI_GRID.update(),
      rowHeaders: ["checkbox"],
      treeColumnOptions: {
        name: "menuId",
        useCascadingCheckbox: false,
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
          header: "정렬순서",
          name: "sortSqnc",
          align: "right",
          editor: "text",
          validation: { required: true, dataType: "number", min: 0 },
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
  async created() {
    await Promise.all([
      setColumnByUseYn(this.masterGridProps.columns, "menuYn"),
      setColumnByUseYn(this.masterGridProps.columns, "useYn"),
      setColumnByCode(this.masterGridProps.columns, "menuDvsn", "MENU_DVSN"),
    ]);

    this.init = true;
  },
  mounted() {
    this.search();
  },
  methods: {
    gridAutoResizing() {
      this.masterGridInstance.refreshLayout();
    },
    appendRowForMaster() {
      appendRow(this.masterGridInstance, {
        hrnkMenuId: "0",
        menuYn: "0",
        useYn: "1",
        isNew: true,
      });
    },
    async search() {
      const { result } = await this.$http.get("/api/appmgmt/menus", {
        compoId: this.compoId,
      });
      this.masterGridInstance.resetData(result.result);
    },
    async save() {
      this.masterGridInstance.finishEditing();
      const rowKeys = this.masterGridInstance.getCheckedRowKeys();
      if (!rowKeys.length) {
        this.$widget.alert(this.compoId, "그리드에 선택된 항목이 없습니다.");
        return;
      }

      const unValidList = this.masterGridInstance.validate();
      const isUnValidRow = getUnValidRow(rowKeys, unValidList);
      if (isUnValidRow) {
        this.$widget.alert(
          this.compoId,
          "선택된 항목중 유효하지 않은 값이 존재합니다."
        );
        return;
      }

      const items = this.masterGridInstance
        .getCheckedRows()
        .map(
          ({
            menuId,
            hrnkMenuId,
            menuNm,
            wdgtMenuNm,
            menuStep,
            sortSqnc,
            menuDvsn,
            menuYn,
            useYn,
          }) => ({
            menuId,
            hrnkMenuId,
            menuNm,
            wdgtMenuNm,
            menuStep,
            sortSqnc,
            menuDvsn,
            menuYn: menuYn === "1" ? true : false,
            useYn: useYn === "1" ? true : false,
          })
        );
      const isTrue = await this.$widget.confirm(
        this.compoId,
        `${items.length} 건 저장하시겠습니까?`
      );
      if (!isTrue) return;

      const { result } = await this.$http.post("/api/appmgmt/menus", items);
      if (result) {
        this.$toast.ok("메뉴를 저장하였습니다.");
      }
      this.search();
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
