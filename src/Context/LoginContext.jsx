import React, { createContext, useState, useEffect, useCallback } from 'react';
import cookie from 'react-cookies';
import { jwtDecode } from "jwt-decode";

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJyZWFkIiwidXBkYXRlIiwiZGVsZXRlIl0sImlhdCI6MTUxNjIzOTAyMn0.QY4-WvHZP50JZ7sXgXUPoaEnM5LzxgKBof6b7gosCw4"
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwidXBkYXRlIl0sImlhdCI6MTUxNjIzOTAyMn0.ZWsI4WF66YE9SsN70CNgr3eHesRI56dcV2TmfrLadVM"
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiY3JlYXRlIl0sImlhdCI6MTUxNjIzOTAyMn0.3JQVVAZQJsWGi0GrnVJvqTsC4USjE0MUrORr8VCYh5U"
  },
  User: {
    password: 'user',
    name: 'User',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiXSwiaWF0IjoxNTE2MjM5MDIyfQ.9fNc0IPpwWhJqjFfCg69Yo31jVICs6qjqNeBA-Xi4XA"
  },
};

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const can = useCallback(
    (capability) => user.capabilities.includes(capability),
    [user]
  );

  const login = useCallback((username, password) => {
    console.log(`Attempting login for username: ${username}`); // Debug log
    const auth = testUsers[username];
    if (auth && auth.password === password) {
      console.log('Login successful'); // Debug log
      validateToken(auth.token);
    } else {
      console.log('Invalid credentials'); // Debug log
      setError('Invalid credentials');
    }
  }, []);

  const logout = useCallback(() => {
    setLoginState(false, null, { capabilities: [] }, null);
  }, []);

  const validateToken = (token) => {
    try {
      console.log('Decoding token'); // Debug log
      const validUser = jwtDecode(token);
      console.log('Token valid, setting login state', validUser); // Debug log
      setLoginState(true, token, validUser, null);
    } catch (e) {
      console.log('Token invalid', e); // Debug log
      setLoginState(false, null, { capabilities: [] }, 'Invalid token');
    }
  };

  const setLoginState = (loggedIn, token, user, error) => {
    console.log(`Setting login state: ${loggedIn}, ${token}, ${user}, ${error}`); // Debug log
    cookie.save('auth', token);
    setLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error);
    console.log(`Login state set: loggedIn=${loggedIn}, user=${JSON.stringify(user)}`); // Debug log
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, can, login, logout, user, error }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;