class User {
    public id: number | undefined;
    public username: string | undefined;
    public accessToken: string | undefined;

    constructor(id: number, username: string, accessToken: string) {
        this.id = id;
        this.username = username;
        this.accessToken = accessToken;
    }
}

export default User;