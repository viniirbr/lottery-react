import styled from "styled-components";

const CartWrapper = styled.aside`

    display: flex;
    flex-direction: column;
    border: 1px solid #E2E2E2;
    max-height: 80vh;
    min-height: 100px;
    
    ul {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-height: 240px;
        overflow-y: auto;
    }

    ul p {
        padding: 10px;
    }

    main {
        padding-left: 10px;
    }

    main h3 {
        padding: 30px 10px;
        font-weight: 700;
        font-size: 1.5rem;
    }

    main > p {
        color: #A10101;
        padding: 0 0 5px 10px;
    }

    footer {
        background: #F4F4F4;
        padding: 20px;
        border-top: 1px solid #E2E2E2;
    }

    footer button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #27C383;
        font-size: 2rem;
        cursor: pointer;
        gap: 5px;
        width: 100%;
        background: none;
        border: none;
    }

    footer button:disabled {
        color: #707070;
        cursor: initial;
    }
`

export default CartWrapper;