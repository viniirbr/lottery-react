import { gamesService, betsService, instance } from "shared/services";
import Button from "components/UI/Button";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BetsList from "./GamesList";
import RecentGamesWrapper from "./styles";
import { useAppSelector } from "store/hooks";
import { ArrowRight } from "phosphor-react";
import { BeatLoader } from "react-spinners";
import { Game } from "shared/interfaces/GamesInterfaces";
import { Bet } from "shared/interfaces/BetsInterfaces";

function RecentGames() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingBets, setIsLoadingBets] = useState<boolean>(false);
  const [gamesAvailable, setGamesAvailable] = useState<Game[]>([]);
  const [noBets, setNoBets] = useState<boolean>(false);
  const token = useAppSelector((state) => state.auth.token);
  const { listGames } = gamesService();
  const { listBet } = betsService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [betsResponse, gamesResponse] = await Promise.all([
          listBet(token?.token as string),
          listGames(),
        ]);

        setGamesAvailable(gamesResponse.games);
        setBets(betsResponse);
        if (betsResponse.length === 0) {
          setNoBets(true);
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    getFilteredBets();

    async function getFilteredBets() {
      if (token) {
        try {
          setIsLoadingBets(true);
          const betsResponse = await listBet(token?.token as string, filters);
          setBets(betsResponse);
        } catch (error: any) {
        } finally {
          setIsLoadingBets(false);
        }
      }
    }
  }, [filters, token]);

  function addFilter(type: string) {
    if (filters.includes(type)) {
      const newFilter = [...filters];
      newFilter.splice(filters.indexOf(type), 1);
      setFilters(newFilter);
    } else {
      setFilters([...(filters as string[]), type]);
    }
  }

  const filterButtons = gamesAvailable.map(({ type, color, id }) => (
    <Button
      key={id}
      themeColor={color}
      attributes={{ onClick: () => addFilter(type) }}
      selected={filters.includes(type)}
      dataCy={`filter-${type}`}
    >
      {type}
    </Button>
  ));

  return (
    <RecentGamesWrapper>
      <header>
        <div>
          <h2 data-cy="recent-games-title">RECENT GAMES</h2>
          {!isLoading && !noBets && (
            <div>
              <p>Filters</p>
              <div data-cy="filter-buttons">{filterButtons}</div>
            </div>
          )}
        </div>
        {window.innerWidth > 700 && (
          <Link to="/new-game" data-cy="new-bet">
            <h3>
              New Bet
              <ArrowRight size={32} color="#B5C401" />
            </h3>
          </Link>
        )}
      </header>
      {!isLoading && bets.length !== 0 && (
        <BetsList bets={bets} isLoading={isLoadingBets} />
      )}
      {!isLoading && noBets && (
        <p>
          Não há apostas recentes. Que tal criar uma
          <Link to="/new-game"> nova aposta</Link>?
        </p>
      )}
      {!isLoading && bets.length === 0 && (
        <p>
          Não há apostas recentes desse{filters.length > 1 && "s"} jogo
          {filters.length > 1 && "s"}.
        </p>
      )}
      {isLoading && <BeatLoader color="#B5C401" size={20} />}
      <Link to="/new-game">
        {window.innerWidth <= 700 && (
          <Button
            themeColor="#B5C401"
            styles={{ position: "fixed", bottom: "30px", right: "30px" }}
          >
            New Bet
          </Button>
        )}
      </Link>
    </RecentGamesWrapper>
  );
}

export default RecentGames;
