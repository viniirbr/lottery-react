import AccountInfo from "components/AccountInfo"
import NewGame from "components/NewGame"
import RecentGames from "components/RecentGames"
import HomePage from "pages/HomePage/HomePage"
import { Route, Routes } from "react-router-dom"

function PrivateRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}>
              <Route index element={<RecentGames />} />
              <Route path='/new-game' element={<NewGame />} />
              <Route path='/account' element={<AccountInfo />} />
              <Route path='*' element={<p>Essa rota não existe</p>} />
            </Route>
        </Routes>
    )
}

export default PrivateRoutes