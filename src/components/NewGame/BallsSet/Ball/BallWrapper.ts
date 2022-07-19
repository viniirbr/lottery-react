import styled from "styled-components";

interface Props {
    color?: string,
    active: boolean
}

const BallWrapper = styled.p<Props>`
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
background: ${props => props.active ? props.color : '#ADC0C4'};
width: 100%;
height: 100%;
color: #FFFFFF;
cursor: pointer;
`

export default BallWrapper;