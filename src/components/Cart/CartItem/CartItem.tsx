import Bet from "types/Bet";
import { Trash } from 'phosphor-react'

interface Props {
    bet: Bet
}

function CartItem({ bet }: Props) {
    return (
        <li>
            <div>
                <Trash />
            </div>

            <div>
                <h4>{bet.choosen_numbers}</h4>
                <div>
                    <h4>{bet.type.type}</h4>
                    <p>{bet.price}</p>
                </div>
            </div>
        </li>
    )
}

export default CartItem