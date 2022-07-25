import styled from "styled-components";

interface Props {
    className: string,
}

const FormWrapper = styled.form<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;

    & h2 {
        font-size: 1.5rem;
    }

    & button {
        font-family: 'Helvetica Neue', sans-serif;
        font-style: italic;
        padding: 20px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #B5C401;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        margin-top: 20px;
    }
    
    & a {
        display: flex;
        align-items: center;
        gap: 5px;
    }
`

export default FormWrapper;