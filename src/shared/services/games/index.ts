import { ICreateGameRequest, ICreateGameResponse, IListGamesResponse } from "shared/interfaces/GamesInterfaces";
import instance from "../axios.config";

const gamesService = () => {

    async function createGame(body: ICreateGameRequest): Promise<ICreateGameResponse> {
        return instance.post('/admin/create-game', body);
    }

    async function listGames(): Promise<IListGamesResponse> {
        return instance.get('/cart_games');
    }

    async function deleteGame(id: number): Promise<void> {
        return instance.post(`/admin/delete-game/${id}`);
    }

    return { createGame, listGames, deleteGame };
}

export default gamesService;