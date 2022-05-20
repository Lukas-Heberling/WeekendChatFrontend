import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../Contexts/Authentication';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
  const authentication = useAuth();

  const signIn = () => {
    if (username !== "" && password !== "") {
      authentication.login(username, password);
    } else {
      /** TODO message handling service */
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <p>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </p>
      <button
        onClick={signIn}
      >
        Login
      </button>
      <Link to="create_user">Register</Link>
    </div>
  );
};

export default Login;
