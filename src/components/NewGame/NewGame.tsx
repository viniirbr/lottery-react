import { useEffect, useReducer, useState } from "react"
import { axiosBase } from '../../api/AxiosConfig'
import Game from "types/Game"
import Button from "components/UI/Button/Button";
import BallsSet from "./BallsSet/BallsSet";
import { CurrentBet } from "types/CurrentBet";

interface BetsState {
  currentBet: CurrentBet | undefined,
  incompleteBets: CurrentBet[]
}

interface BetsAction {
  type: string,
  payload?: Game | string
}

function betsReducer(state: BetsState, action: BetsAction): BetsState {

  if (action.type === 'CHANGE-GAME') {
    const indexOfCurrentGame = state.incompleteBets.
      findIndex(bet => bet?.game?.type === state.currentBet?.game?.type);

    if (indexOfCurrentGame !== -1) {
      state.incompleteBets.splice(indexOfCurrentGame, 1);
    }

    if (state.currentBet?.game !== undefined) {
      state.incompleteBets.push(state.currentBet as CurrentBet);
    }

    const gameSelected = state.incompleteBets.find(bet => bet?.game?.type === (action.payload as Game)?.type);

    if (gameSelected) {
      return ({
        currentBet: gameSelected,
        incompleteBets: state.incompleteBets
      })
    }

    return ({
      currentBet: { game: action.payload as Game, numbersSelected: [] },
      incompleteBets: state.incompleteBets
    })
  }

  if (action.type === 'NUMBER-SELECTED') {
    const numbersSelected = state.currentBet?.numbersSelected;
    const clickedNumber = action.payload as string;
    const currentBetGame = state.currentBet?.game;
    if (numbersSelected?.includes(clickedNumber as string)) {
      numbersSelected?.splice(numbersSelected.indexOf(clickedNumber), 1);
    } else if (numbersSelected?.length as number < parseInt(currentBetGame?.max_number as string)) {
      state.currentBet?.numbersSelected.push(action.payload as string);
    } else {
      window.alert(`Vocês já selecionou ${currentBetGame?.max_number} números, quantidade máxima para o` +
        ` jogo ${currentBetGame?.type}.`)
    }
    return ({
      currentBet: state.currentBet,
      incompleteBets: state.incompleteBets
    })
  }

  if (action.type === 'CLEAR') {
    return {
      currentBet: { game: state.currentBet?.game, numbersSelected: [] },
      incompleteBets: state.incompleteBets
    }
  }

  return {
    currentBet: undefined,
    incompleteBets: []
  }
}

const NewGame = () => {
  const [gamesAvailable, setGamesAvailable] = useState<Game[]>([]);

  const [betsState, dispatchBets] = useReducer(betsReducer, { currentBet: undefined, incompleteBets: [] });

  useEffect(() => {

    const fetchGames = async () => {
      const response = await axiosBase.get('/cart_games');
      setGamesAvailable(response.data.types);
    }

    fetchGames();
  }, []);

  useEffect(() => {
    if (gamesAvailable.length !== 0) {
      dispatchBets({ type: 'CHANGE-GAME', payload: gamesAvailable[0] });
    }
  }, [gamesAvailable]);

  function handleBallClicked(ballNumber: string) {
    dispatchBets({ type: 'NUMBER-SELECTED', payload: ballNumber });
  }

  function handleGameTypeButtonClick(gameSelected: Game) {
    dispatchBets({ type: 'CHANGE-GAME', payload: gameSelected });
  }


  return (
    <section>
      <h2>NEW BET FOR {betsState.currentBet?.game?.type.toUpperCase()}</h2>
      <div>
        <h3>Choose a game</h3>
        <div>
          {gamesAvailable.map((game, id) =>
            <Button
              key={id}
              themeColor={game.color}
              attributes={{ onClick: () => handleGameTypeButtonClick(game) }}
              selected={betsState.currentBet?.game?.type}>
              {game.type}
            </Button>)}
        </div>
      </div>
      <section>
        <h3>Fill your bet</h3>
        <h4>{betsState.currentBet?.game?.description}</h4>
        <BallsSet
          ballsCount={parseInt(betsState.currentBet?.game?.range as string)}
          ballsSelected={betsState.currentBet?.numbersSelected as string[]}
          onBallClicked={handleBallClicked}
          themeColor={betsState.currentBet?.game?.color} />
      </section>
      <div>
        <Button themeColor='#27C383' styles={{ borderRadius: '10px', borderWidth: '1px' }}>
          Complete game
        </Button>
        <Button themeColor='#27C383' styles={{ borderRadius: '10px', borderWidth: '1px' }}
          attributes={{ onClick: () => dispatchBets({ type: 'CLEAR' }) }}>
          Clear game
        </Button>
        <Button themeColor='#27C383' styles={{ borderRadius: '10px', borderWidth: '1px' }}
          selected={true}>
          Add to cart
        </Button>

      </div>
    </section>
  )
}

export default NewGame