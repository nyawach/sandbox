<template lang="pug">
  main
    Tutorial
</template>

<script lang="ts">
import Vue from 'vue'
import Tutorial from '~/components/Tutorial.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Tutorial,
  },
})
</script>

<style lang="stylus">
main
  background-color blue
</style>
