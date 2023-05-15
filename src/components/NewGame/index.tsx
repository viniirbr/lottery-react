import { useEffect, useReducer, useState } from "react";
import { gamesService } from "../../shared/services";
import { Button, Cart } from "components";
import BallsSet from "./BallsSet";
import CurrentBet from "../../shared/interfaces/CurrentBet";
import { Bet } from "shared/interfaces/BetsInterfaces";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addBet } from "store/cart-slice";
import NewGameWrapper from "./styles";
import { ShoppingCart } from "phosphor-react";
import { toast } from "react-toastify";
import { Game } from "shared/interfaces/GamesInterfaces";

interface BetsState {
  currentBet: CurrentBet | undefined;
  incompleteBets: CurrentBet[];
}

interface BetsAction {
  type: string;
  payload?: Game | string;
}

function betsReducer(state: BetsState, action: BetsAction): BetsState {
  if (action.type === "CHANGE-GAME") {
    const indexOfCurrentGame = state.incompleteBets.findIndex(
      (bet) => bet?.game?.type === state.currentBet?.game?.type
    );

    if (indexOfCurrentGame !== -1) {
      state.incompleteBets.splice(indexOfCurrentGame, 1);
    }

    if (state.currentBet?.game !== undefined) {
      state.incompleteBets.push(state.currentBet as CurrentBet);
    }

    const gameSelected = state.incompleteBets.find(
      (bet) => bet?.game?.type === (action.payload as Game)?.type
    );

    if (gameSelected) {
      return {
        currentBet: gameSelected,
        incompleteBets: state.incompleteBets,
      };
    }

    return {
      currentBet: { game: action.payload as Game, numbersSelected: [] },
      incompleteBets: state.incompleteBets,
    };
  }

  if (action.type === "NUMBER-SELECTED") {
    const numbersSelected = state.currentBet?.numbersSelected;
    const clickedNumber = action.payload as string;
    const currentBetGame = state.currentBet?.game;
    if (numbersSelected?.includes(clickedNumber as string)) {
      numbersSelected?.splice(numbersSelected.indexOf(clickedNumber), 1);
    } else if (
      (numbersSelected?.length as number) <
      (currentBetGame?.min_max_number as number)
    ) {
      state.currentBet?.numbersSelected.push(action.payload as string);
    } else {
      toast.warn(
        `Vocês já selecionou ${currentBetGame?.min_max_number} números, quantidade máxima para o` +
          ` jogo ${currentBetGame?.type}.`,
        {
          position: "top-center",
        }
      );
    }
    return {
      currentBet: state.currentBet,
      incompleteBets: state.incompleteBets,
    };
  }

  if (action.type === "CLEAR") {
    return {
      currentBet: { game: state.currentBet?.game, numbersSelected: [] },
      incompleteBets: state.incompleteBets,
    };
  }

  if (action.type === "COMPLETE") {
    return {
      currentBet: { game: state.currentBet?.game, numbersSelected: [] },
      incompleteBets: state.incompleteBets,
    };
  }

  return {
    currentBet: undefined,
    incompleteBets: [],
  };
}

