abstract class Service {
    protected getRequest(path: string): Promise<any> {
        return fetch(`http://localhost:8080/${path}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 403) {
                return "403 Forbidden";
            }

            return response.json();
        });
    }

    protected postRequest(path: string, body: any): Promise<any> {
        return fetch(`http://localhost:8080/${path}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
