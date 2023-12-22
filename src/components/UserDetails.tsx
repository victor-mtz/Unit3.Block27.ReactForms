import { UserDetailsType } from '../types/FormTypes';

export function UserDetails({ username, iat }: UserDetailsType) {
  const date = new Date(iat);
  return (
    <>
      <h2>Welcome back {username}!</h2>
      <p>Authentication issued at: {date.toString()}</p>
    </>
  );
}
