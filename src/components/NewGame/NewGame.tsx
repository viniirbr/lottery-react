import { useEffect, useReducer, useState } from "react"
import { axiosBase } from '../../api/AxiosConfig'
import Game from "types/Game"
import Button from "components/UI/Button/Button";
import BallsSet from "./BallsSet/BallsSet";
import { CurrentBet } from "types/CurrentBet";
import Bet from "types/Bet";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addBet } from "store/cart-slice";
import NewGameWrapper from "./NewGameWrapper";
import Cart from "components/Cart/Cart";
import { ShoppingCart } from 'phosphor-react'
import { toast } from 'react-toastify'

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
      toast.warn(`Vocês já selecionou ${currentBetGame?.max_number} números, quantidade máxima para o` +
        ` jogo ${currentBetGame?.type}.`, {
        position: "top-center"
      });
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

  if (action.type === 'COMPLETE') {
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
  const dispatchCart = useAppDispatch();
  const bets = useAppSelector(state => state.cart.bets);
  const user = useAppSelector(state => state.auth.user);

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

  function handleCompleteGame() {
    const gameNumbersList: string[] = [];
    const numbersSelected = betsState.currentBet?.numbersSelected as string[];
    const maxNumber = parseInt(betsState.currentBet?.game?.max_number as string);
    const range = parseInt(betsState.currentBet?.game?.range as string);

    for (let i = 1; i <= range; i++) {
      const numberString = i.toString();
      gameNumbersList.push(numberString);
    }

    const numbersRemaining = gameNumbersList.filter(number => {

      if (number[0] === '0') {
        return !numbersSelected.includes(number[1]);
      }
      return !numbersSelected.includes(number);
    });

    for (let i = 0; i < maxNumber - numbersSelected.length; i++) {
      const random = Math.floor(Math.random() * (numbersRemaining.length));
      dispatchBets({ type: 'NUMBER-SELECTED', payload: numbersRemaining[random] });
      numbersRemaining.splice(random, 1);
    }
  }

  function handleAddToCart() {

    const { numbersSelected } = betsState.currentBet as CurrentBet;
    const { currentBet } = betsState;

    if (numbersSelected.length === parseInt(currentBet?.game?.max_number as string)) {
      const bet: Bet = {
        choosen_numbers: betsState.currentBet?.numbersSelected
          .sort((a, b) => parseInt(a) - parseInt(b)).join(', ') as string,
        created_at: (new Date()).toDateString(),
        game_id: betsState.currentBet?.game?.id as number,
        id: Math.floor(Math.random() * (500)),
        price: betsState.currentBet?.game?.price as number,
        type: betsState.currentBet?.game as Game,
        user_id: user?.id as number
      }
      dispatchCart(addBet(bet));
      dispatchBets({ type: 'CLEAR' });
      toast.success(`Aposta adicionada ao carrinho!
      Números selecionados: ${currentBet?.numbersSelected.join(', ')}`)
    } else {
      const maxNumber = parseInt(betsState.currentBet?.game?.max_number as string);
      const numbersLeft = maxNumber - (betsState.currentBet?.numbersSelected.length as number)
      toast.warn(`Você ainda não selecionou ${maxNumber} números. ` +
        `Ainda resta${numbersLeft > 1 ? 'm' : ''} ${numbersLeft} número${numbersLeft > 1 ? 's' : ''}.`, {
        position: "top-center"
      });
    }
  }



  return (
    <NewGameWrapper>
      <section>
        <h2><b>NEW BET</b> FOR {betsState.currentBet?.game?.type.toUpperCase()}</h2>
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
          <Button themeColor='#27C383' styles={{ borderRadius: '10px', borderWidth: '1px' }}
            attributes={{ onClick: handleCompleteGame }}>
            Complete game
          </Button>
          <Button themeColor='#27C383' styles={{ borderRadius: '10px', borderWidth: '1px' }}
            attributes={{ onClick: () => dispatchBets({ type: 'CLEAR' }) }}>
            Clear game
          </Button>
          <Button themeColor='#27C383' styles={{ borderRadius: '10px', borderWidth: '1px' }}
            selected={true} attributes={{ onClick: handleAddToCart }}>
            <ShoppingCart size={20} weight='bold' /> Add to cart
          </Button>

        </div>
      </section>
      {window.innerWidth > 700 && <Cart bets={bets}
        minCartValue={useAppSelector(state => state.cart.minCartValue)} />}
    </NewGameWrapper>
  )
}

export default NewGame