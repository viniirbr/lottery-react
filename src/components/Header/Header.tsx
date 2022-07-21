import HeaderWrapper from "./HeaderWrapper"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from "store/hooks";
import { login } from "store/auth-slice";

const Header = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    function handleLogout() {
        localStorage.removeItem('token');
        dispatch(login(''));
        navigate('/')
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
                </ul>
            </nav>
        </HeaderWrapper>
    )
}

export default Header