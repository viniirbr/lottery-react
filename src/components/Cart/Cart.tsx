import Bet from "types/Bet"
import CartItem from "./CartItem/CartItem"
import CartWrapper from "./CartWrapper"

interface Props {
  bets: Bet[]
}

function Cart({ bets }: Props) {

  let total = undefined;

  if (bets.length !== 0) {
    total = bets.map(bet => bet.price).reduce((acumulator, current) => acumulator + current);
  }


  return (
    <CartWrapper>
      <div>
        <h3>CART</h3>
        <ul>
          {bets.length === 0 && <p>Não há apostas no carrinho</p>}
          {bets.length !== 0 && bets.map((bet, id) => <CartItem key={id} bet={bet} />)}
        </ul>
        {bets.length !== 0 && 
        <h3>CART TOTAL: {total?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>}
      </div>
      <div>

      </div>
    </CartWrapper>
  )
}

export default Cart