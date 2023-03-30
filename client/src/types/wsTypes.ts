import type { AnswerType } from './wordTypes';

export const SOCKET_INIT = 'SOCKET_INIT';
export type WsInitType = {
  type: typeof SOCKET_INIT;
};

export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export type WsConnectType = {
  type: typeof SOCKET_CONNECT;
};

export const SOCKET_CLOSE = 'SOCKET_CLOSE';
export type WsCloseType = {
  type: typeof SOCKET_CLOSE;
};

export const SOCKET_MESSAGE_SET = 'SOCKET_MESSAGE_SET';
export type WsMessageSetType = {
  type: typeof SOCKET_MESSAGE_SET;
  payload: string;
};

export const SOCKET_MESSAGE_SEND = 'SOCKET_MESSAGE_SEND ';
export type WsMessageSendType = {
  type: typeof SOCKET_MESSAGE_SEND;
  payload: AnswerType;
};

export const SOCKET_SEND_ANSWER = 'SOCKET_SEND_ANSWER';
export type WsSendAnswer = {
  type: typeof SOCKET_SEND_ANSWER;
  payload: AnswerType;
};

export const SOCKET_SEND_CURRENT_QUESTION = 'SOCKET_SEND_CURRENT_QUESTION';
export type WsSendCurrentQuestion = {
  type: typeof SOCKET_SEND_CURRENT_QUESTION;
  payload: number;
};

export type WsActionTypes =
  | WsInitType
  | WsCloseType
  | WsMessageSendType
  | WsMessageSetType
  | WsConnectType
  | WsSendAnswer
  | WsSendCurrentQuestion;
