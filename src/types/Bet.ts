import Game from "./Game";

interface Bet {
    choosen_numbers: string,
    created_at: string,
    game_id: number,
    id: number,
    price: number,
    type: Game,
    user_id: number
}

export default Bet;