import Ball from "../Ball";
import BallSetWrapper from "./styles";

interface Props {
    ballsCount: number,
    themeColor?: string,
    ballsSelected: string[],
    onBallClicked: (ball: string) => void
}

function BallsSet({ ballsCount, themeColor, onBallClicked, ballsSelected }: Props) {

    const balls: JSX.Element[] = [];

    for (let i = 1; i <= ballsCount; i++) {
        balls.push(
            <Ball
                ballsSelected={ballsSelected}
                key={i}
                color={themeColor}
                onBallClicked={onBallClicked}>
                {i.toString()}
            </Ball>)
    }

    return (
        <BallSetWrapper>{balls}</BallSetWrapper>
    )
}

export default BallsSet