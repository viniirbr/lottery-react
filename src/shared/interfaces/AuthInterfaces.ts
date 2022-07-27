export interface ILoginRequest {
    email: string,
    password: string
}

export interface ILoginResponse {
    user:  User;
    token?: Token;
}

export interface Token {
    type:       string;
    token:      string;
    expires_at: string;
}

export interface User {
    id:               number;
    email:            string;
    is_admin:         number;
    name:             string;
    token:            string;
    token_created_at?: Date;
    created_at?:       Date;
    updated_at?:       Date;
    picture?:          null;
}


export interface IResetRequest {
    email: string
}

export interface IResetResponse {
    id:               number;
    email:            string;
    is_admin:         number;
    name:             string;
    token:            string;
    token_created_at: Date;
    created_at:       Date;
    updated_at:       Date;
}

export interface IChangePasswordRequest {
    email: string
}

export interface IChangePasswordResponse {
    id:         number;
    email:      string;
    is_admin:   number;
    name:       string;
    created_at: Date;
    updated_at: Date;
}