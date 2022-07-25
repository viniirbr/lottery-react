import styled, { CSSProperties } from "styled-components";

interface Props {
    themeColor?: string,
    styles?: CSSProperties,
    active: boolean
}

const ButtonWrapper = styled.button<Props>`
font-family: 'Helvetica Neue', sans-serif;
border-radius: 100px;
background: ${props => props.active ? props.themeColor : 'white'};
cursor: pointer;
border: 2px solid ${props => props.themeColor};
color: ${props => props.active ? 'white' : props.themeColor};
min-width: 100px;
padding: 10px 5px;
${props => ({ ...props.styles })}

@media screen and (min-width: 840px) {
    padding: 10px 20px;
}
`

export default ButtonWrapper;