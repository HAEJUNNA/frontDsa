const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../dsa/src/main/resources/static',
  devServer: {
    proxy: 'http://localhost:8085',
  },
});
