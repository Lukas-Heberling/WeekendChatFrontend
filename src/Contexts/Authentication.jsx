import React, {
  createContext, useState, useContext
} from 'react';
import { useNavigate } from 'react-router-dom';

import authenticate from '../Service/authenticate';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate()

  const login = async (username, password) => {
    setLoading(true);
    authenticate(username, password)
    .then((loginResponse) => {
      if (loginResponse.type === 'success') {
        /** TODO message handling service password correct */
        setLoading(false);
        setLoggedIn(true);
        setCurrentUser(loginResponse.value);
        navigate('/', { replace: true });
      } else {
        /** TODO Message Handling service handle password incorrect  */
        setLoading(false);
      }
    })
    .catch((error) => {
      /** TODO write an message handler an unknown error occured */
      console.error(error);
    })
  };

  const logout = async () => {
    /** Message Handling service officially logged out congrats */
    setLoggedIn(false);
    setCurrentUser(null);
    navigate('/', { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        loggedIn,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use Auth must be used in a AuthContext provider you idiot XD");
  }
  return context;
};

export { AuthProvider, AuthContext, useAuth};