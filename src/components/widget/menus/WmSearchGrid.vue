<template>
  <div class="wm-search-grid flex-container">
    <div class="header">
      <!-- <SearchArea v-bind="searchAreaProps" ref="searchArea" /> -->
      <SearchArea>
        <template #colgroup>
          <col class="cellw" />
          <col />
          <col class="cellw" />
          <col />
          <col class="cellw" />
          <col />
          <col class="cellw" />
          <col />
        </template>
        <template #tbody>
          <tr>
            <th>이름</th>
            <td>
              <SearchTextBox
                v-model="searchData.name"
                placeholder="이름을 입력하세요..."
              />
            </td>
            <th>아티스트</th>
            <td>
              <SearchTextBox
                v-model="searchData.artist"
                placeholder="아티스트를 입력하세요..."
              />
            </td>
            <th>등록일자</th>
            <td>
              <DatePicker
                v-model="searchData.regDt"
                value-type="format"
                format="YYYY-MM-DD"
              />
            </td>
            <th>수정일자</th>
            <td>
              <DatePicker
                range
                v-model="searchData.updtDt"
                value-type="format"
                format="YYYY-MM-DD"
              />
            </td>
          </tr>
          <tr>
            <th>국적</th>
            <td>
              <VueSelect
                v-model="searchData.country"
                :options="['Canada', 'Korea']"
              />
            </td>
            <th>취미</th>
            <td>
              <VueSelect
                multiple
                v-model="searchData.hobby"
                :reduce="(option) => option.code"
                :options="[
                  { label: '축구', code: '1' },
                  { label: '농구', code: '2' },
                  { label: '야구', code: '3' },
                  { label: '배드민턴', code: '4' },
                  { label: '코딩', code: '5' },
                ]"
              />
            </td>
            <td colspan="2">
              <SearchCheckBox v-model="searchData.isA" label="비활성화" />
              <SearchCheckBox v-model="searchData.isB" label="게스트제외" />
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
      <TuiGrid ref="grid" v-bind="gridProps" />
    </div>
    <WidgetSpinner :id="compoId" />
    <WidgetDialog :id="compoId" />
  </div>
</template>

<script>
import Base from "./BaseComponent.vue";
import SearchArea from "@/components/search/SearchArea.vue";
import SearchTextBox from "@/components/search/SearchTextBox.vue";
import SearchCheckBox from "@/components/search/SearchCheckBox.vue";
import DatePicker from "vue2-datepicker";
import VueSelect from "vue-select";
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
    SearchCheckBox,
    CommonTextButton,
    DatePicker,
    VueSelect,
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
    gridInstance() {
      const grid = this.$refs.grid;
      return grid.gridInstance;
    },
  },
  watch: {
    widgetSizeReset: "gridAutoResizing",
  },
  data: () => ({
    searchData: {
      name: "",
      artist: "",
      regDt: "2022-10-01",
      updtDt: ["2022-10-01", "2022-10-25"],
      country: null,
      hobby: [],
      isA: false,
      isB: true,
    },
    gridProps: {
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
      this.gridInstance.refreshLayout();
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
.wm-search-grid {
  padding: 10px;
  height: 100%;
  // .header {
  // height: 26px;
  // }
  // .body {
  // height: calc(100% - 26px);
  // }
}
</style>
