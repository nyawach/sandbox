<template>
  <div>
    <h1>{{ text }}</h1>
    <h2>
      <i18n path="Hello {world}!">
        <template v-slot:world>
          <b>{{ $t('World') }}</b>
        </template>
      </i18n>
    </h2>
    <select v-model="lang">
      <option value="ja">ja</option>
      <option value="en">en</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'Tutorial',
  setup(_, context) {
    const lang = ref(context.root.$i18n.locale)
    watch(lang, newLang => {
      context.root.$i18n.setLocale(newLang)
    })
    return { lang }
  }
})
</script>
