import { AxiosRequestHeaders } from "axios"
import { Token } from "shared/interfaces/AuthInterfaces";
import { IListBetsResponse, INewBetRequest, INewBetResponse } from "shared/interfaces/BetsInterfaces";
import instance from "../axios.config"

const betsService = () => {

    async function listBet(token: string, params?: string[]): Promise<IListBetsResponse> {
        return instance.get('/bet/all-bets', {
            headers: { 'Authorization': `Bearer ${token}` },
            params: { type: params }
        });
    }

    async function newBet(body: INewBetRequest, token: string): Promise<INewBetResponse> {
        return instance.post('/bet/new-bet', body, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }

    return { listBet, newBet }

}

export default betsService