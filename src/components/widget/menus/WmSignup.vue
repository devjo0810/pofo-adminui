<template>
  <div class="menu-signup">
    <form class="signup-form" @submit.prevent>
      <h3>회원가입</h3>
      <CommonInputBox
        class="item"
        label="아이디"
        type="text"
        v-model="form.id"
      />
      <CommonInputBox
        class="item"
        label="이름"
        type="text"
        v-model="form.name"
      />
      <CommonInputBox
        class="item"
        label="비밀번호"
        type="password"
        v-model="form.password"
      />
      <CommonInputBox
        class="item"
        label="비밀번호 확인"
        type="password"
        v-model="form.rePassword"
      />
      <CommonSelectBox
        class="item"
        label="사용자 타입"
        :items="typeItems"
        v-model="form.type"
      />
      <CommonSelectBox
        class="item"
        label="사용자 권한"
        :items="authItems"
        v-model="form.auth"
      />
      <div class="btn-area">
        <CommonTextButton label="회원가입" color="primary" @click="signup" />
        <CommonTextButton label="초기화" @click="reset" />
      </div>
    </form>
    <WidgetSpinner :id="compoId" />
    <WidgetDialog :id="compoId" />
  </div>
</template>

<script>
import Base from "./BaseComponent.vue";
import CommonTextButton from "@/components/common/CommonTextButton.vue";
import CommonInputBox from "@/components/common/CommonInputBox.vue";
import CommonSelectBox from "@/components/common/CommonSelectBox.vue";
import { mapGetters } from "vuex";

export default {
  extends: Base,
  name: "WmSignup",
  components: {
    CommonTextButton,
    CommonInputBox,
    CommonSelectBox,
  },
  computed: {
    ...mapGetters({
      widgetList: "WidgetManager/getWidgetList",
    }),
  },
  data: () => ({
    typeItems: [
      { value: "101", label: "관리자" },
      { value: "102", label: "일반사용자" },
    ],
    authItems: [
      { value: "101", label: "시스템관리자" },
      { value: "102", label: "일반사용자" },
    ],
    form: {
      id: "",
      password: "",
      rePassword: "",
      name: "",
      type: "",
      auth: "",
    },
  }),
  methods: {
    async signup() {
      const flag = await this.$widget.confirm(this.compoId, "확인 메세지");
      if (flag) {
        this.callbackSpinner();
      }
    },
    callbackSpinner() {
      this.$widget.spinner.on(this.compoId);
      setTimeout(() => {
        this.$widget.spinner.off(this.compoId);
        this.$toast.ok("회원가입되었습니다.");
      }, 3000);
    },
    reset() {
      const originData = this.$options.data();
      this.form = { ...originData.form };
      this.$widget.alert(this.compoId, "메세지");
    },
  },
};
</script>

<style lang="scss">
.menu-signup {
  .signup-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 7px;
    h3 {
      font-size: 1.5rem;
    }
    .item {
      margin-top: 10px;
      max-width: 300px;
      font-size: 1.3rem;
    }
    .btn-area {
      margin: 20px 0;
      font-size: 1.3rem;
      button {
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
