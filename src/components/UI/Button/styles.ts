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
display: flex;
align-items: center;
justify-content: center;
font-size: 0.9rem;
gap: 10px;
${props => ({ ...props.styles })}

&:hover {
    transform: scale(1.05);
    transition: 0.5s all;
}


@media screen and (min-width: 840px) {
    padding: 10px 20px;
}
`

export default ButtonWrapper;