'use client'

import { BrazilQuery, BrazilQueryVariables } from "@/gql/graphql"
import { gql, useSuspenseQuery } from "@apollo/client"
import { JSX} from "react"

const FILMS_QUERY = gql`
  query Brazil {
    country(code: "BR") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`

export const Films = (): JSX.Element => {
  const { data } = useSuspenseQuery<BrazilQuery, BrazilQueryVariables>(FILMS_QUERY)
  return (
    <h2>{data.country?.name ?? 'No name'}</h2>
  )
}
