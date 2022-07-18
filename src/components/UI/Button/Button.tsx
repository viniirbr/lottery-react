import { useState } from "react"
import { CSSProperties } from "styled-components"
import ButtonWrapper from "./ButtonWrapper"

interface Props {
  title: string,
  themeColor?: string,
  styles?: CSSProperties,
  filter?: string,
  onClick: (type: string) => void
}

function Button({ title, themeColor, styles, onClick, filter }: Props) {

  return (
    <ButtonWrapper
      themeColor={themeColor}
      styles={styles}
      active={filter === title}
      onClick={() => onClick(title)}>
      {title}
    </ButtonWrapper>
  )
}

export default Button