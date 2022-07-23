import HeaderWrapper from "./HeaderWrapper"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "store/hooks";
import { login } from "store/auth-slice";
import { ShoppingCart } from 'phosphor-react'
import { FC } from "react";
import { clearCart } from "store/cart-slice";

interface Props {
    showCartModal: (show: boolean) => void
}

const Header: FC<Props> = ({ showCartModal }) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const bets = useAppSelector(state => state.cart.bets)

    function handleLogout() {
        localStorage.removeItem('token');
        dispatch(login(undefined));
        dispatch(clearCart())
        navigate('/');
    }

    return (
        <HeaderWrapper>
            <nav>
                <ul>
                    <li><h1><Link to='/'>TGL</Link></h1></li>
                    {pathname === '/' || <li><h2><Link to='/'>Home</Link></h2></li>}
                </ul>
                <ul>
                    <li><h2><Link to='/'>Account</Link></h2></li>
                    <li onClick={handleLogout}><h2>Log out</h2></li>
                    {window.innerWidth < 900 && <li onClick={() => showCartModal(true)}>
                        <ShoppingCart size={32} />
                        <span>{bets.length}</span></li>}
                </ul>
            </nav>
        </HeaderWrapper>
    )
}

export default Header