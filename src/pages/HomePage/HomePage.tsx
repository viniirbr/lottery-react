import { axiosBase } from "api/AxiosConfig";
import { CartModal, Header } from 'components/index'
import { useEffect, useState } from "react"
import { Outlet } from 'react-router-dom'
import { setMinCartValue } from "store/cart-slice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Game from "types/Game";

type ResponseType = {
  min_cart_value: number,
  types: Game[];
}

function HomePage() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const token = useAppSelector(state => state.auth.user?.token.token);
  const dispatch = useAppDispatch();
  const minCartValue = useAppSelector(state => state.cart.minCartValue);

  useEffect(() => {

    getMinCartValue();

    async function getMinCartValue() {
      const response = await axiosBase.get<ResponseType>('/cart_games', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(setMinCartValue(response.data.min_cart_value));
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