class PermissionService {
    public getUsersRank(id: number): Promise<any> {
        return fetch('http://localhost:8080/permissions/getUsersRank', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then((response) => {
            return response.json();
        });
    }

    public getAllRanks(): Promise<any> {
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

    public getAllPermissions(): Promise<any> {
      return fetch('http://localhost:8080/permissions/getAllPermissions', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            }
          }).then((response) => {
            return response.json();
          });
    }

    public getAllPermissionsWithRank(id: number): Promise<any> {
        return fetch('http://localhost:8080/permissions/getAllPermissionsWithRank', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then((response) => {
            return response.json();
        });
    }

    public getAllRankPermissions(id: number): Promise<any> {
      return fetch('http://localhost:8080/permissions/getAllRankPermissions', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
          }).then((response) => {
            return response.json();
          });
    }

    public updateRankPermissions(id: number, permissionIds: number[]): void {
      fetch('http://localhost:8080/permissions/updateRankPermissions', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, permissions: permissionIds})
          });
    }

    public getAllPermissionGroups(): Promise<any> {
        return fetch('http://localhost:8080/permissions/getAllPermissionGroups', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        });
    }

}

export default PermissionService;
