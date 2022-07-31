import HeaderWrapper from "./styles"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logout } from "store/auth-slice";
import { ShoppingCart, ArrowRight, SignOut } from 'phosphor-react'
import { FC, useEffect } from "react";
import { clearCart, recoverCartValues } from "store/cart-slice";
import { Bet } from "shared/interfaces/BetsInterfaces";

interface Props {
    showCartModal: (show: boolean) => void
}

const Header: FC<Props> = ({ showCartModal }) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const bets = useAppSelector(state => state.cart.bets);

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            dispatch(recoverCartValues(JSON.parse(localStorage.getItem('cart') as string) as Bet[]));
        }

    }, [])


    function handleLogout() {
        localStorage.removeItem('token');
        dispatch(logout());
        dispatch(clearCart());
        localStorage.removeItem('cart');
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
                    <li><h2><Link to='/account'>Account</Link></h2></li>
                    {window.innerWidth < 700 && <li onClick={() => showCartModal(true)}>
                        <ShoppingCart size={32} />
                        <span>{bets.length}</span></li>}
                    <li onClick={handleLogout}>{window.innerWidth < 700 ? <SignOut size={32}/>
                        : <h2 id="logout">Log out<ArrowRight size={20} /></h2>}</li>
                </ul>
            </nav>
        </HeaderWrapper>
    )
}

export default Header