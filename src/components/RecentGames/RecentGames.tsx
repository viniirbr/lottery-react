import { axiosBase } from 'api/AxiosConfig'
import Button from 'components/UI/Button/Button';
import { useEffect, useState } from 'react'
import Bet from 'types/Bet'
import Game from 'types/Game';
import BetItem from './GamesList/BetItem/BetItem';
import BetsList from './GamesList/BetsList';
import RecentGamesWrapper from './RecentGamesWrapper'

function RecentGames() {

  //const [gameTypes, setGameTypes] = useState<string[]>();
  const [bets, setBets] = useState<Bet[]>();

  useEffect(() => {

    const fetchData = async () => {

      const [betsResponse, gamesResponse] = await Promise.all([
        axiosBase.get<Bet[]>('/bet/all-bets', {
          headers: {
            "Authorization": "Bearer MTg.vIjXPxdpyVLhnwurMDKdx70Dm2K77WOeH2B2PQO7XtHZ-J0ugimEm8CiGpg5"
          }
        }),
        axiosBase.get<{ min_cart_value: number, types: Game[] }>('/cart_games', {
          headers: {
            "Authorization": "Bearer MTg.vIjXPxdpyVLhnwurMDKdx70Dm2K77WOeH2B2PQO7XtHZ-J0ugimEm8CiGpg5"
          }
        })
      ]);

      const gamesAvailable = gamesResponse.data.types;

      const bets = betsResponse.data.map(bet => {
        return { ...bet, type: gamesAvailable.find(game => game.type === bet.type.type) as Game };
      });

      setBets(bets);
    }

    fetchData();
  }, []);

  const gameTypesWithDuplicates = bets?.map(bet => bet.type) as Game[];
  const games = gameTypesWithDuplicates?.filter((game, index, array) => {
    return array.indexOf(game) === index
  });
  console.log(games)
  const filterButtons = games?.map(({ type, color, id }) => <Button title={type} themeColor={color} key={id}/>);

  return (
    <RecentGamesWrapper>
      <header>
        <h2>RECENT GAMES</h2>
        <div>
          <p>Filters</p>
          {filterButtons}
        </div>
        <BetsList bets={bets}/>
      </header>

    </RecentGamesWrapper>
  )
}

export default RecentGames