module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/variable.scss"
        `,
      },
      scss: {
        prependData: '@import "@/styles/variable.scss";',
      },
    },
  },
};
