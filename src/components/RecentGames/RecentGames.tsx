import { axiosBase } from 'api/AxiosConfig'
import Button from 'components/UI/Button/Button';
import { useEffect, useState } from 'react'
import Bet from 'types/Bet'
import { Link } from 'react-router-dom'
import Game from 'types/Game';
import BetsList from './GamesList/BetsList';
import RecentGamesWrapper from './RecentGamesWrapper'
import { useAppSelector } from 'store/hooks';

function RecentGames() {

  const [bets, setBets] = useState<Bet[]>([]);
  const [filter, setFilter] = useState<string>('');
  const token = useAppSelector(state => state.auth.user?.token.token);

  useEffect(() => {

    const fetchData = async () => {

      const [betsResponse, gamesResponse] = await Promise.all([
        axiosBase.get<Bet[]>('/bet/all-bets', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }),
        axiosBase.get<{ min_cart_value: number, types: Game[] }>('/cart_games')
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

  const addFilter = (type: string) => {
    if (filter === type) {
      setFilter('');
    } else {
      setFilter(type);
    }
  }


  const filterButtons = games?.map(({ type, color, id }) =>
    <Button
      key={id}
      themeColor={color}
      attributes={{ onClick: () => addFilter(type) }}
      selected={filter}>
      {type}
    </Button>);


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
      <Link to='/new-game'>
        <Button
          themeColor='#B5C401'
          styles={{ position: 'fixed', bottom: '30px', right: '30px' }}>
          New Bet
        </Button>
      </Link>

    </RecentGamesWrapper>
  )
}

export default RecentGames