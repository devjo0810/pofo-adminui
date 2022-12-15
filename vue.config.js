const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "./docs",
  publicPath: "/vue-widget-boilerplate",
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
});
