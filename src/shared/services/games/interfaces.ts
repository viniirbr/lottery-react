import { ICreateGameRequest, ICreateGameResponse, IListGamesResponse } from "shared/interfaces/GamesInterfaces";

interface Games {
    createGame: (body: ICreateGameRequest) => Promise<ICreateGameResponse>,
    listGames: () => Promise<IListGamesResponse>
}

export default Games;