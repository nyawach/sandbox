const path = require('path')
const webpackConfig = require('./webpack.config')
const { merge } = require('webpack-merge')

module.exports = {
  features: {
    postcss: false,
  },
  stories: [
    '../stories/**/*.stories.ts',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
  ],
  framework: '@storybook/vue',
  webpackFinal: config => merge(config, webpackConfig),
}
