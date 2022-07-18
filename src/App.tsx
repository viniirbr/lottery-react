import InitialPage from 'pages/InitialPage/InitialPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from 'components/SignIn/SignIn'
import SignUp from 'components/SignUp/SignUp'
import ResetPassword from 'components/ResetPassword/ResetPassword'
import HomePage from 'pages/HomePage/HomePage'
import RecentGames from 'components/RecentGames/RecentGames'
import NewGame from 'components/NewGame/NewGame'

function App() {

  const DUMMY_ISLOGGEDIN = true;

  return (
    <Routes>
      {DUMMY_ISLOGGEDIN ?
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
)}

export default App
