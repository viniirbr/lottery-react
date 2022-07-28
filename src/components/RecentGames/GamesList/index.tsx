import { Bet } from "shared/interfaces/BetsInterfaces"
import BetItem from "../BetItem"
import BetsListWrapper from "./styles"

interface Props {
  bets?: Bet[],
}

function BetsList({ bets }: Props) {
  return (
    <BetsListWrapper>
      {bets?.map((bet, id) => <BetItem key={id} bet={bet} />)}
    </BetsListWrapper>
  )
}

export default BetsList