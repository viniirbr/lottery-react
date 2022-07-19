interface Props {
    ballsCount: number
}

function BallsSet({ ballsCount }: Props) {

    const balls:JSX.Element[] = [];

    for (let i=1; i<=ballsCount; i++) {
        balls.push(<p key={i}>{i}</p>)
    }

    return (
        <div>{balls}</div>
    )
}

export default BallsSet