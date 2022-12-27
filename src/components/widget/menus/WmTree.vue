<template>
  <div class="wm-tree">
    <button @click="get">GET</button>
    <button @click="post">POST</button>
    <button @click="put">PUT</button>
    <button @click="deleteH">DELETE</button>
    <button @click="appmgmtGet">appmgmt get</button>
    <WidgetSpinner :id="compoId" />
    <WidgetDialog :id="compoId" />
  </div>
</template>

<script>
import Base from "./BaseComponent.vue";

export default {
  extends: Base,
  name: "WmTree",
  methods: {
    async get() {
      await this.$http.get(
        "https://reqres.in/api/users",
        {
          delay: "3",
        },
        {
          compoId: this.compoId,
        }
      );
    },
    post() {
      this.$http.post("https://httpbin.org/post", { test: "A", call: "B" });
    },
    put() {
      this.$http.put("https://httpbin.org/put");
    },
    deleteH() {
      this.$http.delete("https://httpbin.org/delete");
    },
    async appmgmtGet() {
      await this.$http.get("/api/appmgmt/codes/1", null, {
        compoId: this.compoId,
      });
    },
  },
};
</script>

<style lang="scss">
.wm-tree {
  button {
    display: block;
    border: 1px;
  }
}
</style>
