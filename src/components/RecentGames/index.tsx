import { gamesService, betsService } from 'shared/services'
import Button from 'components/UI/Button';
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BetsList from './GamesList';
import RecentGamesWrapper from './styles';
import { useAppSelector } from 'store/hooks';
import { ArrowRight } from 'phosphor-react';
import { BeatLoader } from 'react-spinners';
import { Game } from 'shared/interfaces/GamesInterfaces';
import { Bet, IListBetsResponse } from 'shared/interfaces/BetsInterfaces';
import { Token } from 'shared/interfaces/AuthInterfaces';

function RecentGames() {

  const [bets, setBets] = useState<Bet[]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gamesAvailable, setGamesAvailable] = useState<Game[]>([]);
  const token = useAppSelector(state => state.auth.token);
  const { listGames } = gamesService();
  const { listBet } = betsService();
  const params = new URLSearchParams();

  useEffect(() => {

    const fetchData = async () => {

      console.log('aaaa')

      try {
        const [betsResponse, gamesResponse] = await Promise.all([
          listBet(token?.token as string),
          listGames()
        ]);
        console.log(betsResponse)
        console.log(gamesResponse)
        setGamesAvailable(gamesResponse.types);
        const betsWithColor = betsResponse.map(bet => {
          const color = gamesResponse.types.find(game => game.id === bet.type.id)?.color;
          bet.type.color = color;
          return bet;
        })
        setBets(betsWithColor);
      } catch (e) {
        console.log('erro')
      } finally {
        setIsLoading(false);
      }

    }

    if (token?.token) {
      fetchData();
    }
  }, [token?.token]);

  async function addFilter(type: string) {
    if (filter.includes(type)) {
      const newFilter = [...filter];
      newFilter.splice(filter.indexOf(type), 1);
      setFilter(newFilter);
    } else {
      setFilter([...filter as string[], type]);
    }
    filter.forEach(filter => params.append('type%5B%5D', filter));
    const betsResponse = await listBet(token?.token as string, params);
    console.log(betsResponse)
    const betsWithColor = betsResponse.map(bet => {
      const color = gamesAvailable.find(game => game.id === bet.type.id)?.color
      console.log(color)
      bet.type.color = color;
      return bet;
    })
    setBets(betsWithColor);
  }

  const filterButtons = gamesAvailable.map(({ type, color, id }) =>
    <Button
      key={id}
      themeColor={color}
      attributes={{ onClick: () => addFilter(type) }}
      selected={false}>
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
      {!isLoading && bets.length !== 0 && <BetsList bets={bets} />}
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