import { useState } from 'react';
import { Props } from '../types/FormTypes';
import { UserDetails } from './UserDetails';

export function Authenticate({ token }: Props) {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState('');
  const [iat, setIat] = useState(0);
  const URL = 'https://fsa-jwt-practice.herokuapp.com/authenticate';
  async function authenticate(): Promise<void> {
    try {
      const authenticateUser = await fetch(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const userAuthenticated = await authenticateUser.json();
      setUsername(userAuthenticated.data.username);
      setIat(userAuthenticated.data.iat);
      setSuccessMessage(userAuthenticated.message);
      console.log(userAuthenticated);
    } catch (e: any) {
      setError(e.message);
    }
  }
  return (
    <>
      <h2>Authenticate</h2>
      {error ? <p>{error}</p> : ''}
      {successMessage ? <UserDetails username={username} iat={iat} /> : ''}
      <button onClick={authenticate}>Log in</button>
    </>
  );
}
