import { IListBetsResponse, INewBetRequest, INewBetResponse } from "shared/interfaces/BetsInterfaces";

interface Bets {
    listBets: (token: string) => Promise<IListBetsResponse>,
    newBet: (body: INewBetRequest) => Promise<INewBetResponse> 
}

export default Bets