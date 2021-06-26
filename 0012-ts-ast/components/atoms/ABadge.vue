<template lang="pug">
.a-badge(
    :class="`a-badge--${styleType}`"
    :style="{ width }"
  )
    p.text(v-if="text") {{ text }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

type Props = {
  styleType:
    | 'default'
  width: string
  text: string
}

export default defineComponent({
  name: 'ABadge',
  components: {},
  props: {
    styleType: {
      default: 'default',
      type: String as () => Props['styleType'],
    },
    width: {
      default: '',
      type: String,
    },
    text: {
      default: '',
      type: String,
    },
  },
})
</script>

<style lang="stylus" scoped>
.a-badge
  display inline-block
  border-radius 10px
  text-align center
  padding 4px 6px
  line-height 1
  box-sizing border-box
  font-weight bold
  &--default
    background-color dimgray
    color white

.text
  margin 0
  font-size $rem
</style>
