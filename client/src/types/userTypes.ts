import type { AnswerType } from './wordTypes';

export const LOADING = 'LOADING';
export const GUEST = 'GUEST';
export const AUTHORIZED = 'AUTHORIZED';

export type UserLoadingType = {
  status: typeof LOADING;
};

export type UserGuestType = {
  status: typeof GUEST;
  answers: AnswerType[];
  currentQuestion: number;
};

export type UserAuthorizedType = {
  status: typeof AUTHORIZED;
  id: number;
  email: string;
  currentQuestion: number;
};

export type UserType = UserLoadingType | UserGuestType | UserAuthorizedType;

export type UserFromBackend = {
  id: number;
  guest: boolean;
  host: boolean;
  email: string;
  answers: AnswerType[];
  currentQuestion: number;
};

export type UserSubmitFormType = {
  email: string;
  secret: string;
  password: string;
};
