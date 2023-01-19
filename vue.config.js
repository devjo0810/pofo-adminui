const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "./dist",
  publicPath: "/",
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/utility/_variables.scss";
          @import "@/assets/scss/utility/_mixin.scss";
        `,
      },
    },
  },
  devServer: {
    host: "admin.freepofo-local",
  },
});
