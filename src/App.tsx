import InitialPage from 'pages/InitialPage/InitialPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from 'components/SignIn/SignIn'
import SignUp from 'components/SignUp/SignUp'
import ResetPassword from 'components/ResetPassword/ResetPassword'
import HomePage from 'pages/HomePage/HomePage'
import RecentGames from 'components/RecentGames/RecentGames'
import NewGame from 'components/NewGame/NewGame'
import { Provider } from 'react-redux'
import { store } from '../src/store/index'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { login } from 'store/auth-slice'

function App() {

  const savedToken = localStorage.getItem('token') || '';
  const dispatch = useAppDispatch();
  dispatch(login(savedToken));
  const token = useAppSelector(state => state.auth.token);
  const isLoggedIn = !!token;

  return (
      <Routes>
        {isLoggedIn ?
          <Route path='/' element={<HomePage />}>
            <Route index element={<RecentGames />} />
            <Route path='/new-game' element={<NewGame />} />
          </Route>
          :
          <Route path='/' element={<InitialPage />}>
            <Route index element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/reset' element={<ResetPassword />} />
          </Route>
        }
      </Routes>
  )
}

export default App
