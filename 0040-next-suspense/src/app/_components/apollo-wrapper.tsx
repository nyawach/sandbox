'use client'

import { ApolloProvider } from "@apollo/client"
import { createApolloClient } from "../_lib/apollo-client"

export const ApolloWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const client = createApolloClient()
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
