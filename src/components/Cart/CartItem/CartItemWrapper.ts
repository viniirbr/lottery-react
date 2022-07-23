import styled from 'styled-components'

interface Props {
    color: string
}

const CartItemWrapper = styled.li<Props>`
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 65px;

    svg {
        padding-right: 10px;
        cursor: pointer;
    }

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 70%;
        gap: 10px;
        padding-left: 10px;
        border-left: 4px solid ${props => props.color};
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
        height: 100%;
    }

    & > div > div {
        display: flex;
        align-items: center;
        gap: 10px
    }

    & div div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    & div div h4{
        color: ${props => props.color};
    }

    span {
        display: flex;
        align-items: center;
    }

`

export default CartItemWrapper;