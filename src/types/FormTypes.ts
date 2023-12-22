import { Dispatch, SetStateAction } from 'react';

export type Props = {
  setUserToken: Dispatch<SetStateAction<string>>;
  token: string;
};

export type UserDetailsType = {
  username: string;
  iat: number;
};
