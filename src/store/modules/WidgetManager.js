/**
 * Widget Define
 * id : 고유키
 * menuNm : 메뉴명
 * wdgtMenuNm : 매핑할 컴포넌트명
 * compoData : 매핑할 컴포넌트 props
 * x : x좌표
 * y : y좌표
 * w : width
 * h : height
 * bfX : 이전 x좌표
 * bfY : 이전 y좌표
 * bfW : 이전 width
 * bfH : 이전 height
 * zindex : 위젯 order index
 * isOnlyOne : 위젯 전체중 한개만 유지여부
 * isFullSize : 전체스크린 여부
 * isMinimize : 최소화 여부
 * isWindowPopup : 윈도우 팝업 여부
 * isAutoSize : 자동크기 여부
 * sizeReset : 위젯사이즈변경 카운트
 * spinner : spinner on/off
 * dialog : dialog open/close
 *        : { show, type, title, message, callback: Promise }
 */
import Vue from "vue";
import { DIALOG_TYPE } from "@/config";
import { createKey } from "@/utils/util";

const state = {
  widgetList: loadSessionWidgetList() || [],
  widgetPosition: {
    x: 10,
    y: 10,
  },
  isParent: true,
};

const getters = {
  getWidgetList(state) {
    return state.widgetList;
  },
  getWidgetById: (state) => (id) => {
    return state.widgetList.find((item) => item.id === id);
  },
  getMaxZindexId(state) {
    const maxZindex = getMaxZindex(state);
    const widget = state.widgetList.find((item) => item.zindex === maxZindex);
    return widget ? widget.id : null;
  },
  getIsParent(state) {
    return state.isParent;
  },
  getWidgetPosition(state) {
    return state.widgetPosition;
  },
};

const mutations = {
  initWidgetList(state) {
    state.widgetList = [];
  },
  initWidgetPosition(state) {
    state.widgetPosition = {
      x: 10,
      y: 10,
    };
  },
  setNextWidgetPosition(state) {
    const { x, y } = state.widgetPosition;
    state.widgetPosition.x = x + 10;
    state.widgetPosition.y = y + 10;
  },
  addWidget(state, widget) {
    state.widgetList.push({
      w: 300,
      h: 300,
      isOnlyOne: false,
      isFullSize: false,
      isMinimize: false,
      isWindowPopup: false,
      isAutoSize: true,
      spinner: false,
      ...widget,
      dialog: {
        show: false,
        type: null,
        title: null,
        message: null,
        callback: null,
      },
      sizeReset: 0,
      id: createKey(),
      zindex: getNextZindex(state),
      x: state.widgetPosition.x,
      y: state.widgetPosition.y,
    });
  },
  setWidget(state, { id, ...props }) {
    const widget = state.widgetList.find((item) => item.id === id);
    Object.keys(props).forEach((key) => {
      widget[key] = props[key];
    });
  },
  delWidget(state, { id }) {
    const widgetIndex = state.widgetList.findIndex((item) => item.id === id);
    state.widgetList.splice(widgetIndex, 1);
  },
  saveBfPositionAndSize(state, { id }) {
    const widget = state.widgetList.find((item) => item.id === id);
    const { x, y, w, h } = widget;
    widget.bfX = x;
    widget.bfY = y;
    widget.bfW = w;
    widget.bfH = h;
  },
  setIsParent(state, isParent) {
    state.isParent = isParent;
  },
  setSpinner(state, { id, spinner }) {
    const widget = state.widgetList.find((item) => item.id === id);
    widget.spinner = spinner;
  },
  setDialog(state, { id, ...dialogOptions }) {
    const widget = state.widgetList.find((item) => item.id === id);
    widget.dialog = { ...dialogOptions };
  },
};

