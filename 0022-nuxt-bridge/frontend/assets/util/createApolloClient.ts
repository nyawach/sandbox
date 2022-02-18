import { NuxtAppOptions } from '@nuxt/types'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'

export default (uri: string, app: NuxtAppOptions) => ({
  defaultHttpLink: false,
  link: createHttpLink({
    uri,
    credentials: 'same-origin',
    fetch: async (uri: string, options) => {
      return fetch(uri, options)
    },
  }),
})
