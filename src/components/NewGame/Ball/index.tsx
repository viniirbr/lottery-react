import BallWrapper from "./styles"

interface Props {
    children: string,
    color?: string,
    ballsSelected: string[],
    onBallClicked: (ball: string) => void
}

function Ball({ children, color, ballsSelected, onBallClicked }: Props) {

    const isActive = ballsSelected.includes(children);

    return (
        <BallWrapper
            color={color}
            active={isActive}
            onClick={() => onBallClicked(children)}
            className={isActive ? 'active' : ''}
            data-cy='ball'>
            {parseInt(children) < 10 ? `0${children}` : children}
        </BallWrapper>
    )
}

export default Ball