import './App.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store/hooks'
import { login } from 'store/auth-slice'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import PublicRoutes from './routes/PublicRoutes'
import PrivateRoutes from 'routes/PrivateRoutes'

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

  return (
    <>
      <ToastContainer />
      {local ? <PrivateRoutes /> : <PublicRoutes />}
    </>
  )

}

export default App
