import { Bet } from "shared/interfaces/BetsInterfaces"
import BetItem from "../BetItem"
import BetsListWrapper from "./styles"
import { BeatLoader } from 'react-spinners'

interface Props {
  bets?: Bet[],
  isLoading?: boolean
}

function BetsList({ bets, isLoading }: Props) {
  return (
    <BetsListWrapper data-cy='bets-list'>
      {!isLoading ?
        bets?.map((bet, id) => <BetItem key={id} bet={bet} />)
        :
        <BeatLoader color='#B5C401' size={20} />}
    </BetsListWrapper>
  )
}

export default BetsList