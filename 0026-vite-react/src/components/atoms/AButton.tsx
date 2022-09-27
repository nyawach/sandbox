type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text: string
}

const AButton: React.FC<Props> = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

export default AButton
