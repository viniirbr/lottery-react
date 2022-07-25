import styled, { CSSProperties } from "styled-components";

interface Props {
    styles?: CSSProperties
}

const InputWrapper = styled.div<Props>`
    display: flex;
    flex-direction: column;
    ${props => ({...props.styles})}

    & label {
        display: none;
    }

    & input {
        font-family: 'Helvetica Neue', sans-serif;
        outline: none;
        border: none;
        border-bottom: 2px #EBEBEB solid;
        padding: 20px 16px;
        font-weight: normal;
        font-size: 1rem;
        color: #707070;
    }

    & input::placeholder {
        color: #9D9D9D;
    }
`

export default InputWrapper;