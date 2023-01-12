import { TUI_USE_YN_ITEMS } from "@/config";

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
