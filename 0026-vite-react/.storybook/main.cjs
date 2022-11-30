const path = require("path");
const { loadConfigFromFile, mergeConfig } = require('vite')

module.exports = {
  stories: [
    '../src/components/**/*.stories.@(ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite'
  },
  async viteFinal(config) {
    const { config: viteConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    );

   return mergeConfig(config, {
     ...viteConfig,
     // manually specify plugins to avoid conflict
     plugins: [],
   });
 },
}
