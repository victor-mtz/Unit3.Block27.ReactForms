import { FormEvent, useState } from 'react';
import { Props } from '../types/FormTypes';
import '../style/SignUpForm.css';

export function SignUpForm({ setUserToken }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [dirtyUsername, setDirtyUsername] = useState(false);
  const [dirtyPassword, setDirtyPassword] = useState(false);
  const URL = 'https://fsa-jwt-practice.herokuapp.com/signup';

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data: Record<string, string | boolean> = await response.json();
      setUserToken(data.token as string);
    } catch (e: unknown) {
      console.log(e);
      const returnedError = e as Record<string, string>;
      setError(returnedError.message);
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error ? <p>{error}</p> : ''}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label>
          Username:{' '}
          <input
            className="username"
            placeholder="enter username"
            value={username}
            onChange={(e) => {
              if (!dirtyUsername) setDirtyUsername(true);
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Password:{' '}
          <input
            className="password"
            placeholder="enter password"
            value={password}
            type="password"
            onChange={(e) => {
              if (!dirtyPassword) setDirtyPassword(true);
              setPassword(e.target.value);
            }}
          />
        </label>
        <button className="submit-btn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
