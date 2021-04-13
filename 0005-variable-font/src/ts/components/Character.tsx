import * as React from 'react'
import './Character.scss'
export type Props = {
  char: string
}

const Character: React.VFC<Props> = (props) => {
  return (
    <span>{ props.char }</span>
  )
}

export default Character
