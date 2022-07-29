import { SignIn } from "components"
import ResetPassword from "components/ResetPassword"
import SignUp from "components/SignUp"
import InitialPage from "pages/InitialPage/InitialPage"
import { Route, Routes } from "react-router-dom"

function PublicRoutes() {
    return (
        <Routes>
            <Route path='/' element={<InitialPage />}>
                <Route index element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/reset' element={<ResetPassword />} />
                <Route path='*' element={<SignIn />} />
            </Route>
        </Routes>
    )
}

export default PublicRoutes