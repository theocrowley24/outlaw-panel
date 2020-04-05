import React from "react";

const Login = () => {
    const sendRequest = () => {
        (async () => {
            const rawResponse = await fetch('http://localhost:8080/auth/login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({username: 'theocrowley24', password: '12345'})
            });
            const content = await rawResponse.json();
          
            console.log(content);
          })();
    }

    sendRequest();

    return (
        <div>Log in</div>
    );
}

export default Login;