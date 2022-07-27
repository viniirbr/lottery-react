import Bet from "shared/interfaces/Bet"
import BetItemWrapper from "./styles"

interface Props {
  bet: Bet
}

function BetItem({ bet }: Props) {

  const date = new Date(bet.created_at);
  const formatedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const choosenNumbersFormated = bet.choosen_numbers.split(',').map(number => {
    if (parseInt(number) < 10) {
      return `0${number}`;
    }

    return number;
  }).join(', ');

  return (
    <BetItemWrapper color={bet.type.color as string}>
      <h3>{choosenNumbersFormated}</h3>
      <p>{`${formatedDate} - (${bet.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })})`}</p>
      <h2 style={{ color: bet.type.color }}>{bet.type.type}</h2>
    </BetItemWrapper>
  )
}
export default BetItem