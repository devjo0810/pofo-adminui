const debug = process.env.NODE_ENV !== "production";

const APP = {
  version: process.env.VUE_APP_VERSION,
  title: process.env.VUE_APP_TITLE,
};

const API_CONFIG = {
  baseUrl: process.env.VUE_APP_API_BASE_URL,
  timeout: 50000, // 50s
};

const HTTP = {
  METHOD: {
    // fetch 기준
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },
  STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    CLIENT_CUSTOM_ERROR: 499,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVER_CUSTOM_ERROR: 599,
  },
};
HTTP.ERROR_MESSAGE = {
  [HTTP.STATUS.NO_CONTENT]: "콘텐츠가 없습니다.",
  [HTTP.STATUS.BAD_REQUEST]: "잘못된 요청값이 존재합니다.",
  [HTTP.STATUS.UNAUTHORIZED]: "인증에 실패하였습니다.",
  [HTTP.STATUS.FORBIDDEN]: "서비스 권한을 갖고있지 않습니다.",
  [HTTP.STATUS.NOT_FOUND]: "요청한 서비스를 찾을 수 없습니다.",
  [HTTP.STATUS.REQUEST_TIMEOUT]: "요청시간을 초과하였습니다.",
  [HTTP.STATUS.PAYLOAD_TOO_LARGE]: "요청값이 너무 큽니다.",
  [HTTP.STATUS.URI_TOO_LONG]: "요청URI가 너무 깁니다.",
  [HTTP.STATUS.CLIENT_CUSTOM_ERROR]: "클라이언트 지정 예외 발생",
  [HTTP.STATUS.INTERNAL_SERVER_ERROR]: "서버에서 오류가 발생하였습니다.",
  [HTTP.STATUS.BAD_GATEWAY]: "게이트웨이에서 처리중 오류가 발생하였습니다.",
  [HTTP.STATUS.SERVER_CUSTOM_ERROR]: "서버 지정 예외 발생",
};

const WIDGET = {
  MIN_WIDTH: 300,
  MIN_HEIGHT: 300,
  DRAG_HANDLE: ".widget-drag-handle",
  HEADER_HEIGHT: 36, // 32 + border
  MENU_PREFIX: "Wm",
};

const DIALOG_TYPE = {
  ALERT: 1,
  CONFIRM: 2,
};

const TOAST = {
  TIMEOUT: 5000, // 5s
  TYPE: {
    OK: 1,
    INFO: 2,
    WARNING: 3,
    DANGER: 4,
  },
};
TOAST.CLASS = {
  [TOAST.TYPE.OK]: "ok",
  [TOAST.TYPE.INFO]: "info",
  [TOAST.TYPE.WARNING]: "warning",
  [TOAST.TYPE.DANGER]: "danger",
};
TOAST.ICON = {
  [TOAST.TYPE.OK]: "circle-check",
  [TOAST.TYPE.INFO]: "circle-info",
  [TOAST.TYPE.WARNING]: "triangle-exclamation",
  [TOAST.TYPE.DANGER]: "circle-xmark",
};

const TUI_GRID = {
  ROW_HEIGHT: 30,
  MIN_ROW_HEIGHT: 30,
  BODY_HEIGHT: "fitToParent",
  HEADER: { height: 30 },
  COLUMN_OPTIONS: { resizable: true, minWidth: 70 },
  default() {
    return {
      rowHeight: this.ROW_HEIGHT,
      minRowHeight: this.MIN_ROW_HEIGHT,
      bodyHeight: this.BODY_HEIGHT,
      header: this.HEADER,
      rowHeaders: ["rowNum"],
      columnOptions: this.COLUMN_OPTIONS,
      data: [],
    };
  },
  update() {
    return {
      rowHeight: this.ROW_HEIGHT,
      minRowHeight: this.MIN_ROW_HEIGHT,
      bodyHeight: this.BODY_HEIGHT,
      header: this.HEADER,
      rowHeaders: ["rowNum", "checkbox"],
      columnOptions: this.COLUMN_OPTIONS,
      data: [],
    };
  },
};

const TUI_TO_DAYJS = {
  "yyyy-MM-dd": "YYYY-MM-DD",
};

const TUI_USE_YN_ITEMS = [
  { text: "사용", value: "1" },
  { text: "미사용", value: "0" },
];

const SEARCH = {
  TYPE: {
    DATE: "date",
    TEXT: "text",
    SELECT: "select",
    BUTTON: "button",
  },
};
SEARCH.COMPO_NAME = {
  [SEARCH.TYPE.DATE]: "SearchDateBox",
  [SEARCH.TYPE.TEXT]: "SearchTextBox",
  [SEARCH.TYPE.SELECT]: "SearchSelectBox",
  [SEARCH.TYPE.BUTTON]: "CommonTextButton",
};

export {
  debug,
  APP,
  API_CONFIG,
  HTTP,
  WIDGET,
  DIALOG_TYPE,
  TOAST,
  TUI_GRID,
  TUI_TO_DAYJS,
  TUI_USE_YN_ITEMS,
  SEARCH,
};
