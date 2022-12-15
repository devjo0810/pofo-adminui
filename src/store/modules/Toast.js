import { TOAST } from "@/config";
import { createKey } from "@/utils/util";

/**
 * Toast Define
 * id : Toast 고유키
 * message : toast message
 * type : [primary, info, warning, danger]
 */
const state = {
  toastList: [],
  timeout: TOAST.TIMEOUT,
};

const getters = {
  getToastList(state) {
    return state.toastList;
  },
};

const mutations = {
  addToast(state, toast) {
    state.toastList.push({
      ...toast,
      id: createKey(),
    });
  },
  delToast(state) {
    state.toastList.shift();
  },
};

const actions = {
  // 토스트메세지 생성
  createToast({ state, commit }, { message, type }) {
    commit("addToast", { message, type });
    delToastTimeout(commit, state.timeout); // 삭제예약
  },
};

function delToastTimeout(commit, timeout) {
  setTimeout(() => {
    commit("delToast");
  }, timeout);
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
