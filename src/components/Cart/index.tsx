import { Bet } from "shared/interfaces/BetsInterfaces"
import CartItem from "./CartItem"
import CartWrapper from "./styles"
import { ArrowRight } from 'phosphor-react'
import { useAppDispatch, useAppSelector } from "store/hooks"
import { clearCart } from "store/cart-slice"
import { useState } from "react"
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import betsService from 'shared/services/bets/index'
import { convertToMonetaryValue } from 'shared/helpers'
import { useNavigate } from "react-router-dom"

interface Props {
  bets: Bet[],
  minCartValue: number
}

function Cart({ bets, minCartValue }: Props) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let totalFormated: string | undefined = convertToMonetaryValue(0);
  let isMoreThanMinCartValue = false;
  const minCartValueFormated = convertToMonetaryValue(minCartValue);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const { newBet } = betsService();
  const navigate = useNavigate();

  if (bets.length !== 0) {
    const total = bets.map(bet => bet.price).reduce((acumulator, current) => acumulator + current);
    isMoreThanMinCartValue = total >= minCartValue;
    totalFormated = convertToMonetaryValue(total);
  }

  async function handleSaveGame() {
    try {
      setIsLoading(true);
      const betsForSave = bets.map(bet => ({
        "game_id": bet.game_id,
        "numbers": bet.choosen_numbers.split(',').map(number => parseInt(number))
      }));
      const response = await newBet({ games: betsForSave }, token?.token as string);
      dispatch(clearCart());
      toast.success(`Apostas salvas com sucesso!
      Valor total: ${totalFormated}`);
      navigate('/');

    } catch (e) {
      toast.error("Ocorreu um erro ao salvar as apostas.")
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <CartWrapper>
      <main>
        <h3>CART</h3>
        <ul>
          {bets.length === 0 && <p>Não há apostas no carrinho</p>}
          {bets.length !== 0 && bets.map((bet, id) => <CartItem key={id} bet={bet} />)}
        </ul>
          <h3>CART TOTAL: {totalFormated}</h3>
        {bets.length !== 0 && !isMoreThanMinCartValue &&
          <p>{`The minimal cart value is ${minCartValueFormated}`}</p>}
      </main>
      {bets.length !== 0 &&
        <footer>
          <button disabled={!isMoreThanMinCartValue} onClick={handleSaveGame}>
            Save
            {isLoading ? <BeatLoader color='#27C383' size={15} /> :
              <ArrowRight size={32} color={isMoreThanMinCartValue ? '#27C383' : '#707070'} />}
          </button>
        </footer>
      }
    </CartWrapper>
  )
}

export default Cart