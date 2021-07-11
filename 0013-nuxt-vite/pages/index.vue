<template lang="pug">
  main
    h1 タイトル
    Tutorial
</template>

<script lang="ts">
import Vue from 'vue'
import Tutorial from '../components/Tutorial.vue'

export default Vue.extend({
  components: {
    Tutorial,
  }
})
</script>

<style lang="scss">
h1 {
  background-color: red;
}
</style>
