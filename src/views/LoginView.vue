<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent>
      <h2>PoFo Manage</h2>
      <h3>Login</h3>
      <CommonInputBox
        class="item"
        label="email"
        type="text"
        v-model="form.email"
      />
      <CommonInputBox
        class="item"
        label="비밀번호"
        type="password"
        v-model="form.password"
      />
      <CommonTextButton label="로그인" color="primary" @click="login" />
    </form>
  </div>
</template>

<script>
import CommonTextButton from "@/components/common/CommonTextButton.vue";
import CommonInputBox from "@/components/common/CommonInputBox.vue";

export default {
  name: "HomeView",
  components: {
    CommonTextButton,
    CommonInputBox,
  },
  data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    login() {
      // console.log("login");
      this.$router.push("/manage");
    },
  },
};
</script>

<style lang="scss">
.login-view {
  @include flex-center;
  width: 100%;
  height: 100%;
  background: rgb(34, 40, 49);
  background: linear-gradient(
    90deg,
    rgba(34, 40, 49, 1) 0%,
    rgba(57, 62, 70, 1) 35%,
    rgba(72, 77, 85, 1) 100%
  );
  .login-form {
    padding: 25px;
    background: map-get($colors, "white");
    box-shadow: 0px 0px 2px 0px rgba(255, 255, 255);
    h2 {
      text-align: center;
      margin: 5px 0;
      font-size: 1.6rem;
    }
    h3 {
      text-align: center;
      margin: 5px 0 10px;
      font-size: 1.5rem;
    }
    .common-input-box {
      margin-top: 10px;
      span {
        font-size: 1.3rem;
      }
    }
    .common-text-button {
      width: 100%;
      display: block;
      margin-top: 10px;
    }
  }
}
</style>
