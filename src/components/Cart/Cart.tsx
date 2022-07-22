import Bet from "types/Bet"
import CartItem from "./CartItem/CartItem"

interface Props {
    bets: Bet[]
}

function Cart({ bets }: Props) {
  return (
    <aside>
        <div>
            <h3>CART</h3>
            <ul>
                {bets.map((bet, id) => <CartItem key={id} bet={bet}/>)}
            </ul>
        </div>
        <div>

        </div>
    </aside>
  )
}

export default Cart