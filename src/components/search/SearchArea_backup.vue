<template>
  <div class="search-area">
    <table class="search-area-table">
      <!-- <caption>
        검색영역
      </caption> -->
      <colgroup>
        <col
          v-for="index in colCount"
          :key="index"
          :class="{ cellw: index % 2 !== 0 }"
        />
      </colgroup>
      <tbody>
        <tr
          v-for="(row, i) in rows"
          :key="i"
          :class="row.class"
          class="search-area-tr"
        >
          <template v-for="(col, i) in row">
            <th v-if="!!col.label" :key="'th' + i">{{ col.label }}</th>
            <td
              :key="'td' + i"
              :class="col.class"
              :rowspan="col.rowspan"
              :colspan="col.colspan"
            >
              <component
                v-for="(compo, compoIdx) in col.components"
                :key="compoIdx"
                :is="componentName[compo.type]"
                :value="compo.value"
                :placeholder="compo.placeholder"
                :class="compo.class"
                :label="compo.label"
                :color="compo.color"
                v-on="compo.click && { click: compo.click }"
                @input="(e) => handleInput(compo.searchKey, e)"
                @change="(e) => handleInput(compo.searchKey, e)"
              />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SearchDateBox from "./SearchDateBox_backup.vue";
import SearchTextBox from "./SearchTextBox.vue";
import CommonTextButton from "../common/CommonTextButton.vue";
import { SEARCH } from "@/config";

export default {
  name: "SearchArea",
  components: {
    SearchDateBox,
    SearchTextBox,
    CommonTextButton,
  },
  props: {
    colCount: Number,
    rows: Array,
    /** rows sample
     * [ rows level
     *    [ row level
     *        class: row class
     *        { col level
     *            label: 컬럼 label
     *            class: 컬럼 class
     *            rowspan: rowSpan 값
     *            colspan: colSpan 값
     *            components:
     *            [ components level
     *                { component level
     *                  type: 검색 component 타입
     *                  searchKey: 검색 파라미터 key값
     *                  value: 바인딩 value
     *                }
     *            ]
     *        }
     *    ],
     * ]
     */
  },
  data: () => ({
    componentName: SEARCH.COMPO_NAME,
    searchData: {},
  }),
  methods: {
    handleInput(searchKey, e) {
      console.log("handleInput", searchKey, e);
      this.searchData[searchKey] = e;
    },
  },
};
</script>

<style lang="scss">
.search-area {
  width: 100%;
  border-top: 1px solid map-get($colors, "black-lighten1");
  margin-bottom: 20px;
  .search-area-table {
    width: 100%;
    background-color: map-get($colors, "white-lighten1");
    .cellw {
      min-width: 5%;
    }
    .search-area-tr {
      > th {
        background-color: map-get($colors, "white");
        text-align: right;
        padding: 9px;
        font-size: 1.1rem;
        border-left: 1px solid map-get($colors, "white-darken1");
        border-right: 1px solid map-get($colors, "white-darken1");
        border-bottom: 1px solid map-get($colors, "white-darken1");
      }
      > td {
        padding: 0 5px;
        border-bottom: 1px solid map-get($colors, "white-darken1");
        &:last-child {
          border-right: 1px solid map-get($colors, "white-darken1");
        }

        button {
          @include list-margin-right(5px);
        }
      }
    }
  }
}
</style>
