import store from "@/store";

export default {
  install(Vue) {
    const widget = {
      alert(id, message, title) {
        return new Promise((resolve) => {
          store.dispatch("WidgetManager/openAlertDialog", {
            id,
            title: title || "알림",
            message,
            callback: resolve,
          });
        });
      },
      confirm(id, message, title) {
        return new Promise((resolve) => {
          store.dispatch("WidgetManager/openConfirmDialog", {
            id,
            title: title || "알림",
            message,
            callback: resolve,
          });
        });
      },
      spinner: {
        on(id) {
          store.dispatch("WidgetManager/onSpinner", id);
        },
        off(id) {
          store.dispatch("WidgetManager/offSpinner", id);
        },
      },
    };
    Vue.widget = widget;
    Vue.prototype.$widget = widget;
  },
};
