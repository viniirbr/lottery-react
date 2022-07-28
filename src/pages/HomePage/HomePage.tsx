import { gamesService } from "shared/services";
import { CartModal, Header } from 'components/index'
import { useEffect, useState } from "react"
import { Outlet } from 'react-router-dom'
import { setMinCartValue } from "store/cart-slice";
import { useAppDispatch, useAppSelector } from "store/hooks";

function HomePage() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const minCartValue = useAppSelector(state => state.cart.minCartValue);
  const { listGames } = gamesService();

  useEffect(() => {
    getMinCartValue();
    
    async function getMinCartValue() {
      const response = await listGames();
      dispatch(setMinCartValue(response.min_cart_value));
    }
  }, [])

  return (
    <>
      <Header showCartModal={setShowModal} />
      <Outlet />
      {showModal && <CartModal hideCartModal={setShowModal} minCartValue={minCartValue}/>}
    </>
  )
}

export default HomePage