import styled, { CSSProperties } from "styled-components";

interface Props {
    styles?: CSSProperties,
    isEditing: boolean,
    hasEditing: boolean | undefined
}

const InputWrapper = styled.div<Props>`
    display: flex;
    flex-direction: column;
    ${props => ({...props.styles})}

    & label {
        display: none;
    }

    & div {
        display: flex;
        align-items: center;
    }

    &  div input {
        box-sizing: border-box;
        width: 100%;
        font-family: 'Helvetica Neue', sans-serif;
        outline: none;
        border: none;
        border-bottom: 2px #EBEBEB solid;
        padding: 20px 16px;
        font-weight: normal;
        font-size: 1rem;
        color: #707070;
        border: ${props => props.isEditing && props.hasEditing && '1px solid #B5C401'};
        cursor: ${props => !props.isEditing && 'inherit'};
    }

    & div input::placeholder {
        color: #9D9D9D;
    }

    svg {
        cursor: pointer;
    }
`

export default InputWrapper;