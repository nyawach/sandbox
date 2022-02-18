import { Context } from '@nuxt/types'
import createApolloClient from '~/assets/util/createApolloClient'

export default ({ app }: Context) => createApolloClient('https://api.spacex.land/graphql', app)
