import Vue from "vue";
/* font-awesome-icon */
import "./font-awesome-icon";
/* vue-draggable-resizable */
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
/* vue2-datepicker */
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ko";
/* vue-select */
import "vue-select/dist/vue-select.css";
/* widget-handler */
import widgetHandler from "./widget-handler";
/* toast-handler */
import toastHandler from "./toast-handler";
/* TOAST UI Grid */
import "./tui-grid";

Vue.use(widgetHandler);
Vue.use(toastHandler);
