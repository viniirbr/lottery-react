import { Game } from "./GamesInterfaces";

export type IListBetsResponse = Array<Bet>;

export interface INewBetRequest {
  bets: Array<{ gameId: number; chosenNumbers: number[] }>;
}

export interface INewBetResponse {
  bet: Bet[];
}

export interface Bet {
  id: number;
  user_id?: number;
  game_id: number;
  chosen_numbers: string;
  created_at?: Date;
  price?: number;
  game: {
    id: number;
    type: string;
    color?: string;
    price: number;
  };
}
