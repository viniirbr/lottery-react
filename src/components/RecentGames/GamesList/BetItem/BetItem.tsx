import Bet from "types/Bet"

interface Props {
    bet: Bet
}

function BetItem({ bet }: Props) {
  return (
    <li>
      <h3>{bet.choosen_numbers}</h3>
      <p>{`${bet.created_at} - ${bet.price}`}</p>
      <h2 style={{color:bet.type.color}}>{bet.type.type}</h2>
    </li>
  )
}
export default BetItem