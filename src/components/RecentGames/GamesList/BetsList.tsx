import Bet from "types/Bet"
import BetItem from "./BetItem/BetItem"

interface Props {
    bets?: Bet[]
}

function BetsList({ bets }: Props) {
  return (
    <ul>{bets?.map((bet,id) => <BetItem key={id} bet={bet}/>)}</ul>
  )
}

export default BetsList