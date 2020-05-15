import Service from "../services/Service";

class AuthService extends Service {
    public login(username: string, password: string) {
        return this.postRequest("auth/login", {username: username, password: password});
    }

    public verify(): Promise<any> {
        return this.getRequest("auth/verify");
    }

    public getUser(): Promise<any> {
      return this.getRequest("auth/getMyInfo");
    }
}

export default AuthService;