const actions = {
  // 위젯 생성
  createWidget(
    { state, commit, dispatch },
    { menuNm, wdgtMenuNm, compoData, isOnlyOne }
  ) {
    if (!wdgtMenuNm) {
      Vue.toast.danger(`${menuNm} 메뉴에 등록된 위젯 컴포넌트가 없습니다.`);
      return;
    }
    if (isOnlyOne) {
      const widget = state.widgetList.find(
        (item) => item.wdgtMenuNm === wdgtMenuNm
      );
      if (widget) {
        // dispatch("closeWidget", widget.id);
        dispatch("sortWidgetZindex", widget.id);
        Vue.toast.warning(`${menuNm} 이미 활성화된 위젯입니다.`);
        return;
      }
    }
    commit("addWidget", { menuNm, wdgtMenuNm, compoData, isOnlyOne });
    commit("setNextWidgetPosition");
    // onlyOne 옵션이 있는 컴포넌트일 경우 기존 위젯 종료후 생성 >> 기능 변경
    // 이미 존재하는 위젯에 포커싱 처리 후 토스트 메세징 처리
    // checkOnlyOneWidget(isOnlyOne, compoName, state, dispatch);
  },
  // 위젯 zindex값 정렬
  sortWidgetZindex({ state, commit }, id) {
    const maxZindex = getMaxZindex(state);
    const maxZindexId = state.widgetList.find(
      (item) => item.zindex === maxZindex
    ).id;
    if (id === maxZindexId) return;

    const currentZindex = state.widgetList.find(
      (item) => item.id === id
    ).zindex;
    commit("setWidget", { id, zindex: maxZindex });
    const decreWidgetList = state.widgetList.filter(
      (item) => item.id !== id && item.zindex > currentZindex
    );
    for (const widget of decreWidgetList) {
      commit("setWidget", { id: widget.id, zindex: widget.zindex - 1 });
    }
  },
  // 위젯 zindex값 정렬 역순
  sortWidgetZindexReverse({ state, commit }, id) {
    const minZindex = getMinZindex(state);
    const minZindexId = state.widgetList.find(
      (item) => item.zindex === minZindex
    ).id;
    if (id === minZindexId) return;

    const currentZindex = state.widgetList.find(
      (item) => item.id === id
    ).zindex;
    commit("setWidget", { id, zindex: minZindex });
    const increWidgetList = state.widgetList.filter(
      (item) => item.id !== id && item.zindex < currentZindex
    );
    for (const widget of increWidgetList) {
      commit("setWidget", { id: widget.id, zindex: widget.zindex + 1 });
    }
  },
  // 위젯 종료
  closeWidget({ commit }, id) {
    const currentZindex = state.widgetList.find(
      (item) => item.id === id
    ).zindex;
    commit("delWidget", { id });
    const decreWidgetList = state.widgetList.filter(
      (item) => item.zindex > currentZindex
    );
    for (const widget of decreWidgetList) {
      commit("setWidget", { id: widget.id, zindex: widget.zindex - 1 });
    }
  },
  // 위젯 전체화면
  fullSizingWidget({ commit, dispatch }, { id, w, h }) {
    dispatch("sortWidgetZindex", id);
    commit("saveBfPositionAndSize", { id });
    commit("setWidget", {
      id,
      w,
      h,
      isFullSize: true,
      isMinimize: false,
      x: 0,
      y: 0,
    });
    dispatch("incrementSizeReset", id);
  },
  // 위젯 창화면
  async smallSizingWidget({ state, commit, dispatch }, id) {
    dispatch("sortWidgetZindex", id);
    const { bfX, bfY, bfW, bfH } = loadBfPositionAndSize(state, id);
    // [UPDATE] 2022-09-16 위치 안돌아가는 버그 수정
    await commit("setWidget", {
      id,
      isFullSize: false,
      w: bfW,
      h: bfH,
    });
    await commit("setWidget", { id, x: bfX, y: bfY });
    dispatch("incrementSizeReset", id);
  },
  // 위젯 위치 업데이트
  updateWidgetPosition({ commit, dispatch }, { id, x, y }) {
    dispatch("sortWidgetZindex", id);
    commit("setWidget", { id, x, y });
  },
  // 위젯 사이즈 업데이트
  updateWidgetSize({ commit, dispatch }, { id, w, h }) {
    dispatch("sortWidgetZindex", id);
    commit("setWidget", { id, w, h });
  },
  // 위젯 사이즈 및 위치 업데이트
  updateWidgetSizeAndPosition({ commit, dispatch }, { id, x, y, w, h }) {
    dispatch("sortWidgetZindex", id);
    commit("setWidget", { id, x, y, w, h });
  },
  // 위젯 사이드 정렬
  async updateWidgetSidePosition({ commit, dispatch }, { id, x, y, w, h }) {
    dispatch("sortWidgetZindex", id);
    // x, y 값 0으로 초기화 후 위젯 크기조절해야 부모창 존속되게 조절됨
    await commit("setWidget", {
      id,
      isFullSize: false,
      x: 0,
      y: 0,
      w,
      h,
    });
    await commit("setWidget", { id, x, y });
    dispatch("incrementSizeReset", id);
  },
  // 위젯 최소화
  minimizingWidget({ commit }, id) {
    commit("setWidget", { id, isMinimize: true });
  },
  // 위젯 최소화 취소
  cancelMinimizingWidget({ commit, dispatch }, id) {
    dispatch("sortWidgetZindex", id);
    commit("setWidget", { id, isMinimize: false });
  },
  // 위젯 최소화 토글링
  toggleMinimizingWidget({ state, dispatch }, id) {
    const maxZindex = getMaxZindex(state);
    const widget = state.widgetList.find((item) => item.id === id);
    const { isMinimize, zindex } = widget;
    // 최상단 위젯이 아닐경우 위로올림
    if (maxZindex !== zindex) {
      dispatch("sortWidgetZindex", id);
      dispatch("cancelMinimizingWidget", id);
      return;
    }
    // 위젯 토글링
    if (isMinimize) {
      dispatch("cancelMinimizingWidget", id);
    } else {
      dispatch("minimizingWidget", id);
    }
  },
  // 위젯 초기화
  initWidget({ commit }) {
    commit("initWidgetList");
    commit("initWidgetPosition");
  },
  // 위젯 부모창 존속 토글링
  toggleWidgetParent({ state, commit }) {
    commit("setIsParent", !state.isParent);
  },
  // 위젯 spinner on
  onSpinner({ commit }, id) {
    commit("setSpinner", { id, spinner: true });
  },
  // 위젯 spinner off
  offSpinner({ commit }, id) {
    commit("setSpinner", { id, spinner: false });
  },
  // 위젯 alert open
  openAlertDialog({ commit }, { id, title, message, callback }) {
    commit("setDialog", {
      id,
      show: true,
      type: DIALOG_TYPE.ALERT,
      title,
      message,
      callback,
    });
  },
  // 위젯 confirm open
  openConfirmDialog({ commit }, { id, title, message, callback }) {
    commit("setDialog", {
      id,
      show: true,
      type: DIALOG_TYPE.CONFIRM,
      title,
      message,
      callback,
    });
  },
  // 위젯 dialog close
  closeDialog({ commit }, id) {
    commit("setDialog", {
      id,
      show: false,
      type: null,
      title: null,
      message: null,
      callback: null,
    });
  },
  // 현 위젯목록 sessionStorage에 저장
  saveCurrentWidgetListToSession({ state }) {
    const widgetListString = JSON.stringify(state.widgetList);
    sessionStorage.setItem("widgetList", widgetListString);
  },
  // 위젯 sizeReset 증가
  incrementSizeReset({ state, commit }, id) {
    const widget = state.widgetList.find((item) => item.id === id);
    commit("setWidget", { id, sizeReset: widget.sizeReset + 1 });
  },
};

