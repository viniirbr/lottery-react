import styled, { CSSProperties } from 'styled-components'

interface Props{
    hasShadow: boolean,
    styles: CSSProperties
}

const CardWrapper = styled.div<Props>`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 14px;
    box-shadow: ${({ hasShadow }) => hasShadow && '0 3px 25px #00000014'};
    ${props => ({...props.styles})}
    padding: 10px 0;

`

export default CardWrapper;