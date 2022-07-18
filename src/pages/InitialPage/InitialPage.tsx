import { Outlet } from 'react-router-dom'
import InitialPageWrapper from './InitialPageWrapper'

const InitialPage = () => {
  return (
    <InitialPageWrapper>
      <section>
        <h2>The Greatest App</h2>
        <h4>for</h4>
        <h1>LOTTERY</h1>
      </section>
      <Outlet />
    </InitialPageWrapper>
  )
}

export default InitialPage