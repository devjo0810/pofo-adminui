<template>
  <div>
    <button @click="get">GET</button>
    <button @click="post">POST</button>
    <button @click="put">PUT</button>
    <button @click="deleteH">DELETE</button>
  </div>
</template>

<script>
export default {
  name: "WmTree",
  methods: {
    get() {
      this.$http.get("https://httpbin.org/get");
    },
    post() {
      this.$http.post("https://httpbin.org/post");
    },
    put() {
      this.$http.put("https://httpbin.org/put");
    },
    deleteH() {
      this.$http.delete("https://httpbin.org/delete");
    },
  },
};
</script>
