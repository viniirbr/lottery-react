interface Props {
    title: string,
    themeColor?: string
}

function Button({ title, themeColor }: Props) {
  return (
    <button style={{border:`1px solid ${themeColor}`}}>{title}</button>
  )
}

export default Button