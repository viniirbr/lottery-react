interface User {
    id: number,
    token: {
        token: string,
        expiresAt: string
    }
}

export default User;