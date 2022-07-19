import HeaderWrapper from "./HeaderWrapper"
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const { pathname } = useLocation();  
    return (
        <HeaderWrapper>
            <nav>
                <ul>
                    <li><h1><Link to='/'>TGL</Link></h1></li>
                    {pathname === '/' || <li><h2><Link to='/'>Home</Link></h2></li>}
                </ul>
                <ul>
                    <li><h2><Link to='/'>Account</Link></h2></li>
                    <li><h2>Log out</h2></li>
                </ul>
            </nav>
        </HeaderWrapper>
    )
}

export default Header