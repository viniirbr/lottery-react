import {
  IListBetsResponse,
  INewBetRequest,
  INewBetResponse,
} from "shared/interfaces/BetsInterfaces";
import instance from "../axios.config";

const betsService = () => {
  async function listBet(
    token: string,
    params?: string[]
  ): Promise<IListBetsResponse> {
    return instance.get("/bets", {
      headers: { Authorization: `Bearer ${token}` },
      params: { type: params },
    });
  }

  async function newBet(
    body: INewBetRequest,
    token: string
  ): Promise<INewBetResponse> {
    return instance.post("/bets", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return { listBet, newBet };
};

export default betsService;
