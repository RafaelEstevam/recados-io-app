const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/tokens.scss";`,
      },
      scss: {
        additionalData: `@import "~@/styles/tokens.scss";`,
      },
    }
  }
})
