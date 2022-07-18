import { axiosBase } from 'api/AxiosConfig'
import Button from 'components/UI/Button/Button';
import { useEffect, useState } from 'react'
import Bet from 'types/Bet'
import Game from 'types/Game';
import BetsList from './GamesList/BetsList';
import RecentGamesWrapper from './RecentGamesWrapper'

function RecentGames() {

  const [bets, setBets] = useState<Bet[]>([]);
  const [filter, setFilter] = useState<string>('')

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

  const addFilter = (type: string) => {
    if (filter === type) {
      setFilter('');
    } else {
      setFilter(type);
    }
  }

  console.log(filter)

  const filterButtons = games?.map(({ type, color, id }) =>
    <Button title={type} themeColor={color} key={id} onClick={addFilter} filter={filter}/>);


  return (
    <RecentGamesWrapper>
      <header>
        <h2>RECENT GAMES</h2>
        <div>
          <p>Filters</p>
          {filterButtons}
        </div>
      </header>
      <BetsList bets={bets} filterBets={filter} />
      <Button
        title='New Bet'
        themeColor='#B5C401'
        styles={{ position: 'fixed', bottom: '30px', right: '30px' }}
        onClick={addFilter} />

    </RecentGamesWrapper>
  )
}

export default RecentGames