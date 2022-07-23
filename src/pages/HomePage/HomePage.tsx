import { axiosBase } from "api/AxiosConfig";
import CartModal from "components/CartModal/CartModal";
import Header from "components/Header/Header"
import { useEffect, useState } from "react"
import { Outlet } from 'react-router-dom'
import { useAppSelector } from "store/hooks";
import Game from "types/Game";

type ResponseType = {
  min_cart_value: number,
  types: Game[];
}

function HomePage() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [minCartValue, setMinCartValue] = useState<number>();
  const token = useAppSelector(state => state.auth.user?.token.token);

  useEffect(() => {

    getMinCartValue();

    async function getMinCartValue() {
      const response = await axiosBase.get<ResponseType>('/cart_games', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMinCartValue(response.data.min_cart_value);
    }
  }, [])

  return (
    <>
      <Header showCartModal={setShowModal} />
      <Outlet />
      {showModal && <CartModal hideCartModal={setShowModal} minCartValue={minCartValue as number}/>}
    </>
  )
}

export default HomePage