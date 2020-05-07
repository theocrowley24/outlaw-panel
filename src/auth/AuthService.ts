import User from "./User";
import Service from "../services/Service";

class AuthService extends Service {
    public login(username: string, password: string) {
        return this.postRequest("auth/login", {username: username, password: password});
    }

    public verify(): Promise<any> {
        return this.getRequest("auth/verify");
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem("accessToken") != null;
    }

    public getUser(): User | null {
      let temp = localStorage.getItem('user');

      if (temp != null) {
        return JSON.parse(temp);
      }

      return null;
    }

    public logout(): void {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("uid");
    }
}

export default AuthService;
