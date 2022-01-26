<template>
  <h1>{{ text }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Tutorial',
  setup() {
    const text = ref('Hello!')
    return {
      text,
    }
  }
})
</script>
