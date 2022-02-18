<template lang="pug">
div
  h1 {{ text }}
  h2
    i18n(path="Hello {world}!")
      template(#world)
        b {{ $t('World') }}
  select(v-model="lang")
    option(value="ja") ja
    option(value="en") en
  input(
    type="text"
    @input="handleInput"
    :value="text"
  )
  button(@click="handleClickInc") +
  span {{ currentCountText }}
  button(@click="handleClickDec") -
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'Tutorial',

  setup(_, context) {

    const text = ref('')

    const lang = ref(context.root.$i18n.locale)
    watch(lang, newLang => {
      context.root.$i18n.setLocale(newLang)
    })

    const handleInput = (evt: InputEvent) => {
      text.value = (evt.target as HTMLInputElement).value || ''
    }

    const { increment, decrement } = context.root.$accessor
    const currentCountText = computed(() => `${context.root.$accessor.count}回`)
    const handleClickDec = () => decrement()
    const handleClickInc = () => increment()
    return {
      lang,
      text,
      currentCountText,
      handleInput,
      handleClickDec,
      handleClickInc,
    }
  },
})
</script>
