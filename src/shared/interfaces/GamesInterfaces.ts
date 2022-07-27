import { AxiosRequestHeaders } from "axios";

export interface ICreateGameRequest {
    type: string,
    description: string,
    range: number,
    price: number,
    max_number: number,
    color: string,
    headers: AxiosRequestHeaders
}

export interface ICreateGameResponse {
    type: string,
    description: string,
    range: number,
    price: number,
    max_number: number,
    color: string,
}

export interface IListGamesResponse {
    min_cart_value: number;
    types: Game[];
}

export interface Game extends ICreateGameResponse {
    id: number
}