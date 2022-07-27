import Cart from "components/Cart";
import { Backdrop, Modal } from "components"
import ReactDOM from 'react-dom'
import { useAppSelector } from "store/hooks"

interface Props {
    hideCartModal: (show: boolean) => void,
    minCartValue: number
}

function CartModal({ hideCartModal, minCartValue }: Props) {

    const bets = useAppSelector(state => state.cart.bets);

    return (
        <>
            {ReactDOM.createPortal(<Backdrop hideCartModal={hideCartModal} />,
                document.getElementById('backdrop') as Element)}
            {ReactDOM.createPortal(
                <Modal>
                    <Cart bets={bets} minCartValue={minCartValue}/>
                </Modal>, document.getElementById('modal') as Element)}
        </>
    )
}

export default CartModal