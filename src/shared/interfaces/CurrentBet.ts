import { Game } from "./index";

interface CurrentBet {
    game: Game | undefined, 
    numbersSelected: string[]
}

export default CurrentBet;