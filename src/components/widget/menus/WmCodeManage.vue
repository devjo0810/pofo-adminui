<template>
  <div class="wm-code-manage flex-container">
    <div class="header">
      <SearchArea>
        <template #colgroup>
          <col class="w120" />
          <col />
          <col class="w120" />
          <col />
          <col class="cellw" />
          <col />
        </template>
        <template #tbody>
          <tr>
            <th>코드그룹아이디</th>
            <td>
              <SearchTextBox
                v-model="searchData.cmmCdGrpId"
                placeholder="코드그룹아이디을 입력하세요..."
                @enterKey="searchForMaster"
              />
            </td>
            <th>코드그룹명</th>
            <td>
              <SearchTextBox
                v-model="searchData.cmmCdGrpNm"
                placeholder="코드그룹명을 입력하세요..."
                @enterKey="searchForMaster"
              />
            </td>
            <td class="taR" colspan="2">
              <div class="btn-area">
                <CommonTextButton
                  label="조회"
                  color="primary"
                  @click="searchForMaster"
                />
                <CommonTextButton label="초기화" @click="initSearchData" />
              </div>
            </td>
          </tr>
        </template>
      </SearchArea>
    </div>
    <div class="body flex-item">
      <div class="h50p pb10 flex-column">
        <div class="flex-auto">
          <TuiGrid
            ref="masterGrid"
            v-bind="masterGridProps"
            @dblclick="handleDbclickForMaster"
            @editingStart="handleEditingStartForMaster"
          />
        </div>
        <div class="button-area mt5">
          <CommonTextButton label="행 추가" @click="appendRowForMaster" />
          <CommonTextButton label="저장" @click="saveForMaster" />
        </div>
      </div>
      <div class="h50p flex-column">
        <div class="flex-auto">
          <TuiGrid
            ref="detailGrid"
            v-bind="detailGridProps"
            @editingStart="handleEditingStartForDetail"
          />
        </div>
        <div class="button-area mt5">
          <CommonTextButton label="행 추가" @click="appendRowForDetail" />
          <CommonTextButton label="저장" @click="saveForDetail" />
        </div>
      </div>
    </div>
    <WidgetSpinner :id="compoId" />
    <WidgetDialog :id="compoId" />
  </div>
</template>

<script>
import Base from "./BaseComponent.vue";
import SearchArea from "@/components/search/SearchArea.vue";
import SearchTextBox from "@/components/search/SearchTextBox.vue";
import CommonTextButton from "@/components/common/CommonTextButton.vue";
import { Grid as TuiGrid } from "@toast-ui/vue-grid";
import { TUI_GRID } from "@/config";
import { mapGetters } from "vuex";
import {
  appendRow,
  setColumnByUseYn,
  getUnValidRow,
} from "@/utils/tui-grid-handler";

