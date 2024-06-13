import React, { useState, useContext } from 'react';
import axios from 'axios';
import { SettingsContext } from './Settings';
import { Container, TextInput, Button, Select, Title, Group } from '@mantine/core';

const Login = () => {
  const { setUser } = useContext(SettingsContext);
  const [view, setView] = useState('login'); // login, signup, guest
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://www.server/signup', { username, password, role });
      const { valid, role: userRole } = response.data;
      if (valid) {
        setUser({ username, role: userRole });
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://www.server/signin', { username, password });
      const { valid, role: userRole } = response.data;
      if (valid) {
        setUser({ username, role: userRole });
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleGuest = () => {
    setUser({ role: 'guest' });
  };

  return (
    <Container>
      <Title>Login</Title>
      {view === 'login' && (
        <>
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Group>
            <Button onClick={handleSignIn}>Sign In</Button>
            <Button onClick={() => setView('signup')}>Sign Up</Button>
            <Button onClick={handleGuest}>View as Guest</Button>
          </Group>
        </>
      )}
      {view === 'signup' && (
        <>
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Select
            label="Role"
            value={role}
            onChange={setRole}
            data={[
              { value: 'admin', label: 'Admin' },
              { value: 'moderator', label: 'Moderator' },
              { value: 'user', label: 'User' },
            ]}
          />
          <Group>
            <Button onClick={handleSignUp}>Sign Up</Button>
            <Button onClick={() => setView('login')}>Back to Login</Button>
          </Group>
        </>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </Container>
  );
};

export default Login;
