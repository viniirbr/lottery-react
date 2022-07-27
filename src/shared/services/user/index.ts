import { AxiosRequestHeaders } from "axios";
import {
    IAccountResponse, ICreateUserRequest, ICreateUserResponse,
    IUpdateUserRequest, IUpdateUserResponse
} from "shared/interfaces/UserInterfaces";
import instance from "../axios.config";

const user = () => {

    async function createUser(body: ICreateUserRequest): Promise<ICreateUserResponse> {
        return instance.post('/user/create', body);
    }

    async function updateUser(body: IUpdateUserRequest): Promise<IUpdateUserResponse> {
        return instance.put('/user/update', body);
    }

    async function getUserAccount(headers: AxiosRequestHeaders): Promise<IAccountResponse> {
        return instance.get('/user/my-account', { headers: headers });
    }

    return { createUser, updateUser, getUserAccount }
}

export default user;