import store from "@/store";
import { TOAST } from "@/config";

export default {
  install(Vue) {
    const toast = {
      add(type, message) {
        store.dispatch("Toast/createToast", { type, message });
      },
      ok(message) {
        store.dispatch("Toast/createToast", {
          type: TOAST.TYPE.OK,
          message,
        });
      },
      info(message) {
        store.dispatch("Toast/createToast", {
          type: TOAST.TYPE.INFO,
          message,
        });
      },
      warning(message) {
        store.dispatch("Toast/createToast", {
          type: TOAST.TYPE.WARNING,
          message,
        });
      },
      danger(message) {
        store.dispatch("Toast/createToast", {
          type: TOAST.TYPE.DANGER,
          message,
        });
      },
    };
    Vue.toast = toast;
    Vue.prototype.$toast = toast;
  },
};
