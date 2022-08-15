import { defineNuxtConfig } from '@nuxt/bridge'
import TRANSLATION_EN from './assets/translation/en.json'
import TRANSLATION_JA from './assets/translation/ja.json'

export default defineNuxtConfig({
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  bridge: {
    nitro: false,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'demo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
      },
      {
        code: 'ja',
        iso: 'ja_JP',
      },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: TRANSLATION_EN,
        ja: TRANSLATION_JA,
      },
    },
    vueI18nLoader: true,
    strategy: 'no_prefix',
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-client.ts',
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-typed-vuex',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/apollo',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  alias: {
    tslib: 'tslib/tslib.es6.js'
  }
})
