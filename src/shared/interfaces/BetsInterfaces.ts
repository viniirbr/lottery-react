import { Game } from "./GamesInterfaces"

export type IListBetsResponse = Array<Bet>

export interface INewBetRequest {
    games: Array<{ game_id: number, numbers: number[] }>
}

export interface INewBetResponse {
    bet: Bet[]
}

export interface Bet {
    id: number,
    user_id: number,
    game_id: number,
    choosen_numbers: string,
    price: number,
    created_at?: Date,
    type: {
        id: number,
        type: string
    }
}