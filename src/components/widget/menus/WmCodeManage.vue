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
              />
            </td>
            <th>코드그룹명</th>
            <td>
              <SearchTextBox
                v-model="searchData.cmmCdGrpNm"
                placeholder="코드그룹명을 입력하세요..."
              />
            </td>
            <td class="taR" colspan="2">
              <div class="btn-area">
                <CommonTextButton
                  label="조회"
                  color="primary"
                  @click="getSearchData"
                />
                <CommonTextButton label="초기화" @click="initSearchData" />
              </div>
            </td>
          </tr>
        </template>
      </SearchArea>
    </div>
    <div class="body flex-item">
      <div class="h50p pb10">
        <TuiGrid ref="masterGrid" v-bind="masterGridProps" />
      </div>
      <div class="h50p">
        <TuiGrid ref="detailGrid" v-bind="detailGridProps" />
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
    searchData: {
      cmmCdGrpId: "",
      cmmCdGrpNm: "",
    },
    masterGridProps: {
      ...TUI_GRID.update(),
      bodyHeight: "fitToParent",
      columns: [
        {
          header: "cmmCdGrpId",
          name: "코드그룹아이디",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        {
          header: "cmmCdGrpNm",
          name: "코드그룹명",
          editor: "text",
          validation: { required: true, dataType: "string" },
        },
        { header: "menuId", name: "menuId" },
        { header: "sortSqnc", name: "sortSqnc" },
        { header: "title", name: "title" },
      ],
      data: [
        {
          name: "Beautiful Lies",
          artist: "Birdy",
          menuId: "1",
          sortSqnc: 1,
          title: "사용자관리",
        },
        {
          name: "X",
          artist: "Ed Sheeran",
          menuId: "2",
          sortSqnc: 2,
          title: "사용자추가",
        },
      ],
    },
    detailGridProps: {
      ...TUI_GRID.default(),
      bodyHeight: "fitToParent",
      columns: [
        { header: "Name", name: "name" },
        { header: "Artist", name: "artist" },
        { header: "menuId", name: "menuId" },
        { header: "sortSqnc", name: "sortSqnc" },
        { header: "title", name: "title" },
      ],
      data: [
        {
          name: "Beautiful Lies",
          artist: "Birdy",
          menuId: "1",
          sortSqnc: 1,
          title: "사용자관리",
        },
        {
          name: "X",
          artist: "Ed Sheeran",
          menuId: "2",
          sortSqnc: 2,
          title: "사용자추가",
        },
      ],
    },
  }),
  methods: {
    gridAutoResizing() {
      this.masterGridInstance.refreshLayout();
      this.detailGridInstance.refreshLayout();
    },
    getSearchData() {
      console.log("getSearchData", this.searchData);
    },
    initSearchData() {
      const originData = this.$options.data();
      this.searchData = { ...originData.searchData };
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
