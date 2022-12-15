import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowMinimize,
  faXmark,
  faMaximize,
  faMinimize,
  faGear,
  faTrash,
  faCaretLeft,
  faCaretRight,
  faCloudArrowUp,
  faCircleCheck,
  faCircleInfo,
  faTriangleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faWindowMinimize,
  faXmark,
  faMaximize,
  faMinimize,
  faGear,
  faTrash,
  faCaretLeft,
  faCaretRight,
  faCloudArrowUp,
  faCircleCheck,
  faCircleInfo,
  faTriangleExclamation,
  faCircleXmark
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
