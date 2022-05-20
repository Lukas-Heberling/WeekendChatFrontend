import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Components/Layout';
import Login from './Views/Login';
import UserCreation from './Views/UserCreation';
import ChatSelection from './Views/ChatSelection';
import Chat from './Views/Chat';
import WhereAreYou from './Components/WhereAreYou';
import { useAuth } from './Contexts/Authentication';

const Router = () => {
  const authentication = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {
          authentication.loggedIn ? (
            <>
              <Route index element={<ChatSelection />} />
              <Route path="chat/:id/:name" element={<Chat />} />
              <Route path="*" element={<WhereAreYou />} />
            </>
          ) : (
            <>
              <Route index element={<Login />} />
              <Route path="create_user" element={<UserCreation />} />
              <Route path="*" element={<WhereAreYou />} />
            </>
          )
        }
      </Route>
    </Routes>
  )
}

export default Router;