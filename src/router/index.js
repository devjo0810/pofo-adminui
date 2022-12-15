import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    // 루트 이동시 로그인페이지로 리다이렉트
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/manage",
    name: "main",
    meta: { layout: "Main" },
    component: () => import("@/views/MainView"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
