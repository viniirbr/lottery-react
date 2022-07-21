import { ReactNode } from "react"
import BallWrapper from "./BallWrapper"

interface Props {
    children: string,
    color?: string,
    ballsSelected: string[],
    onBallClicked: (ball: string) => void
}

function Ball({ children, color, ballsSelected, onBallClicked }: Props) {
    return (
        <BallWrapper
            color={color}
            active={ballsSelected.includes(children)}
            onClick={() => onBallClicked(children)}>
            {parseInt(children) < 10 ? `0${children}` : children}
        </BallWrapper>
    )
}

export default Ball