import Bet from "types/Bet";
import { Trash, Check, X } from 'phosphor-react'
import CartItemWrapper from "./styles";
import { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { removeBet } from "store/cart-slice";

interface Props {
    bet: Bet
}

function CartItem({ bet }: Props) {

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function deleteBet() {
        dispatch(removeBet(bet));
        setConfirmDelete(false);
    }

    return (
        <CartItemWrapper color={bet.type.color as string}>

            {confirmDelete ?
                <span>
                    <X size={20} onClick={() => setConfirmDelete(false)} />
                    <Check size={20} onClick={deleteBet}/>
                </span> :
                <Trash size={32} onClick={() => setConfirmDelete(true)} />}

            <div>
                <h4>{bet.choosen_numbers}</h4>
                <div>
                    <h4>{bet.type.type}</h4>
                    <p>{bet.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </div>
        </CartItemWrapper>
    )
}

export default CartItem