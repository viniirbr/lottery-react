import axios, { AxiosRequestHeaders } from "axios";

export interface ICreateUserRequest {
    name: string,
    email: string,
    password: string
}

export interface ICreateUserResponse {
    user: User;
    token: Token;
}

interface Token {
    type: string;
    token: string;
    expires_at: Date;
}

interface User {
    email: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    id: number;
}

export interface IUpdateUserRequest {
    email?: string,
    name?: string,
}

export interface IUpdateUserResponse {
    id: number;
    email: string;
    is_admin: number;
    name: string;
    token: string;
    token_created_at: Date;
    created_at: Date;
    updated_at: Date;
}

export interface IAccountResponse {
    id:               number;
    email:            string;
    is_admin:         number;
    name:             string;
    token:            null;
    token_created_at: Date;
    created_at:       Date;
    updated_at:       Date;
    bets:             Bet[];
    picture:          null;
}

export interface Bet {
    id:              number;
    choosen_numbers: string[];
    user_id:         number;
    game_id:         number;
    price:           number;
    created_at:      Date;
    updated_at:      Date;
    type:            string;
}