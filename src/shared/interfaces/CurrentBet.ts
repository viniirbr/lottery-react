import { Game } from "./GamesInterfaces";

interface CurrentBet {
    game: Game | undefined, 
    numbersSelected: string[]
}

export default CurrentBet;