import Vue from 'vue'
import { addDecorator, configure } from '@storybook/vue'
import VueCompositionApi from '@vue/composition-api'
import VueI18n from 'vue-i18n'

Vue.use(VueCompositionApi)
Vue.use(VueI18n)

configure(() => {
  addDecorator(() => ({
    template: '<story />',
    i18n: new VueI18n({
      locale: 'ja',
    }),
    beforeCreate: function () {
      this.$root._i18n = this.$i18n
    },
  }))
}, module)
