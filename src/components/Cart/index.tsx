import Bet from "types/Bet"
import CartItem from "./CartItem"
import CartWrapper from "./styles"
import { ArrowRight } from 'phosphor-react'
import { useAppDispatch, useAppSelector } from "store/hooks"
import { axiosBase } from "api/AxiosConfig"
import { clearCart } from "store/cart-slice"
import { useState } from "react"
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'

interface Props {
  bets: Bet[],
  minCartValue: number
}

function Cart({ bets, minCartValue }: Props) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let totalFormated: string | undefined = undefined;
  let isMoreThanMinCartValue = false;
  const minCartValueFormated = minCartValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const token = useAppSelector(state => state.auth.user?.token.token);
  const dispatch = useAppDispatch();

  if (bets.length !== 0) {
    const total = bets.map(bet => bet.price).reduce((acumulator, current) => acumulator + current);
    isMoreThanMinCartValue = total >= minCartValue;
    totalFormated = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

  async function handleSaveGame() {
    try {
      setIsLoading(true);
      const betsForSave = bets.map(bet => ({
        "game_id": bet.game_id,
        "numbers": bet.choosen_numbers.split(',')
      }));
      const response = await axiosBase.post('/bet/new-bet', { games: betsForSave }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      dispatch(clearCart());
      toast.success(`Apostas salvas com sucesso!
      Valor total: ${totalFormated}`);

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
        {bets.length !== 0 &&
          <h3>CART TOTAL: {totalFormated}</h3>}
        {bets.length !== 0 && !isMoreThanMinCartValue &&
          <p>{`The minimal cart value is ${minCartValueFormated}`}</p>}
      </main>
      {bets.length !== 0 &&
        <footer>
          <button disabled={!isMoreThanMinCartValue} onClick={handleSaveGame}>
            Save
            {isLoading ? <BeatLoader color='#27C383' size={15}/> :
              <ArrowRight size={32} color={isMoreThanMinCartValue ? '#27C383' : '#707070'} />}
          </button>
        </footer>
      }
    </CartWrapper>
  )
}

export default Cart