import { useEffect, useState } from "react"
import { axiosBase } from '../../api/AxiosConfig'
import Game from "types/Game"
import Button from "components/UI/Button/Button";
import BallsSet from "./BallsSet/BallsSet";

// const gameReducer = (state, action: string) => {

// }

const NewGame = () => {
  const [currentGame, setCurrentGame] = useState<Game>();
  const [gamesAvailable, setGamesAvailable] = useState<Game[]>([]);

  useEffect(() => {

    const fetchGames = async () => {
      const response = await axiosBase.get('/cart_games');
      setGamesAvailable(response.data.types);
    }

    fetchGames();

  }, []);

  useEffect(() => {
    setCurrentGame(gamesAvailable[0]);
  }, [gamesAvailable]);


  return (
    <section>
      <h2>NEW BET FOR {currentGame?.type}</h2>
      <div>
        <h3>Choose a game</h3>
        <div>
          {gamesAvailable.map((game, id) =>
            <Button
              key={id}
              title={game.type}
              themeColor={game.color}
              attributes={{ onClick: () => setCurrentGame(game) }}
              selected={currentGame?.type} />)}
        </div>
      </div>
      <section>
        <h3>Fill your bet</h3>
        <h4>{currentGame?.description}</h4>
        <BallsSet ballsCount={parseInt(currentGame?.range as string)} />
      </section>
    </section>
  )
}

export default NewGame