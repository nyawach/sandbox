const webpackConfig = require('./webpack.config')
const { merge } = require('webpack-merge')

module.exports = {
  features: {
    postcss: false,
  },
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
  ],
  webpackFinal: config => merge(config, webpackConfig),
}
