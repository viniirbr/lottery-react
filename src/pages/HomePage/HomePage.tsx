import CartModal from "components/CartModal/CartModal";
import Header from "components/Header/Header"
import { useState } from "react"
import { Outlet } from 'react-router-dom'
import { useAppSelector } from "store/hooks";
import Bet from "types/Bet";

function HomePage() {

  const [showModal, setShowModal] = useState<boolean>(false);
  
  return (
    <>
    <Header showCartModal={setShowModal}/>
    <Outlet />
    {showModal && <CartModal hideCartModal={setShowModal}/>}
    </>
  )
}

export default HomePage