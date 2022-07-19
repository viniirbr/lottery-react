import Game from "./Game";

export interface CurrentBet {
    game: Game | undefined, 
    numbersSelected: string[]
}