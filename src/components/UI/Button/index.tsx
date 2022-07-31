import { ButtonHTMLAttributes, ReactNode } from "react"
import { CSSProperties } from "styled-components"
import ButtonWrapper from "./styles"

interface Props {
  children: ReactNode,
  themeColor?: string,
  styles?: CSSProperties,
  selected?: boolean | string,
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>
}

function Button({ children, themeColor, styles, selected, attributes }: Props) {

  return (
    <ButtonWrapper
      themeColor={themeColor}
      styles={styles}
      active={selected === children || selected == true}
      {...attributes}
    >
      {children}
    </ButtonWrapper>
  )
}

export default Button