import { AxiosRequestHeaders } from "axios"
import { Token } from "shared/interfaces/AuthInterfaces";
import { IListBetsResponse, INewBetRequest, INewBetResponse } from "shared/interfaces/BetsInterfaces";
import instance from "../axios.config"

const betsService = () => {

    async function listBet(token: string, params?: URLSearchParams): Promise<IListBetsResponse> {
        const paramsTest = new URLSearchParams();
        paramsTest.append('type%5B%5D', 'Mega-Sena')
        return instance.get('/bet/all-bets', {
            headers: { 'Authorization': `Bearer ${token}` },
            params: {'type\%5B%5D': 'Mega-Sena' }
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