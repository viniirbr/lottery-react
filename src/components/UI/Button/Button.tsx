import { ButtonHTMLAttributes, HTMLAttributes, useState } from "react"
import { CSSProperties } from "styled-components"
import ButtonWrapper from "./ButtonWrapper"

interface Props {
  title: string,
  themeColor?: string,
  styles?: CSSProperties,
  selected?: string,
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>
}

function Button({ title, themeColor, styles, selected, attributes }: Props) {

  return (
    <ButtonWrapper
      themeColor={themeColor}
      styles={styles}
      active={selected === title}
      {...attributes}
    >
      {title}
    </ButtonWrapper>
  )
}

export default Button