interface Game {
    id: number,
    type: string,
    description?: string,
    range?: string,
    price?: number,
    max_number?:string,
    color?: string
}

export default Game;