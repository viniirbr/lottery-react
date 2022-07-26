import { FC, InputHTMLAttributes } from "react"
import { CSSProperties } from "styled-components"
import InputWrapper from "./styles"

interface Props {
    label: string,
    inputAttributes: InputHTMLAttributes<HTMLInputElement>
    styles?: CSSProperties,
}

const Input: FC<Props> = ({label, inputAttributes, styles }) => {
    return (
        <InputWrapper styles={styles}>
            <label htmlFor={inputAttributes.id}>{label}</label>
            <input {...inputAttributes}/>
        </InputWrapper>
    )
}

export default Input