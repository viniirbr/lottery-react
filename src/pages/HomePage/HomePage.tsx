import Header from "components/Header/Header"
import { Outlet } from 'react-router-dom'

function HomePage() {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default HomePage