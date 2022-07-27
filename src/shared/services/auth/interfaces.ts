import { IChangePasswordRequest, IChangePasswordResponse, ILoginRequest, ILoginResponse, IResetRequest, IResetResponse } from "shared/interfaces/AuthInterfaces";

interface IAuth {
    login: (body: ILoginRequest) => Promise<ILoginResponse>,
    reset: (body: IResetRequest) => Promise<IResetResponse>, 
    changePassword: (body: IChangePasswordRequest) => Promise<IChangePasswordResponse> 
}

export default IAuth;