import User from "./User";

class AuthService {
    public login(username: string, password: string) {
          return fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
          }).then((response) => {
            return response.json();
          });
          
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem('user') != null;
    }

    public getUser(): User | null {
      let temp = localStorage.getItem('user');

      if (temp != null) {
        return JSON.parse(temp);
      }

      return null;
    }

    public logout(): void {
        localStorage.removeItem('user');
    }
}

export default AuthService;