import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    meta: { layout: "Main" },
    component: () => import("@/views/MainView"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
