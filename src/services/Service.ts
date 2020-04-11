class Service {
    protected getRequest(path: string): Promise<any> {
        let uid = localStorage.getItem("uid");
        let accessToken = localStorage.getItem("accessToken");

        //if (!uid || !accessToken) return new Promise<any>(() => "Invalid auth session");

        return fetch(`http://localhost:8080/${path}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'uid': uid ? uid : "",
                'accessToken': accessToken ? accessToken : ""
            }
        }).then((response) => {
            if (response.status === 403) {
                return "403 Forbidden";
            }

            return response.json();
        });
    }

    protected postRequest(path: string, body: any): Promise<any> {
        let uid = localStorage.getItem("uid");
        let accessToken = localStorage.getItem("uid");

        //if (!uid || !accessToken) return new Promise<any>(() => "Invalid auth session");

        return fetch(`http://localhost:8080/${path}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'uid': uid ? uid : "",
                'accessToken': accessToken ? accessToken : ""
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status === 403) {
                return "403 Forbidden";
            }

            return response.json();
        });
    }
}

export default Service;