// 위젯 zindex 최대값 조회
function getMaxZindex(state) {
  const zindexList = state.widgetList.map((item) => item.zindex);
  return zindexList.length ? Math.max(...zindexList) : 0;
}

// 위젯 다음 zindex값 조회
function getNextZindex(state) {
  return getMaxZindex(state) + 1;
}

// 위젯 zindex 최소값 조회
function getMinZindex(state) {
  const zindexList = state.widgetList.map((item) => item.zindex);
  return zindexList.length ? Math.min(...zindexList) : 0;
}

// 위젯 이전 위치 및 사이즈 불러오기
function loadBfPositionAndSize(state, id) {
  const widget = state.widgetList.find((item) => item.id === id);
  const { bfX, bfY, bfW, bfH } = widget;
  return { bfX, bfY, bfW, bfH };
}

// 세션스토리지 widgetList 로드
function loadSessionWidgetList() {
  const widgetList = JSON.parse(sessionStorage.getItem("widgetList"));
  return widgetList;
}

// 위젯 1개 유지여부 체크
// function checkOnlyOneWidget(isOnlyOne, compoName, state, dispatch) {
//   if (isOnlyOne) {
//     const widget = state.widgetList.find(
//       (item) => item.compoName === compoName
//     );
//     if (widget) {
//       // dispatch("closeWidget", widget.id);
//       dispatch("sortWidgetZindex", widget.id);
//     }
//   }
// }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
