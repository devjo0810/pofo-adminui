import { TUI_USE_YN_ITEMS } from "@/config";
import Vue from "vue";

export const appendRow = (instance, row = {}, options) => {
  instance.appendRow(row, options);
};

// 그리드 컬럼 사용여부 세팅
export const setColumnByUseYn = (columns, name) => {
  const column = columns.find((item) => item.name === name);
  column.formatter = "listItemText";
  column.editor = {
    type: "select",
    options: {
      listItems: TUI_USE_YN_ITEMS,
    },
  };
};

export const setColumnByCode = async (columns, name, codeGroupNm) => {
  const column = columns.find((item) => item.name === name);
  const { result } = await Vue.http.get("/api/appmgmt/codes/detail", {
    cmmCdGrpId: codeGroupNm,
  });
  const listItems = result.result.map((item) => ({
    text: item.cmmCdNm,
    value: item.cmmCd,
  }));
  column.formatter = "listItemText";
  column.editor = {
    type: "select",
    options: {
      listItems,
    },
  };
};

export const getUnValidRow = (rowKeys, unValidList) => {
  return unValidList.find((row) => rowKeys.includes(row.rowKey));
};
