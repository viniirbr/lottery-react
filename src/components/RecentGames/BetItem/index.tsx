import { useEffect, useState } from "react";
import { convertToMonetaryValue } from "shared/helpers";
import { Bet } from "shared/interfaces/BetsInterfaces"
import { Game } from "shared/interfaces/GamesInterfaces";
import { gamesService } from 'shared/services'
import BetItemWrapper from "./styles"

interface Props {
  bet: Bet
}

function BetItem({ bet }: Props) {

  const [gamesAvailable, setGamesAvailable] = useState<Game[]>([]);
  const { listGames } = gamesService();
  const date = new Date(bet.created_at?.toString() as string);
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
      <p>{`${formatedDate} - (${convertToMonetaryValue(bet.price)})`}</p>
      <h2 style={{ color: bet.type.color as string }}>{bet.type.type}</h2>
    </BetItemWrapper>
  )
}
export default BetItem