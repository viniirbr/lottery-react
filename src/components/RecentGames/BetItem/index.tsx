import { convertToMonetaryValue } from "shared/helpers";
import { Bet } from "shared/interfaces/BetsInterfaces";
import BetItemWrapper from "./styles";

interface Props {
  bet: Bet;
}

function BetItem({ bet }: Props) {
  const date = new Date(bet.created_at?.toString() as string);
  const formatedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const chosenNumbersFormated = bet.chosen_numbers
    .split(",")
    .map((number) => {
      if (parseInt(number) < 10) {
        return `0${number}`;
      }

      return number;
    })
    .join(", ");

  return (
    <BetItemWrapper color={bet.game.color as string}>
      <h3>{chosenNumbersFormated}</h3>
      <p>{`${formatedDate} - (${convertToMonetaryValue(bet.game.price)})`}</p>
      <h2 style={{ color: bet.game.color as string }}>{bet.game.type}</h2>
    </BetItemWrapper>
  );
}
export default BetItem;
