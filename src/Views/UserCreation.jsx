import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserCreation = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordsEqual, setPasswordsEqual] = useState(true);

  const navigate = useNavigate();
  
  const createAccount = () => {
    if (username !== "" && passwordsEqual && password1 !== "") {
      fetch(`http://192.168.0.157:2509/create_user/${username}/${password1}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.type === 'success') {
          /** TODO message handling */
          navigate('/', {replace: true});
        } else {
          /** TODO message handling an unknown error has occured */
        }
      });
    }
  }

  useEffect(() => {
    if (password1 !== password2) {
      setPasswordsEqual(false);
    } else {
      setPasswordsEqual(true);
    }
  }, [password1, password2]);

  return (
    <div>
      <h1>Create User</h1>
      <p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </p>
      <p style={passwordsEqual ? {} : {border: '1px solid red'}}>
        <label htmlFor="password1">Password</label>
        <input
          type="password"
          id="password1"
          onChange={(event) => setPassword1(event.target.value)}
        />
      </p>
      <p style={passwordsEqual ? {} : {border: '1px solid red'}}>
        <label htmlFor="password2">Retype Password</label>
        <input
          type="password"
          id="password2"
          onChange={(event) => setPassword2(event.target.value)}
        />
      </p>
      <button onClick={createAccount}>
        Create Account
      </button>
      <Link to="/">
        Back To Login
      </Link>
    </div>
  );
};

export default UserCreation;