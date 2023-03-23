export const LOADING = 'LOADING';
export const GUEST = 'GUEST';
export const AUTHORIZED = 'AUTHORIZED';

export type UserLoadingType = {
  status: typeof LOADING;
};

export type UserGuestType = { status: typeof GUEST; answers: string[] };

export type UserAuthorizedType = {
  status: typeof AUTHORIZED;
  id: number;
  email: string;
};

export type UserType = UserLoadingType | UserGuestType | UserAuthorizedType;

export type UserFromBackend = {
  id: number;
  guest: boolean;
  host: boolean;
  email: string;
  answers: string[];
};

export type UserSubmitFormType = {
  email: string;
  secret: string;
  password: string;
};
