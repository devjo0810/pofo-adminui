import Vue from "vue";
import { MENU_DVSN } from "@/config";

const state = {
  widgetMenuList: [],
};

const getters = {
  getWidgetMenuList(state) {
    return state.widgetMenuList;
  },
};

const mutations = {
  setWidgetMenuList(state, widgetMenuList) {
    state.widgetMenuList = [...widgetMenuList];
  },
};

const actions = {
  // 관리자메뉴 불러오기
  async loadAdminMenus({ commit }) {
    const { result } = await Vue.http.get(
      `/api/appmgmt/menus/${MENU_DVSN.ADMIN}`
    );
    if (!result) {
      commit("setWidgetMenuList", sampleMenuList);
    } else {
      commit("setWidgetMenuList", result.data);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

const sampleMenuList = [
  {
    parentMenuId: "0",
    menuId: "1",
    sortSqnc: 1,
    title: "사용자 관리",
    compoName: null,
    isWidget: false,
    menuList: [
      {
        parentMenuId: "1",
        menuId: "101",
        title: "사용자 조회",
        compoName: "SearchUser",
        isWidget: true,
      },
      {
        parentMenuId: "1",
        menuId: "102",
        title: "사용자 추가",
        compoName: "AddUser",
        isWidget: true,
      },
      {
        parentMenuId: "1",
        menuId: "103",
        title: "사용자 제한",
        compoName: "LimitUser",
        menuList: [
          {
            parentMenuId: "103",
            menuId: "10301",
            title: "사용자 정지",
            compoName: "StopUser",
            isWidget: false,
            menuList: [
              {
                parentMenuId: "1",
                menuId: "101",
                title: "사용자 조회",
                compoName: "SearchUser",
                isWidget: true,
              },
              {
                parentMenuId: "1",
                menuId: "101",
                title: "사용자 조회",
                compoName: "SearchUser",
                isWidget: true,
              },
              {
                parentMenuId: "1",
                menuId: "101",
                title: "사용자 조회",
                compoName: "SearchUser",
                isWidget: true,
              },
            ],
          },
          {
            parentMenuId: "103",
            menuId: "10302",
            title: "사용자 메일전송",
            compoName: "SendMailUser",
            isWidget: true,
          },
        ],
      },
    ],
  },
  {
    title: "Signup",
    compoName: "Signup",
    isWidget: true,
  },
  {
    parentMenuId: "0",
    menuId: "2",
    sortSqnc: 2,
    title: "그리드 샘플",
    compoName: null,
    isWidget: false,
    menuList: [
      {
        parentMenuId: "2",
        menuId: "201",
        title: "그리드 조회",
        compoName: "SearchGrid",
        isWidget: true,
      },
      {
        parentMenuId: "2",
        menuId: "202",
        title: "그리드 수정",
        compoName: "UpdateGrid",
        isWidget: true,
      },
    ],
  },
  {
    title: "Tree",
    compoName: "Tree",
    isWidget: true,
  },
  {
    title: "Card",
    compoName: "Card",
    isWidget: true,
  },
  {
    title: "TextEllipsisTitleTest_ABCDE",
    compoName: "TextEllipsisTitleTest",
    isWidget: true,
    isOnlyOne: true,
  },
  {
    title: "기준자료 관리",
    parentMenuId: "0",
    menuId: "5",
    sortSqnc: 1,
    compoName: null,
    isWidget: false,
    menuList: [
      {
        parentMenuId: "5",
        menuId: "501",
        title: "메뉴 관리",
        compoName: "MenuManage",
        isWidget: true,
      },
      {
        parentMenuId: "5",
        menuId: "502",
        title: "코드 관리",
        compoName: "CodeManage",
        isWidget: true,
      },
    ],
  },
];
