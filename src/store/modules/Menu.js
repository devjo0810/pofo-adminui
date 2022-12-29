import Vue from "vue";

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
    let { result } = await Vue.http.get("/api/appmgmt/admin/menus");
    if (!result) {
      result = sampleMenuList;
    }
    commit("setWidgetMenuList", result);
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
];
