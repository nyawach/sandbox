const webpackConfig = require('./webpack.config')
const { merge } = require('webpack-merge')

module.exports = {
  feature: {
    postcss: false,
  },
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: "@storybook/vue",
  webpackFinal: config => merge(config, webpackConfig),
}
