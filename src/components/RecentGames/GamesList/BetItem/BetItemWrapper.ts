import styled from "styled-components";

interface Props {
    color: string
}

const BetItemWrapper = styled.li<Props>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
    border-left: 6px solid ${props => props.color};
`

export default BetItemWrapper;