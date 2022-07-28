import { IChangePasswordRequest, IChangePasswordResponse, ILoginRequest, ILoginResponse, IResetRequest, IResetResponse } from "shared/interfaces/AuthInterfaces";
import instance from "../axios.config";


const auth = () => {

    async function login(body: ILoginRequest): Promise<ILoginResponse> {
        return instance.post('/login', body);
    }

    async function reset(body: IResetRequest): Promise<IResetResponse> {
        return instance.post('/reset', body);
    }
    
    async function changePassword(token: IChangePasswordRequest): Promise<IChangePasswordResponse> {
        return instance.post(`/reset/${token.token}`, { password: token.password });
    }

    return { login, reset, changePassword };

}

export default auth;