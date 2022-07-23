import styled from "styled-components";

const CartWrapper = styled.aside`

    display: flex;
    flex-direction: column;
    
    ul {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 50vh;
        overflow-y: auto;
    }

    div h3 {
        padding: 30px 10px;
        font-weight: 700;
        font-size: 1.5rem;
    }
`

export default CartWrapper;