const NewGame = () => {
  const [gamesAvailable, setGamesAvailable] = useState<Game[]>([]);
  const [betsState, dispatchBets] = useReducer(betsReducer, {
    currentBet: undefined,
    incompleteBets: [],
  });
  const dispatchCart = useAppDispatch();
  const bets = useAppSelector((state) => state.cart.bets);
  const { listGames } = gamesService();

  useEffect(() => {
    const fetchGames = async () => {
      const response = await listGames();
      setGamesAvailable(response.games);
    };

    fetchGames();
  }, []);

  useEffect(() => {
    if (gamesAvailable.length !== 0) {
      dispatchBets({ type: "CHANGE-GAME", payload: gamesAvailable[0] });
    }
  }, [gamesAvailable]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(bets));
  }, [bets]);

  function handleBallClicked(ballNumber: string) {
    dispatchBets({ type: "NUMBER-SELECTED", payload: ballNumber });
  }

  function handleGameTypeButtonClick(gameSelected: Game) {
    dispatchBets({ type: "CHANGE-GAME", payload: gameSelected });
  }

  function handleCompleteGame() {
    const gameNumbersList: string[] = [];
    const numbersSelected = betsState.currentBet?.numbersSelected as string[];
    const maxNumber = betsState.currentBet?.game?.min_max_number as number;
    const range = betsState.currentBet?.game?.range as number;

    for (let i = 1; i <= range; i++) {
      const numberString = i.toString();
      gameNumbersList.push(numberString);
    }

    const numbersRemaining = gameNumbersList.filter((number) => {
      if (number[0] === "0") {
        return !numbersSelected.includes(number[1]);
      }
      return !numbersSelected.includes(number);
    });

    for (let i = 0; i < maxNumber - numbersSelected?.length; i++) {
      const random = Math.floor(Math.random() * numbersRemaining.length);
      dispatchBets({
        type: "NUMBER-SELECTED",
        payload: numbersRemaining[random],
      });
      numbersRemaining.splice(random, 1);
    }
  }

  function handleAddToCart() {
    const { numbersSelected } = betsState.currentBet as CurrentBet;
    const { currentBet } = betsState;

    if (numbersSelected.length === currentBet?.game?.min_max_number) {
      const bet: Bet = {
        chosen_numbers: betsState.currentBet?.numbersSelected
          .sort((a, b) => parseInt(a) - parseInt(b))
          .join(", ") as string,
        game_id: betsState.currentBet?.game?.id as number,
        id: Math.floor(Math.random() * 500),
        price: betsState.currentBet?.game?.price as number,
        game: betsState.currentBet?.game as Game,
      };
      dispatchCart(addBet(bet));
      dispatchBets({ type: "CLEAR" });
      toast.success(`Aposta adicionada ao carrinho!
      Números selecionados: ${currentBet?.numbersSelected.join(", ")}`);
    } else {
      const maxNumber = betsState.currentBet?.game?.min_max_number as number;
      const numbersLeft =
        maxNumber - (betsState.currentBet?.numbersSelected.length as number);
      toast.warn(
        `Você ainda não selecionou ${maxNumber} números. ` +
          `Ainda resta${numbersLeft > 1 ? "m" : ""} ${numbersLeft} número${
            numbersLeft > 1 ? "s" : ""
          }.`,
        {
          position: "top-center",
        }
      );
    }
  }

  return (
    <NewGameWrapper>
      <section>
        <h2>
          <b>NEW BET</b> FOR {betsState.currentBet?.game?.type.toUpperCase()}
        </h2>
        <div>
          <h3>Choose a game</h3>
          <div>
            {gamesAvailable.map((game, id) => (
              <Button
                key={id}
                themeColor={game.color}
                attributes={{ onClick: () => handleGameTypeButtonClick(game) }}
                selected={betsState.currentBet?.game?.type}
                dataCy={`game-button-${game.type}`}
              >
                {game.type}
              </Button>
            ))}
          </div>
        </div>
        <section>
          <h3>Fill your bet</h3>
          <h4>{betsState.currentBet?.game?.description}</h4>
          <BallsSet
            ballsCount={betsState.currentBet?.game?.range as number}
            ballsSelected={betsState.currentBet?.numbersSelected as string[]}
            onBallClicked={handleBallClicked}
            themeColor={betsState.currentBet?.game?.color}
          />
        </section>
        <div>
          <Button
            themeColor="#27C383"
            styles={{ borderRadius: "10px", borderWidth: "1px" }}
            attributes={{ onClick: handleCompleteGame }}
            dataCy="complete-game"
          >
            Complete game
          </Button>
          <Button
            themeColor="#27C383"
            styles={{ borderRadius: "10px", borderWidth: "1px" }}
            attributes={{ onClick: () => dispatchBets({ type: "CLEAR" }) }}
          >
            Clear game
          </Button>
          <Button
            themeColor="#27C383"
            styles={{ borderRadius: "10px", borderWidth: "1px" }}
            selected={true}
            attributes={{ onClick: handleAddToCart }}
            dataCy="add-to-cart"
          >
            <ShoppingCart size={20} weight="bold" /> Add to cart
          </Button>
        </div>
      </section>
      {window.innerWidth > 700 && (
        <Cart
          bets={bets}
          minCartValue={useAppSelector((state) => state.cart.minCartValue)}
        />
      )}
    </NewGameWrapper>
  );
};

export default NewGame;
