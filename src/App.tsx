import InitialPage from 'pages/InitialPage/InitialPage'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from 'components/SignIn'
import SignUp from 'components/SignUp'
import ResetPassword from 'components/ResetPassword'
import HomePage from 'pages/HomePage/HomePage'
import RecentGames from 'components/RecentGames'
import NewGame from 'components/NewGame'
import { useAppDispatch } from 'store/hooks'
import { login } from 'store/auth-slice'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

type Token = {
  type: string,
  token: string,
  expires_at: string
}

function App() {

  const local = localStorage.getItem('token') || undefined;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (local) {
      const token: Token = JSON.parse(local);
      dispatch(login(token));
      navigate('/');
    }
  }, []);

  if (local) {
    return (
      <>
        <ToastContainer />
        <Routes>
            <Route path='/' element={<HomePage />}>
              <Route index element={<RecentGames />} />
              <Route path='/new-game' element={<NewGame />} />
              <Route path='*' element={<p>Essa rota não existe</p>} />
            </Route>
        </Routes>
      </>
    )
  }

  return (
    <>
      <ToastContainer />
      <Routes>
          <Route path='/' element={<InitialPage />}>
            <Route index element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/reset' element={<ResetPassword />} />
            <Route path='*' element={<SignIn />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