export default {
  extends: Base,
  name: "WmSearchGrid",
  components: {
    TuiGrid,
    SearchArea,
    SearchTextBox,
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
    detailGridInstance() {
      const grid = this.$refs.detailGrid;
      return grid.gridInstance;
    },
  },
  watch: {
    widgetSizeReset: "gridAutoResizing",
  },
  data: () => ({
    selectCmmCdGrpId: "",
    searchData: {
      cmmCdGrpId: "",
      cmmCdGrpNm: "",
    },
    masterGridProps: {
      ...TUI_GRID.update(),
      columns: [
        {
          header: "코드그룹아이디",
          name: "cmmCdGrpId",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "코드그룹명",
          name: "cmmCdGrpNm",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "코드그룹설명",
          name: "cmmCdGrpDsc",
          editor: "text",
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
    detailGridProps: {
      ...TUI_GRID.update(),
      columns: [
        {
          header: "코드그룹아이디",
          name: "cmmCdGrpId",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "코드",
          name: "cmmCd",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "코드명",
          name: "cmmCdNm",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "코드설명",
          name: "cmmCdDsc",
          editor: "text",
        },
        {
          header: "정렬순서",
          name: "sortSqnc",
          editor: "text",
          validation: { required: true, dataType: "number", min: 0 },
        },
        {
          header: "참조아이디1",
          name: "rferId1",
          editor: "text",
        },
        {
          header: "참조아이디2",
          name: "rferId2",
          editor: "text",
        },
        {
          header: "참조아이디3",
          name: "rferId3",
          editor: "text",
        },
        {
          header: "참조아이디4",
          name: "rferId4",
          editor: "text",
        },
        { header: "사용여부", name: "useYn" },
        { header: "등록자", name: "rgsrNm" },
        { header: "등록일시", name: "regDt" },
        { header: "수정자", name: "upsrNm" },
        { header: "수정일시", name: "updtDt" },
      ],
    },
  }),
  created() {
    setColumnByUseYn(this.masterGridProps.columns, "useYn");
    setColumnByUseYn(this.detailGridProps.columns, "useYn");
  },
  mounted() {
    window.grid = this.masterGridInstance;
  },
  methods: {
    gridAutoResizing() {
      this.masterGridInstance.refreshLayout();
      this.detailGridInstance.refreshLayout();
    },
    initSearchData() {
      const originData = this.$options.data();
      this.searchData = { ...originData.searchData };
    },
    async searchForMaster() {
      const { result } = await this.$http.get(
        "/api/appmgmt/codes",
        this.searchData,
        {
          compoId: this.compoId,
        }
      );
      this.masterGridInstance.resetData(result.result);
    },
    appendRowForMaster() {
      appendRow(this.masterGridInstance, { useYn: "1", isNew: true });
    },
    async saveForMaster() {
      const rowKeys = this.masterGridInstance.getCheckedRowKeys();
      if (!rowKeys.length) {
        this.$widget.alert(
          this.compoId,
          "마스터 그리드에 선택된 항목이 없습니다."
        );
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
        .map(({ cmmCdGrpId, cmmCdGrpNm, cmmCdGrpDsc, useYn }) => ({
          cmmCdGrpId,
          cmmCdGrpNm,
          cmmCdGrpDsc,
          useYn: useYn === "1" ? true : false,
        }));
      const isTrue = await this.$widget.confirm(
        this.compoId,
        `${items.length} 건 저장하시겠습니까?`
      );
      if (!isTrue) return;

      const { result } = await this.$http.post("/api/appmgmt/codes", items);
      if (result) {
        this.$toast.ok("마스터 코드를 저장하였습니다.");
      }
    },
    async searchForDetail(cmmCdGrpId) {
      this.selectCmmCdGrpId = cmmCdGrpId;
      const { result } = await this.$http.get(
        "/api/appmgmt/codes/detail",
        { cmmCdGrpId },
        {
          compoId: this.compoId,
        }
      );
      this.detailGridInstance.resetData(result.result);
    },
    appendRowForDetail() {
      appendRow(this.detailGridInstance, {
        cmmCdGrpId: this.selectCmmCdGrpId,
        sortSqnc: 0,
        useYn: "1",
        isNew: true,
      });
    },
    async saveForDetail() {
      const rowKeys = this.detailGridInstance.getCheckedRowKeys();
      if (!rowKeys.length) {
        this.$widget.alert(
          this.compoId,
          "상세 그리드에 선택된 항목이 없습니다."
        );
        return;
      }

      const unValidList = this.detailGridInstance.validate();
      const isUnValidRow = getUnValidRow(rowKeys, unValidList);
      if (isUnValidRow) {
        this.$widget.alert(
          this.compoId,
          "선택된 항목중 유효하지 않은 값이 존재합니다."
        );
        return;
      }

      const items = this.detailGridInstance
        .getCheckedRows()
        .map(
          ({
            sersNum,
            cmmCdGrpId,
            cmmCd,
            cmmCdNm,
            cmmCdDsc,
            sortSqnc,
            useYn,
            refrId1,
            refrId2,
            refrId3,
            refrId4,
          }) => ({
            sersNum,
            cmmCdGrpId,
            cmmCd,
            cmmCdNm,
            cmmCdDsc,
            sortSqnc,
            useYn: useYn === "1" ? true : false,
            refrId1,
            refrId2,
            refrId3,
            refrId4,
          })
        );
      const isTrue = await this.$widget.confirm(
        this.compoId,
        `${items.length} 건 저장하시겠습니까?`
      );
      if (!isTrue) return;

      const { result } = await this.$http.post(
        "/api/appmgmt/codes/detail",
        items
      );
      if (result) {
        this.$toast.ok("상세 코드를 저장하였습니다.");
      }
    },
    handleDbclickForMaster({ rowKey }) {
      const row = this.masterGridInstance.getRow(rowKey);
      if (row && row.cmmCdGrpId) {
        this.searchForDetail(row.cmmCdGrpId);
      }
    },
    handleEditingStartForMaster({ columnName, rowKey }) {
      const row = this.masterGridInstance.getRow(rowKey);
      if (columnName === "cmmCdGrpId" && row && !row.isNew) {
        this.$nextTick(() => this.masterGridInstance.cancelEditing());
      }
    },
    handleEditingStartForDetail({ columnName, rowKey }) {
      const row = this.detailGridInstance.getRow(rowKey);
      if (columnName === "cmmCdGrpId" && row && !row.isNew) {
        this.$nextTick(() => this.detailGridInstance.cancelEditing());
      }
    },
  },
};
</script>

<style lang="scss">
.wm-code-manage {
  padding: 10px;
  height: 100%;
}
</style>
