import InitialPage from 'pages/InitialPage/InitialPage'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from 'components/SignIn/SignIn'
import SignUp from 'components/SignUp/SignUp'
import ResetPassword from 'components/ResetPassword/ResetPassword'
import HomePage from 'pages/HomePage/HomePage'
import RecentGames from 'components/RecentGames/RecentGames'
import NewGame from 'components/NewGame/NewGame'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { login } from 'store/auth-slice'
import { useEffect, useState } from 'react'
import { axiosBase } from 'api/AxiosConfig'
import User from 'types/User'

function App() {

  const token = JSON.parse(localStorage.getItem('token') as string);
  const hasToken = !!token;
  const isLoggedIn = hasToken;
  // console.log(isLoggedIn)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {


    if (!token) {
      return;
    }

    fetchUserData(token);
    navigate('/')


    async function fetchUserData(token: any) {
      try {
        const response = await axiosBase.get('/user/my-account', {
          headers: {
            "Authorization": "bearer " + token.token
          }
        });
        const { data } = response;
        const user: User = {
          id: data.id,
          token: token
        };
        dispatch(login(user));
        
        //console.log(isLoggedIn)
      }
      catch (e) {

      }
    }
  }, [])

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
