const state = {
  widgetManagerConfig: false,
};

const getters = {
  getWidgetManagerConfig(state) {
    return state.widgetManagerConfig;
  },
};

const mutations = {
  setWidgetManagerConfig(state, isOpen) {
    state.widgetManagerConfig = isOpen;
  },
};

const actions = {
  openWidgetManagerConfig({ commit }) {
    commit("setWidgetManagerConfig", true);
  },
  closeWidgetManagerConfig({ commit }) {
    commit("setWidgetManagerConfig", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
