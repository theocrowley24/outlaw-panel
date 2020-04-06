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
        return localStorage.getItem('uid') != null && localStorage.getItem('accessToken') != null;
    }

    public logout(): void {
        localStorage.removeItem('uid');
        localStorage.removeItem('accessToken');
    }
}

export default AuthService;