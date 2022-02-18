<template lang="pug">
main
  Tutorial
</template>

<script lang="ts">
import Vue from 'vue'
import Tutorial from '~/components/Tutorial.vue'
import getTest from '~/assets/apollo/getTest.gql'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Tutorial,
  },
  apollo: {
    test: {
      query: getTest,
      result(res: object) {
        console.log(res)
      }
    }
  },
})
</script>

<style lang="stylus">
main
  background-color blue
</style>
