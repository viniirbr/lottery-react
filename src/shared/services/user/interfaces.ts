import { IAccountResponse, ICreateUserRequest, ICreateUserResponse, IUpdateUserRequest, IUpdateUserResponse } from "shared/interfaces/UserInterfaces";

export default interface User {
    createUser: (body: ICreateUserRequest) => Promise<ICreateUserResponse>,
    updateUser: (body: IUpdateUserRequest) => Promise<IUpdateUserResponse>
    getUserAccount: () => Promise<IAccountResponse>
}