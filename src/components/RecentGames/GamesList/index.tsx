import Bet from "types/Bet"
import BetItem from "../BetItem"
import BetsListWrapper from "./styles"

interface Props {
  bets?: Bet[],
  filterBets: string
}

function BetsList({ bets, filterBets }: Props) {
  return (
    <BetsListWrapper>
      {bets?.filter(bet => {
        if (filterBets !== '') {
          return filterBets === bet.type.type
        }
        return true;
      }).map((bet, id) => <BetItem key={id} bet={bet} />)}
    </BetsListWrapper>
  )
}

export default BetsList