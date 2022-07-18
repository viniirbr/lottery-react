import { FC, ReactNode } from "react"
import { CSSProperties } from "styled-components"
import CardWrapper from "./CardWrapper"

interface Props {
    children: ReactNode,
    hasShadow: boolean,
    styles: CSSProperties
}

const Card: FC<Props> = ({ children, hasShadow, styles }) => {
    return (
        <CardWrapper hasShadow={hasShadow} styles={styles}>
            {children}
        </CardWrapper>
    )
}

export default Card