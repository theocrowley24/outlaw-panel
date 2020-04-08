class PermissionService {

    public getAllRanks(): any {
        return fetch('http://localhost:8080/permissions/getAllRanks', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            }
          }).then((response) => {
            return response.json();
          });
    }

    public createNewRank(name: string): void {
      fetch('http://localhost:8080/permissions/createNewRank', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, permissions: null})
          });
    }

}

export default PermissionService;