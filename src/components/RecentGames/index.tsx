import { gamesService, betsService } from 'shared/services'
import Button from 'components/UI/Button';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BetsList from './GamesList';
import RecentGamesWrapper from './styles';
import { useAppSelector } from 'store/hooks';
import { ArrowRight } from 'phosphor-react';
import { BeatLoader } from 'react-spinners';
import { Game } from 'shared/interfaces/GamesInterfaces';
import { IListBetsResponse } from 'shared/interfaces/BetsInterfaces';
import { Token } from 'shared/interfaces/AuthInterfaces';

function RecentGames() {

  const [bets, setBets] = useState<IListBetsResponse>([]);
  const [filter, setFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = useAppSelector(state => state.auth);
  const { listGames } = gamesService();
  const { listBet } = betsService();

  useEffect(() => {

    const fetchData = async () => {

      console.log(token)
      try {
        const [betsResponse, gamesResponse] = await Promise.all([
          await listBet(token.token?.token as string),
          await listGames()
        ]);

        const gamesAvailable = gamesResponse.types;

        const bets = betsResponse.map(bet => {
          return { ...bet, type: gamesAvailable.find(game => game.type === bet.type.type) as Game };
        });

        setBets(bets);
      } catch (e) {

      } finally {
        setIsLoading(false);
      }

    }

    if (token.token) {
      fetchData();
    }
  }, [token]);

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
        <div>
          <h2>RECENT GAMES</h2>
          {!isLoading && bets.length !== 0 && <div>
            <p>Filters</p>
            <div>
              {filterButtons}
            </div>
          </div>}
        </div>
        {window.innerWidth > 700 &&
          <Link to='/new-game'><h3>New Bet<ArrowRight size={32} color='#B5C401' /></h3></Link>}
      </header>
      {!isLoading && bets.length !== 0 && <BetsList bets={bets} filterBets={filter} />}
      {!isLoading && bets.length === 0 && <p>Não há apostas recentes. Que tal criar uma
        <Link to='/new-game'> nova aposta</Link>?</p>}
      {isLoading && <BeatLoader color='#B5C401' size={20} />}
      <Link to='/new-game'>
        {window.innerWidth <= 700 &&
          <Button
            themeColor='#B5C401'
            styles={{ position: 'fixed', bottom: '30px', right: '30px' }}>
            New Bet
          </Button>
        }
      </Link>

    </RecentGamesWrapper>
  )
}

export default RecentGames